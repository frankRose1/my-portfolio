const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: 'Project title is required!',
    trim: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  githubLink: {
    type: String,
    trim: true
  },
  demoLink: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String
  },
  tags: {
    type: [String],
    required: 'Provide some tags.'
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
