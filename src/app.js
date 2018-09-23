'use strict';

const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const config = require('../bin/config');

mongoose.connect('mongodb://' + config.storageConfig.database + ':' + config.storageConfig.pass + '@ds245772.mlab.com:45772/thingprovider');
const Service =require('./models/service-route');

const apiRouter = require('./routes/api-route');
const thingProviderRouter = require('./routes/thing-provider-route');
const serviceRouter = require('./routes/thing-to-service-route');

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

app.use('/tps/version', apiRouter);
app.use('/tps/', thingProviderRouter);
app.use('/route/', serviceRouter);
module.exports = app;
