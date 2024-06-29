const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv')

dotEnv.config();
const secretKey = process.env.MY_NAME;


const registerAdmin = async(req, res)=>{
    const {email, username,password,name} = req.body;
    try {
        const admin = await Admin.findOne({email});
        if(admin){
            return res.status(400).json({message: "email Already taken"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingAdmin = await Admin.findOne({});
        if(existingAdmin){
            return res.status(400).json({message: "Admin Already exists"})
        }

        const newAdmin = new Admin({
            email,
            username,
            password:hashedPassword,
            name
        })
        await newAdmin.save();
        res.status(200).json({success: "Admin Added successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}

const loginAdmin = async(req, res)=>{
    const {email, password} = req.body;
    try {
        const admin = await Admin.findOne({email});
        const adminPassword = bcrypt.compare(password, admin.password)
        if(!admin || !adminPassword){
            return res.status(400).json({message: "Email or password is incorrect"})
        }
        const token = jwt.sign({adminId: admin._id}, secretKey, {expiresIn: '1h'});
        const adminId = admin._id;
        const adminName = admin.name
        res.status(200).json({success:"Login success", token, adminId, adminName})
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"})
        console.log(error)
    }
}

module.exports = {registerAdmin, loginAdmin}