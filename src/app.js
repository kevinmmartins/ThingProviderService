'use strict';

const express = require('express');
const parser = require('body-parser');

const app = express();

const apiRouter = require('./routes/api-route');
const thingProviderRouter = require('./routes/thing-provider-route')

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

app.use('/tps/', apiRouter);
app.use('/tps/', thingProviderRouter);
module.exports = app;
