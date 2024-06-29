const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')

const resetPassword = async(req, res)=>{
    const {email, newPassword} = req.body;
    try {
        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(400).json({message:"Admin not Found"})
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        admin.password = hashedPassword;

        await admin.save();
        res.status(200).json({success: "Updating password successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Failed to reset password'})
    }
}

module.exports ={resetPassword};