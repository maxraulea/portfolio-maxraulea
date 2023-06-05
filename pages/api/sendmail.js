export default async function(req, res) {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: 'max.raulea@gmail.com', // Change to your recipient
      from: 'max.raulea2@gmail.com', // Change to your verified sender
      subject: 'email from ' + req.body.email,
      //text: 'contents of the message:' + req.body.message,
      html:'<strong><i>'+req.body.email +' writes</i></strong> <br>' + req.body.userMessage
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
	  res.status(200).send("email sent succesfully");
}