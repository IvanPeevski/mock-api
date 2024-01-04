const mongoose = require('mongoose');

const endpointSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  _apiId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

const Endpoint = mongoose.model('Endpoint', endpointSchema);

module.exports = Endpoint;
