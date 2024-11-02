import nodemailer from "nodemailer";
import config from "../config/config";
import { text } from "express";
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.port === 465,

  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

const sendEmail = async (to, subject, text) =>{
    const mailOptions = {
        from: config.email.user,
        to,
        subject,
        text,
    };
    try {
        await transporter.sendEmail(mailOptions);
        console.log('Email enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar email');
        
    }
};
export default sendEmail;
