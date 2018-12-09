const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { transporter, formatEmail } = require('../utils/mailer');

const createToken = (admin, expiresIn) => {
  const { email, name } = admin;
  return jwt.sign({ email, name }, process.env.APP_SECRET, { expiresIn });
};

const Mutations = {
  async signupAdmin(_, { email, password, name }, { Admin }) {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      throw new Error('Admin already exists.');
    }
    const admin = new Admin({ email, password, name });
    await admin.save();
    const token = createToken(admin, '1h');
    return { token };
  },
  async signinAdmin(_, { email, password }, { Admin }) {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error('No admin found with that email.');
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new Error('Incorrect password.');
    }
    const token = createToken(admin, '1h');
    return { token };
  },
  async postProject(_, args, { Project }) {
    //TODO: Requires a signed in ADMIN
    const project = new Project({ ...args });
    await project.save();
    return { ...project._doc, _id: project._id.toString() };
  },
  async deleteProject(_, { projectId }, { Project }) {
    //TODO: Requires a signed in ADMIN
    const project = Project.findById(projectId);
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
    const emailHtml = formatEmail({ senderName, senderPhone, comments });
    const emailRes = await transporter.sendMail({
      from: senderEmail, // sender address
      to: process.env.ADMIN_EMAIL, // list of receivers
      subject, // Subject line
      html: emailHtml // html body
    });

    return { message: 'Your message has been sent!' };
  }
};

module.exports = Mutations;
