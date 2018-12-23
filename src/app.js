'use strict';

const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const config = require('../bin/config');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

if (!config.storageConfig.useLocalDatabase) {
    console.log('Using remote DB');
    mongoose.connect('mongodb://' + config.storageConfig.database + ':' + config.storageConfig.pass + '@ds245772.mlab.com:45772/thingprovider', { useNewUrlParser: true });
}
else {
    console.log('Using local DB');
    mongoose.connect('mongodb://mongo:27017');
}
require('./models/service-route');

const apiRouter = require('./routes/api-route');
const thingProviderRouter = require('./routes/thing-provider-route');
const serviceRouter = require('./routes/thing-to-service-route');

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use('/tps/version', apiRouter);
app.use('/tps/', thingProviderRouter);
app.use('/route/', serviceRouter);
module.exports = app;
