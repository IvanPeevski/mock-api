const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Api, Endpoint } = require('./db/models');
const { mongoose } = require('./db/mongoose');
app.use(bodyParser.json());
/* ROUTE HANDLERS */

/* API ROUTES */

app.get('/apis', (req, res) => {
  Api.find({}).then((apis) => {
    res.send(apis);
  });
})

app.post('/apis', (req, res) => {
  let name = req.body.name;
  let url = req.body.url;

  let newApi = new Api({
    name,
    url
  });

  newApi.save().then((apiDoc) => {
    res.send(apiDoc);
  })
})

app.patch('/apis/:id', (req, res) => {
  Api.findOneAndUpdate({ _id: req.params.id }, {
    $set: req.body
  }).then(() => {
    res.sendStatus(200);
  });
});

app.delete('/apis/:id', (req, res) => {
  Api.findOneAndRemove({
    _id: req.params.id
  }).then((removedApiDoc) => {
    res.send(removedApiDoc);
  })
});

/* ENDPOINT ROUTES */

app.get('/apis/:apiId/endpoints', (req, res) => {
  Endpoint.find({
    _apiId: req.params.apiId
  }).then((endpoints) => {
    res.send(endpoints);
  })
});

app.post('/apis/:apiId/endpoints', (req, res) => {
  let newEndpoint = new Endpoint({
    name: req.body.name,
    method: req.body.method,
    url: req.body.url,
    body: req.body.body,
    _apiId: req.params.apiId
  });
  newEndpoint.save().then((newEndpointDoc) => {
    res.send(newEndpointDoc);
  })
});

app.patch('/apis/:apiId/endpoints/:endpointId', (req, res) => {
  Endpoint.findOneAndUpdate({
    _id: req.params.endpointId,
    _apiId: req.params.apiId
  }, {
    $set: req.body
  }).then(() => {
    res.sendStatus(200);
  });
});

app.delete('/apis/:apiId/endpoints/:endpointId', (req, res) => {
  Endpoint.findOneAndRemove({
    _id: req.params.endpointId,
    _apiId: req.params.apiId
  }).then((removedEndpointDoc) => {
    res.send(removedEndpointDoc);
  })
});

app.get('/apis/:apiId/endpoints/:endpointId', (req, res) => {
  Endpoint.findOne({
    _id: req.params.endpointId,
    _apiId: req.params.apiId
  }).then((endpoint) => {
    res.send(endpoint);
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
})