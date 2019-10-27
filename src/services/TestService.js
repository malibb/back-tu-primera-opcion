const { Tests } = require('../models/Test');
const { getOneUser } = require('./UserService');


const createTest = async (data) => {
    const test = await Tests.create(data);
    const populatedTest = await getOneUser(test._id);
    return populatedTest;
};

const getAllTests = () => Tests.find({ is_active: true }).populate({
    path: 'test',
    model: 'users'
});

const getOneTest = (id) => Tests.findOne({
    _id: id,
    is_active: true
}).populate({
    path: 'test',
    model: 'users'
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