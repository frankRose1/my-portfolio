const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});

AdminSchema.pre('save', async function(next){
  if (!this.isModified('password')){
    return next();
  }
  const hashedPw = await bcrypt.hash(this.password, 10);
  this.password = hashedPw;
  next();
});

module.exports = mongoose.model('Admin', AdminSchema)