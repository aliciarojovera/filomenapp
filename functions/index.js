const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const cors = require('cors')({
  origin: true
})
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password

//Para setear los campos de email y password:
//firebase functions:config:set gmail.email=”<youremail@gmail.com>” gmail.password=”<yourgmailpassword>”

//Para ver el estado del config
//firebase functions:config:get

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
})

exports.submit = functions.https.onRequest((req, res) => {
    console.log(res.body)
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS')
  res.set('Access-Control-Allow-Headers', '*')

  if (req.method === 'OPTIONS') {
    res.end()
  } else {
    cors(req, res, () => {
      if (req.method !== 'POST') {
        return
      }

      const mailOptions = {
        from: gmailEmail,
        replyTo: gmailEmail,
        to: gmailEmail,
        subject: `${req.body.name} just messaged me from my website`,
        text: req.body.message,
        html: `<p>email from: ${req.body.email}<br></br>${req.body.message}</p>`,
      }

      return mailTransport.sendMail(mailOptions).then(() => {
        console.log('New email sent to:', gmailEmail)
        res.status(200).send({
          isEmailSend: true
        })
        return
      })
    })
  }
})