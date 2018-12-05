const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    //TODO: AUTHENTICATE THE USER
    const project = new Project({ ...args });
    await project.save();
    return project;
  }
};

module.exports = Mutations;
