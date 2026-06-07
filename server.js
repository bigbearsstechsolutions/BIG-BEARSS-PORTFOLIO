const express = require("express")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, "../FRONTEND/dist")))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  if (req.method === "OPTIONS") return res.sendStatus(200)
  next()
})  


app.post("/api/contact", require("./nodemailer"))

// Test route — uncomment karo check ke liye
app.get("/test", (req, res) => {
  res.json({ ok: true, message: "Server kaam kar raha hai!" })
})

app.get('/{*splat}', (req, res)=>{
  res.sendFile(path.join(__dirname, "../FRONTEND/dist/index.html"))
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})