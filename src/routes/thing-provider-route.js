'use strict';

const express = require('express');
const thingController= require('../controllers/thing-provider-controller');
const router = express.Router();

router.post('/', thingController.post);
router.put('/:id', thingController.put);
router.delete('/:id', thingController.delete);
router.get('/',thingController.get);
router.get('/:name',thingController.getByName);
router.get('/admin/:id',thingController.getById);
router.get('/endpoints/:endpoint',thingController.getByEndpoints);

module.exports = router;