const jwt = require('jsonwebtoken');
const config = require('config');


const key = config.get("jwtPrivateKey.secret");

const generateToken = (user) => {
    return jwt.sign({ id: user.id }, key );
}


const verifyToken = (token) => {
    return jwt.verify(token, key);
}


module.exports = {
    generateToken,
    verifyToken
};