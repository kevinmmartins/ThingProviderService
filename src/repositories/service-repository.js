'use strict';

const mongoose = require('mongoose');
const Service = mongoose.model('Service-Route');

exports.get = () => {
    return Service.find({}, 'name endpoints');
};

exports.getByName = (serviceName) => {
    return Service.findOne({
        name: serviceName
    }, 'name endpoints')
};

exports.getById = (id) => {
    return Service.findById(id);
};

exports.getByEndpoint = (endpoint) => {
    return Service.findOne({
        endpoints: endpoint
    }, 'name endpoints')
};

exports.create = (data) => {
    const service = new Service(data);
    return service.save()
}

exports.update = (id, data) => {
    return Service.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            endpoints: data.endpoints
        }
    })
}

exports.delete = (id) => {
    return Service.findOneAndRemove({ _id: id })
}