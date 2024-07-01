const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 587,
    secure:false,
    auth:{
        user:"saimanikantakaranam682@gmail.com",
        pass:"ffzf jxdr cixz fcxv"
    }
})
const resetPassword = async(req, res)=>{
    const {email} = req.body;
    try {
       const admin = await Admin.findOne({email});
       const password = admin.password;

       const mailOptions ={
            from: 'saimanikantakaranam682@gmail.com',
            to:email,
            subject: 'Pawan creative hub admin pannel password...!!!',
            text:`Your password is ${password}`
       }
       transport.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.error("error sending email", error);
            return res.status(500).json({error:'Failed to send confirmation email'})
        }else{
            console.error("Email sent:", info.response);
            return res.status(200).json({success:'success to send confirmation email'})
        }
    })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Failed to reset password'})
    }
}

module.exports ={resetPassword};