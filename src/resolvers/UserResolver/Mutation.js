const {
    createUser,
    deleteUser,
    getOneUser
} = require('../../services/UserService');
const authenticate = require('../../utils/authenticate');

// eslint-disable-next-line no-unused-vars
const createNewUser = async (_, params) => {
    const user = await createUser(params.data);
    return user;
};

const updateOneUser = async (_, params) => {
    //const user = await updateUser(params.id,params.data);
    const user = await getOneUser(params.id);
    if (!user) throw new Error('User not exist');
    Object.keys(params.data).forEach(key => user[key] = params.data[key]);
    user.save({
        new: true
    });
    return user;
};

const deleteOneUser = async (_, params) => {
    const user = await deleteUser(params.id);
    if (!user) throw new Error('User not exist');
    return 'User deleted';
};                            

const login = async (_, params) => {
    const token = await authenticate(params).catch(e => {
        throw e;
    });
    return {
        token,
        message: 'Login Successful'
    };
};

module.exports = {
    createNewUser,
    updateOneUser,
    deleteOneUser,
    login
};