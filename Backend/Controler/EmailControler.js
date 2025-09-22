require('dotenv').config();
const nodemailer = require("nodemailer");

const sentEmail = async(req , res) =>{
     const { first_name, last_name, email, reason, message } = req.body;
     try{

        const transporter = nodemailer.createTransport({
            service:"gmail" ,
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        })
        const mailOPtion = {
            from: email ,
            to:process.env.EMAIL_USER ,
            subject: `New Inquiry : ${reason}` , 
            text: `
            You have a new inquiry:
        Name: ${first_name} ${last_name}
        Email: ${email}
        Reason: ${reason}
        Message: ${message}
            `
        }
        await transporter.sendMail(mailOPtion) ;
         res.status(200).json({ success: true, message: "Message sent successfully!" });
     }catch(error){
        console.error("Email sending error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
     }
    console.log("hello , i am email sender") ;
}

module.exports = {sentEmail}