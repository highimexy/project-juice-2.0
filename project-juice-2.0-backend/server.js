import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors'; 

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Backend działa! 🚀 Wyślij POST na /send-email');
});

// Nodemailer
// Zamiast: service: 'gmail'
// TESTOWY TRANSPORTER (ETHEREAL)
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, 
  auth: {
    // To są publiczne dane testowe z dokumentacji, każdy może ich użyć
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
  tls: {
    rejectUnauthorized: false
  },
  family: 4
});

// Endpoint 
app.post('/send-email', async (req, res) => {
  const { email, imie, zamowienie } = req.body; 

  // walidacja
  if (!email || !imie || !zamowienie) {
    return res.status(400).json({ msg: 'Prosze wypelnic wszystkie pola.' });
  }

  // Treść 
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: process.env.EMAIL_RECEIVER, 
    subject: `Nowe zgłoszenie kontaktowe od ${imie} (juiice.pl)`,
    html: `
      <h2>Nowa Wiadomość Kontaktowa</h2>
      <p><strong>Imię:</strong> ${imie}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Zamówienie/Treść:</strong> ${zamowienie}</p>
      <hr>
      <p>Wiadomość wysłana przez formularz kontaktowy na juiice.pl.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: 'Wiadomość zostala pomyslnie wyslana!' });
  } catch (error) {
    console.error('Błąd wysyłki e-maila:', error);
    res.status(500).json({ msg: 'Wystapil blad podczas wysylania wiadomosci.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server działa na porcie ${PORT}`);
});