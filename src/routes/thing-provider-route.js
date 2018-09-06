'use strict';

const express = require('express');
const thingController= require('../controllers/thing-provider-controller');
const router = express.Router();

router.post('/', thingController.post);
router.put('/:id', thingController.put);
router.delete('/', thingController.delete);

module.exports = router;