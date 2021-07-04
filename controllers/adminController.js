

const User = require("../models/User");
const getAllUsers = async (req, res) => {
    try {
         const allUsers = await User.find();
        if (allUsers) return res.status(200).send({ allUsers });
        res.status(400).send("no user available");

    } catch (error) {
        res.status(400).send(error);
    }
    
}


module.exports = {
    getAllUsers
}