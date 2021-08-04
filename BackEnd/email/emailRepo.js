const nodemailer = require('nodemailer');
const userRepository = require('../repositories/userRepository')
var smtpTransport = require('nodemailer-smtp-transport');

const transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'partnertau@gmail.com',
        pass: 'partnerTAU2021'
    }
}));

const SendMatchEmail = async (usernameOne, usernameTwo) =>{
  try{
    const mailOne = await userRepository.GetUserDetails(usernameOne)
    const mailTwo = await userRepository.GetUserDetails(usernameTwo)
    let mailList = [];
    mailList.push(mailOne);
      var mailOptions = {
          from: 'partnertau@gmail.com',
          to: mailList,
          subject: 'נמצאה התאמה עבור אחת מהבקשות שלך',
          text: "נמצאה התאמה, אנא גש לאזור האישי באתר"
        };      
        transport.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
          }
        });
        mailList = []; 
        mailList.push(mailTwo);
        var mailOptions = {
          from: 'partnertau@gmail.com',
          to: mailList,
          subject: 'נמצאה התאמה עבור אחת מהבקשות שלך',
          text: "נמצאה התאמה, אנא גש לאזור האישי באתר"
        };      
        transport.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
          }
        });
        return true; 
  }
  catch(e){
      return false;
  }
}


const SendChatEmail = async (usernameOne,type,courseName) =>{
  try{
    const mailOne = await userRepository.GetUserDetails(usernameOne)
    let mailList = [];
    mailList.push(mailOne)
      var mailOptions = {
          from: 'partnertau@gmail.com',
          to: mailList,
          subject: 'הודעה חדשה בהתאמה שנמצאה ל' + type + " בקורס " + courseName,
          text: "הודעה חדשה, גש לאזור האישי"
        };  
        transport.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
          }
        }); 
        return true; 
  }
  catch(e){
      return false;
  }
}


const SendRemoveRequestEmail = async (usernameOne,type,courseName) =>{
  try{
    const mailOne = await userRepository.GetUserDetails(usernameOne)
    let mailList = [];
    mailList.push(mailOne)
      var mailOptions = {
          from: 'partnertau@gmail.com',
          to: mailList,
          subject: 'משתמש שהיה לך התאמה איתו לגבי בקשה בנושא ' + type + " בקורס " + courseName + ' הסיר את בקשתו',
          text: "גש לאזור האישי"
        };
        transport.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
          }
        }); 
        return true; 
  }
  catch(e){
      return false;
  }
}



module.exports ={
  SendMatchEmail: SendMatchEmail,
  SendChatEmail : SendChatEmail,
  SendRemoveRequestEmail: SendRemoveRequestEmail
}