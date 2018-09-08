'use strict';

const mongoose = require('mongoose');
const Service = mongoose.model('Service-Route');

exports.get = (req, res, next) => {
    Service.find({}, 'name endpoints')
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
    Service.find({
        endpoints: req.params.endpoint
    }, 'name endpoints')
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
    Service.findById(req.params.id, 'name endpoints')
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
    Service.findOne({
        name: req.params.name
    }, 'name endpoints')
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
    const service = new Service(req.body);
    service.save()
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
    Service.findByIdAndUpdate(id, {
        $set: {
            name: req.body.name,
            endpoints: req.body.endpoints
        }
    }).then(x => {
        res.status(200).send({ message: "Service " + id + " updated" });
    }).catch(e => {
        res.status(400).send({
            message: "Error",
            data: e
        });
    });
};

exports.delete = (req, res, next) => {
    Service.findOneAndRemove({ _id: req.params.id })
    .then(x => {
        res.status(200).send({ message: "Service " + req.params.id + " deleted" });
    }).catch(e => {
        res.status(400).send({
            message: "Error",
            data: e
        });
    });
};