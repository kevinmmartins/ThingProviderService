'use strict';

const mongoose = require('mongoose');
const Service = mongoose.model('Service-Route');
const Validator = require('../validators/request-validator');
const repository = require('../repositories/service-repository');

exports.get = (req, res, next) => {
    repository.get()
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send({
                message: "Error",
                data: e
            });
        });
};

exports.getByEndpoints = (req, res, next) => {
    repository.getByEndpoint(req.params.endpoint)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send({
                message: "Error",
                data: e
            });
        });
};

exports.getById = (req, res, next) => {
    repository.getById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send({
                message: "Error",
                data: e
            });
        });
};

exports.getByName = (req, res, next) => {
    repository.getByName(req.params.name)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send({
                message: "Error",
                data: e
            });
        });
};

exports.post = (req, res, next) => {
    const validator = new Validator();
    validator.hasMinLen(req.body.name, 1, 'The service name must have a name');

    if (!validator.isValid()) {
        res.status(400).send(validator.errors()).end();
        return;
    }

    repository.create(req.body)
        .then(x => {
            res.status(201).send({ message: "Success" });
        }).catch(e => {
            res.status(400).send({
                message: "Error",
                data: e
            });
        });
};

exports.put = (req, res, next) => {
    const id = req.params.id;
    repository.update(id, req.body).then(x => {
        res.status(200).send({ message: "Service " + id + " updated" });
    }).catch(e => {
        res.status(400).send({
            message: "Error",
            data: e
        });
    });
};

exports.delete = (req, res, next) => {
    repository.delete(req.params.id)
        .then(x => {
            res.status(200).send({ message: "Service " + req.params.id + " deleted" });
        }).catch(e => {
            res.status(400).send({
                message: "Error",
                data: e
            });
        });
};