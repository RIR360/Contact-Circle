const mongoose = require('mongoose');

// write schema
const contact_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: Number,
    required: true,
    min: 0,
  },
  locked: Boolean,
  title: String,
  bio: String,
  phone: String,
  email: String
});

const Contact = mongoose.model('Contact', contact_schema, 'contacts');

module.exports = Contact;