'use strict';

const Validator = require('../validators/request-validator');
const repository = require('../repositories/service-repository');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    }
    catch (e) {
        res.status(500).send({
            message: "Error",
            data: e
        });
    }
};

exports.getByEndpoints = async (req, res, next) => {
    try {
        const data = await repository.getByEndpoint(req.params.endpoint);
        res.status(200).send(data);
    }
    catch (e) {
        res.status(500).send({
            message: "Error",
            data: e
        });
    }
};

exports.getById = async (req, res, next) => {
    try {
        const data = await repository.getById(req.params.id);
        res.status(200).send(data);
    }
    catch (e) {
        res.status(500).send({
            message: "Error",
            data: e
        });
    }
};

exports.getByName = async (req, res, next) => {
    try {
        const data = await repository.getByName(req.params.name);
        res.status(200).send(data);
    }
    catch (e) {
        res.status(500).send({
            message: "Error",
            data: e
        });
    }
};

exports.post = async (req, res, next) => {
    const validator = new Validator();
    validator.hasMinLen(req.body.name, 1, 'The service must have a name');

    if (!validator.isValid()) {
        res.status(400).send(validator.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({ message: "Success" });
    }
    catch (e) {
        res.status(500).send({
            message: "Error",
            data: e
        });
    }
};

exports.put = async (req, res, next) => {
    const id = req.params.id;
    try {
        await repository.update(id, req.body);
        res.status(200).send({ message: "Service " + id + " updated" });
    }
    catch (e) {
        res.status(500).send({
            message: "Error",
            data: e
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send({ message: "Service " + req.params.id + " deleted" });
    }
    catch (e) {
        res.status(500).send({
            message: "Error",
            data: e
        });
    }
};