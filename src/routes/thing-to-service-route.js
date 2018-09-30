'use strict';

const express = require('express');
const serviceController= require('../controllers/thing-to-service-controller');
const router = express.Router();

router.get('/:name',serviceController.get);
router.put('/:name',serviceController.put);

module.exports = router;