const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

// App config
const app = express();

// Middlewares
app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());

// API routes
app.post("/email", async (req, res) => {
  const from = req.query.from;
  const to = req.query.to;
  const subject = req.query.subject;
  const text = req.query.text;

  let transporter = nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 2525,
    secure: true,
    auth: {
      user: "simonhe314@gmail.com",
      pass: "4185AC8E3F0E838937EB515A21B139CF03EB",
    },
  });

  let response = await transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    text: text,
  });

  return res.status(201).send({
    body: response,
  });
});

// Listen
exports.api = functions.https.onRequest(app);
