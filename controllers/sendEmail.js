
const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:"saimanikantakaranam682@gmail.com",
        pass:"ffzf jxdr cixz fcxv"
    }
})

const sendEmail = async(req, res)=>{
    const {phone, message, name, email} = req.body;

    try {
        const mailOptions = {
            from: email,
            to:'pavankumarkanapakala121@gmail.com',
            subject:'PAVAN CREATIVE HUB',
            text:`I want to contact you for discuss about E-Digital Project. My Name is ${name} and phone ${phone} 
            ${message}`
        }
        transporter.sendMail(mailOptions, (error, info)=>{
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
module.exports ={sendEmail}