'use strict';

const Validator = require('../validators/request-validator');
const repository = require('../repositories/service-repository');
const axios = require('axios');
const config = require('../../bin/config');

exports.get = async (req, res, next) => {
    try {
        const name = req.params.name;
        console.log('Starting get route to service ' + name);
        const validator = new Validator();
        validator.hasMinLen(name, 1, 'invalid service name');
        const serviceByName = await repository.getByName(name);
        validator.isValidData(serviceByName, name);
        if (!validator.isValid()) {
            res.status(400).send(validator.errors()).end();
            return;
        }
        if (hasValidCacheData(serviceByName)) {
            console.log('Found valid service value from cache');
            res.status(200).send(serviceByName.value).end();
            return;
        }
        console.log('Finding service response by endpoints');
        const dataResponse = await getRouteDataResponse(serviceByName);
        if (!dataResponse) {
            res.status(422).send({
                message: "Invalid Endpoints response from " + name
            }).end();
            return;
        }
        res.status(200).send(dataResponse).end();
    }
    catch (e) {
        res.status(500).send({
            message: "Error",
            data: e
        });
    }
};

exports.put = async (req, res, next) => {
    try {
        const name = req.params.name;
        console.log('Starting put route to service ' + name);
        const validator = new Validator();
        validator.hasMinLen(name, 1, 'invalid service name');
        validator.hasMinLen(req.body, 1, 'invalid request body');
        const data = await repository.getByName(name);
        validator.isValidData(data, name);
        if (!validator.isValid()) {
            res.status(400).send(validator.errors()).end();
            return;
        }
        console.log('Sending put request to all endpoints');
        await putServiceUpdate(data, req.body, req.query);
        res.status(200).send({ message: "Service " + name + " updated" }).end();
    }
    catch (e) {
        res.status(500).send({
            message: "Error",
            data: e.message
        });
    }
};


const putServiceUpdate = async (data, body, query) => {
    for (let i = 0; i < data.endpoints.length; i++) {
        console.log('Updating endpoint ' + data.endpoints[i] + ' state');
        const responseValue = await updateEndpointState(data.id, data.endpoints[i], body, query);
        console.log(responseValue);
    }
}

const updateEndpointState = async (id, endpoint, body, query) => {
    try {
        const response = await axios.put(buildEndpointWithQueryParams(endpoint, query), body);
        if (response && response.status == 200 && response.data) {
            const responseValue = response.data;
            await repository.updateLastValue(id, responseValue);
            return responseValue;
        }
    } catch (e) {
        console.error('Endpoint return an error on update');
        throw e;
    }
}

const buildEndpointWithQueryParams = function (endpoint, query) {
    if (!query) {
        return endpoint;
    }
    endpoint = endpoint + '?';
    Object.keys(query).forEach(function (key) {
        endpoint = endpoint + key + '=' + query[key] + '&';
    });
    return endpoint;
}

const getRouteDataResponse = async (data) => {
    for (let i = 0; i < data.endpoints.length; i++) {
        console.log('Getting response from endpoint ' + data.endpoints[i]);
        try {
            const responseValue = await getResponseFromEndpoint(data.id, data.endpoints[i]);
            if (responseValue) {
                return responseValue;
            }
        }
        catch (e) {
            console.error(e);
        }
    }
}

const hasValidCacheData = (serviceData) => {
    return serviceData.value &&
        serviceData.lastUpdate &&
        Date.now() - serviceData.lastUpdate < config.storageConfig.millisecondsReloadCache;
}


const getResponseFromEndpoint = async (id, endpoint) => {
    try {
        console.log('Executing request');
        console.log(endpoint);
        const response = await axios.get(endpoint);
        console.log('Complete');
        if (response && response.status == 200 && response.data) {
            const responseValue = response.data;
            await repository.updateLastValue(id, responseValue);
            return responseValue;
        }
    } catch (e) {
        console.error(e.message);
        console.error('Endpoint return an error ' + e.response.status);
    }
}




