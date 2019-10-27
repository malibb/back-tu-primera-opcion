const {
    Tests
} = require('../models');


const createTest = (data) => Tests.create(data);

const getAllTests = () => Tests.find({
    is_active: true
}).populate({
    path: 'posts',
    model: 'posts'
});

const getOneTest = (id) => Tests.findOne({
    _id: id,
    is_active: true
}).populate({
    path: 'posts',
    model: 'posts'
});

const getTestByEmail = (email) => Tests.findOne({
    email,
    is_active: true
});

const updateTest = (id, data) => Tests.findByIdAndUpdate(id, {
    ...data
}, {
    new: true
});

const deleteTest = (id) => Tests.findOneAndUpdate({
    _id: id,
    is_active: true
}, {
    is_active: false
});

module.exports = {
    createTest,
    getAllTests,
    getOneTest,
    getTestByEmail,
    updateTest,
    deleteTest
};