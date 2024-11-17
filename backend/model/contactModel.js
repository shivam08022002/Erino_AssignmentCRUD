const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^\+?[\d\s-]{10,}$/, 'Please enter a valid phone number']
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true
    }
  }, {
    timestamps: true
  });
  
  // Create indexes
  contactSchema.index({ email: 1 }, { unique: true });
  contactSchema.index({ company: 1 });
  contactSchema.index({ createdAt: -1 });
  
  module.exports = mongoose.model('Contact', contactSchema);
//   const Contact = mongoose.model('Contact', contactSchema);