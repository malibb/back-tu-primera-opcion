const {
    getAllUsers,
    getOneUser
} = require('../../services/UserService');

const getUsers = async () => {
    const Users = await getAllUsers();
    console.log(Users);
    return Users;
    // return getAllUsers().then(Users => Users)
    //                       .catch((e) => {throw new Error(e)})
};

const getSingleUser = async (_, params) => {
    const User = await getOneUser(params.id);
    if (!User) throw new Error('User not exist');
    return User;
};

const me = async (root, params, {
    user
}) => {
    const User = await getOneUser(user._id);
    return User;
};

module.exports = {
    getUsers,
    getSingleUser,
    me
};