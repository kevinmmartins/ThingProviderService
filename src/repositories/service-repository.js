'use strict';

const mongoose = require('mongoose');
const Service = mongoose.model('Service-Route');

exports.get = async () => {
    const res = await Service.find({}, 'name endpoints');
    return res;
};

exports.getByName = async(serviceName) => {
    return await Service.findOne({
        name: serviceName
    }, 'name endpoints')
};

exports.getById = async(id) => {
    return await Service.findById(id);
};

exports.getByEndpoint = async(endpoint) => {
    return await Service.findOne({
        endpoints: endpoint
    }, 'name endpoints')
};

exports.create = async(data) => {
    const service = new Service(data);
    await service.save()
}

exports.update = async(id, data) => {
    await Service.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            endpoints: data.endpoints
        }
    })
}

exports.delete = async(id) => {
    await Service.findOneAndRemove({ _id: id })
}