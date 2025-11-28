import Navigation from "../components/Navigation.tsx";
import { BasicTile } from "../components/BasicTile/BasicTile.tsx";
import TransitionOposite from "../TransitionOposite.tsx";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    imie: "",
    zamowienie: "",
  });
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messageType, setMessageType] = useState("info");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.placeholder.toLowerCase()]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsSending(true);
    setMessage("");
    setMessageType("info"); 

    if (!formData.email || !formData.imie || !formData.zamowienie) {
      setMessage("Prosze wypelnic wszystkie pola!");
      setMessageType("error");
      setIsSending(false);
      return;
    }

    try {
      const response = await fetch("https://api.juiice.pl/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.msg);
        setMessageType("success");
        setFormData({ email: "", imie: "", zamowienie: "" });
      } else {
        setMessage((data.msg || "Błąd serwera. Spróbuj ponownie."));
        setMessageType("error");
      }
    } catch (error) {
      console.error("Błąd wysyłki:", error);
      setMessage("Błąd połączenia z serwerem.");
      setMessageType("error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="">
        <Navigation />
      </div>
      <div className="contact content-wrapper">
        <div className="contact-hero">
          <h1 className="contact-title">Formluarz kontakotwy</h1>
          <p className="taste-hero-1 pnf-h1 ">Wypełnij formularz </p>
          <p className="taste-hero-2 pnf-h1">Szybka odpowiedz</p>
          <p className="taste-hero-3 pnf-h1 taste-hero-last">
            Niezapomniany smak
          </p>
        </div>
        <BasicTile>
          <div className="contact-formulage">
            {/* EMAIL */}
            <div className="email-input">
              <p>Email:</p>
              <input
                className="contact-input"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* IMIE */}
            <div className="email-input">
              <p>Imie:</p>
              <input
                className="contact-input"
                placeholder="Imie"
                type="text"
                value={formData.imie}
                onChange={handleChange}
              />
            </div>

            {/* ZAMOWIENIE/TREŚĆ */}
            <div className="email-input">
              <p>Zamowienie:</p>
              <textarea 
                className="order-input"
                placeholder="Zamowienie"
                value={formData.zamowienie}
                onChange={(e) =>
                  setFormData({ ...formData, zamowienie: e.target.value })
                }
              />
            </div>

            {/* 3. KOMUNIKAT ZWROTNY - DYNAMICZNA KLASA CSS */}
            {message && (
              <p
                className={`message-box ${
                  messageType === "error" ? "message-error" : "message-success"
                }`}
              >
                {message}
              </p>
            )}

            {/* BUTTON WYSYŁANIA */}
            <button
              className="contact-send"
              onClick={handleSubmit}
              disabled={isSending} // Zapobiega wielokrotnemu kliknięciu
            >
              {isSending ? "Wysyłanie..." : "Wyslij Wiadomosc"}
            </button>
          </div>
        </BasicTile>
      </div>
    </>
  );
}

export default TransitionOposite(Contact);
