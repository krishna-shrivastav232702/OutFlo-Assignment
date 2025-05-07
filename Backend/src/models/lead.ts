import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  jobTitle: {
    type: String,
    trim: true
  },
  companyName: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  profileUrl: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;