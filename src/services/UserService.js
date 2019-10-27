const {
    Users
} = require('../models');


const createUser = (data) => Users.create(data);

const getAllUsers = () => Users.find({
    is_active: true
}).populate({
    path: 'posts',
    model: 'posts'
});

const getOneUser = (id) => Users.findOne({
    _id: id,
    is_active: true
}).populate({
    path: 'posts',
    model: 'posts'
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