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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.placeholder) {
        setFormData({
            ...formData,
            [e.target.placeholder.toLowerCase()]: e.target.value,
        });
    }
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
      const response = await fetch("https://api.juiice.pl/send-email", {
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
        setMessage(data.msg || "Błąd serwera. Spróbuj ponownie.");
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

  const inputClasses = "border-[3px] border-[#111111] rounded-[4px] text-[1.3rem] font-['Unbounded'] px-2 pt-0.5 placeholder-[#1111118e] w-full box-border bg-white text-black";

  return (
    <>
      <div>
        <Navigation />
      </div>
      <div className="flex flex-col items-center pt-10 px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px]">
        <div className="mb-10 pt-6 text-center flex flex-col gap-2.5">
          <h1 className="contact-title">Formluarz kontakotwy</h1>
          <p className="m-0 text-[#585580]">Wypełnij formularz </p>
          <p className="m-0 text-[#640577]">Szybka odpowiedz</p>
          <p className="m-0 pb-[15px] text-[#804141]">
            Niezapomniany smak
          </p>
        </div>

        <BasicTile>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <p className="m-0">Email:</p>
              <input
                className={`${inputClasses} h-40px`}
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <p className="m-0 text-[1em] font-['Unbounded']">Imie:</p>
              <input
                className={`${inputClasses} h-40px`}
                placeholder="Imie"
                type="text"
                value={formData.imie}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <p className="m-0 text-[1em] font-['Unbounded']">Zamowienie:</p>
              <textarea
                className={`${inputClasses} h-[300px]`}
                placeholder="Zamowienie"
                value={formData.zamowienie}
                onChange={(e) =>
                  setFormData({ ...formData, zamowienie: e.target.value })
                }
              />
            </div>
            {message && (
              <p
                className={`text-center font-bold m-0 ${
                  messageType === "error" ? "text-[#cc0000]" : "text-[#009900]"
                }`}
              >
                {message}
              </p>
            )}
            <button
              className="text-[1em] w-[300px]"
              onClick={handleSubmit}
              disabled={isSending}
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