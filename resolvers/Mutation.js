const bcrypt = require('bcryptjs');

//TODO: set up checks to ensure I'm the only admin

const Mutations = {
  async signupAdmin(_, { email, password, name }, { Admin }) {
    const existingAdmin = Admin.findOne({ email });
    if (existingAdmin) {
      throw new Error('Admin already exists.');
    }
    const admin = new Admin({ email, password, name });
    await admin.save();
    //TODO: Create JWT
    return admin;
  },
  async signinAdmin(_, { email, password }, { Admin }) {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error('No admin found with that email.');
    }
    //TODO: Create JWT
    return admin;
  }
};

module.exports = Mutations;
