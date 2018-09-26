'use strict';

exports.get = async (req, res, next) => {
    try {
        res.status(200).send({
            title: "Get Route working",
            version: "0.0.1"
        });
    }
    catch (e) {
        res.status(500).send({
            message: "Error",
            data: e
        });
    }
};

exports.post = async (req, res, next) => {
    try {
        res.status(200).send({
            title: "Post Route working",
            version: "0.0.1"
        });
    }
    catch (e) {
        res.status(500).send({
            message: "Error",
            data: e
        });
    }
};