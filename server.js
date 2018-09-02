'use strict';

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');

const app = express();
const port = normalizePort(process.env.PORT || '3002');
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "ThingProvider Service",
        version: "0.0.1"
    });
});

app.use('/tps/', route);
server.listen(port);
server.on('error', onError);

console.log('ThingProvider Service started ! Port:' + port);

function normalizePort(port) {
    const portNumber = parseInt(port, 10);
    if (isNaN(portNumber)) {
        return port;
    }
    if (port >= 0) {
        return portNumber;
    }
    return false;
}


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}