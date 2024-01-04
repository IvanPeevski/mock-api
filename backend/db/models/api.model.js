const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required:true
  }
});

const Api = mongoose.model('Api', apiSchema);

module.exports = Api;
