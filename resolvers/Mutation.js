const bcrypt = require('bcryptjs');
const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});
const { formatEmail } = require('../utils/mailer');
const { createToken, checkAuthToken } = require('../utils/auth');
const from = `Frank Rose User Contact <${process.env.ADMIN_EMAIL}>`;

const Mutations = {
  async signinAdmin(_, { email, password }, { Admin }) {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error('Incorrect email and password combination.');
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new Error('Incorrect email and password combination.');
    }
    const token = createToken(admin, '1h');
    return { token };
  },
  async postProject(_, args, { Project, token }) {
    const { isAuthenticated } = await checkAuthToken(token);
    if (!isAuthenticated) {
      throw new Error('Sorry, you dont have permission to do that!');
    }
    const project = new Project({ ...args });
    await project.save();
    return { ...project._doc, _id: project._id.toString() };
  },
  async deleteProject(_, { projectId }, { Project, token }) {
    const { isAuthenticated } = await checkAuthToken(token);
    if (!isAuthenticated) {
      throw new Error('Sorry, you dont have permission to do that!');
    }
    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error('No project found with that ID.');
    }
    await project.remove();
    return { message: 'Project was successfully deleted from the database.' };
  },
  async sendEmail(
    _,
    { senderEmail, senderName, subject, senderPhone, comments },
    ctx
  ) {
    const html = formatEmail({ senderName, senderPhone, senderEmail, comments });
    const data = {
      from,
      html,
      subject,
      to: process.env.ADMIN_EMAIL,
    };
    await mailgun.messages().send(data);
    return { message: 'Your email has been sent!' };
  }
};

module.exports = Mutations;
