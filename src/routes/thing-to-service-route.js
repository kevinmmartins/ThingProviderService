'use strict';

const express = require('express');
const router = express.Router();

router.get('/:name', (req, res, next) => {
    res.status(200).send({
        title: "Get Route working",
        version: "0.0.1"
    });
});

router.post('/:name', (req, res, next) => {
    res.status(200).send({
        title: "Post Route working",
        version: "0.0.1"
    });
});

module.exports = router;