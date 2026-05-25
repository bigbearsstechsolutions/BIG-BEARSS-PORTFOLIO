const express = require("express")
const nodemailer = require("nodemailer")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/test", (req, res) => {
  res.json({ ok: true, message: "Server kaam kar raha hai!" })
})

app.post("/api/contact", async (req, res) => {
  console.log("Request aaya:", req.body)
  
  const { name, email, phone, company, service, budget, message, source } = req.body

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS
    }
  })

  try {
    await transporter.sendMail({
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
    })

    res.json({ ok: true })

  } catch (error) {
    console.error("EMAIL ERROR:", error.message)  // ✅ error print hoga
    res.status(500).json({ ok: false, error: error.message })
  }
})

const PORT = 5000
app.listen(PORT, () => {
console.log("GMAIL_USER:", process.env.GMAIL_USER)
console.log("GMAIL_PASS:", process.env.GMAIL_APP_PASS)
console.log(`Server is running on ${PORT}`)
})