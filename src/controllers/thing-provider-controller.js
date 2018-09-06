'use strict';

exports.post = (req, res, next) => {
    res.status(201).send(req.body);
};

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        id: id,
        service: req.body
    });
};

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};