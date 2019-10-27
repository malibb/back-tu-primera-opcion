const {
    Users
} = require('../models/User');


const createUser = (data) => Users.create(data);

const getAllUsers = () => Users.find({
    is_active: true
}).populate({
    path: 'tests',
    model: 'tests'
});

const getOneUser = (id) => Users.findOne({
    _id: id,
    is_active: true
}).populate({
    path: 'tests',
    model: 'tests'
});

const getUserByEmail = (email) => Users.findOne({
    email,
    is_active: true
});

const updateUser = (id, data) => Users.findByIdAndUpdate(id, {
    ...data
}, {
    new: true
});

const deleteUser = (id) => Users.findOneAndUpdate({
    _id: id,
    is_active: true
}, {
    is_active: false
});

module.exports = {
    createUser,
    getAllUsers,
    getOneUser,
    getUserByEmail,
    updateUser,
    deleteUser
};