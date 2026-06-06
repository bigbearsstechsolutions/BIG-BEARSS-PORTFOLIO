 const nodemailer = require('nodemailer')
 const sendmail = async (req, res) => {
  const { name, email, phone, company, service, budget, message, source } = req.body

  const transporter = nodemailer.createTransport({
    service: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS
    },
    tls: {
      rejectUnauthorized: false  // ✅ ye bhi add karo
    },
    secure: true, 
  });

  try {
    const sendMail = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Inquiry from ${name}`,
      html: `
        <h2>New Client Inquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Company:</b> ${company}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Budget:</b> ${budget}</p>
        <p><b>Source:</b> ${source}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };
    await new Promise((resolve, reject) =>{
      transporter.sendMail(sendMail, (error, info) =>{
        if(error){
          console.error(error)
          reject(error)
        }else{
          resolve(info)
        }
      })
    })

    res.status(200).json({
      message : "Email sent successfully"
    })

  } catch (error) {
    console.error("EMAIL ERROR:", error.message)  // ✅ error print hoga
    res.status(500).json({ ok: false, error: error.message })
  }
}

module.exports = sendmail