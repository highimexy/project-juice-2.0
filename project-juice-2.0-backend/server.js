import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors'; // Jeśli potrzebujesz do komunikacji frontend-backend

dotenv.config(); // Ładuje zmienne z pliku .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Zezwolenie na CORS (dla komunikacji z frontendem)
app.use(express.json()); // Umożliwia Expressowi parsowanie JSON-a z ciała żądania

// Konfiguracja Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Użyj 'gmail' lub innego serwisu (np. 'smtp.sendgrid.net')
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Endpoint do wysyłki e-maila
app.post('/send-email', async (req, res) => {
  const { email, imie, zamowienie } = req.body; // Odbieramy dane z formularza

  // Prosta walidacja
  if (!email || !imie || !zamowienie) {
    return res.status(400).json({ msg: 'Prosze wypelnic wszystkie pola.' });
  }

  // Treść wiadomości
  const mailOptions = {
    from: process.env.EMAIL_USER, // Kto wysyła (może być inny, ale musi być autoryzowany)
    to: process.env.EMAIL_RECEIVER, // Kto odbiera (Twój e-mail firmowy)
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

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Server działa na porcie ${PORT}`);
});