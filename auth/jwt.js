const jwt = require('jsonwebtoken');
const config = require('config');


const secret = config.get("jwtPrivateKey.secret");

const generateToken = (user) => {
    return jwt.sign({ id: user.id }, secret );
}

const generateAdminToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, secret);
}


module.exports = {
    generateToken,
    generateAdminToken
};