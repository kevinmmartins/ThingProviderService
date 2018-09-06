'use strict';

const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const apiRouter = require('./routes/api-route');
const thingProviderRouter = require('./routes/thing-provider-route');

mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds245772.mlab.com:45772/thingprovider');

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

app.use('/tps/', apiRouter);
app.use('/tps/', thingProviderRouter);
module.exports = app;
