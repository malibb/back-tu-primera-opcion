const jwt = require('jsonwebtoken');

const createToken = ({ email, first_name }) => {

    const payload = {
        email,
        first_name,
    };

    return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'1d'});

};

module.exports = createToken;