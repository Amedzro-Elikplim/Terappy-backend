const jwt = require('jsonwebtoken');
const verify = require('express-jwt');


const algorithm = ['sha1', 'RS256', 'HS256'];
const secret = "jjhsUY&**&^Jjhhjjkjjhhlluuhlps03730028e7jj2hs72jj";

const generateToken = (email, password) => {
   return jwt.sign({
        data: {
            email,
            password
        }
    },
        secret,
        { expiresIn: "1hr" });
};


const verifyToken = (secret, algorithm) => {
    return verify({ secret, algorithm })
};

module.exports = {
    generateToken,
    verifyToken
}