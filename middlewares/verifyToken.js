const dotEnv = require('dotenv')
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin')


dotEnv.config();
const secretKey = process.env.MY_NAME;

const verifyToken = async(req, res, next)=>{
    const token = req.headers.token;
    if(!token){
        return res.status(400).json({message:"Token not found"})
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        const admin = await Admin.findById(decoded.adminId)
        if(!admin){
            return res.status(400).json({message: "Admin Not found"})
        }
        req.adminId = admin._id;
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}

module.exports = {verifyToken};
