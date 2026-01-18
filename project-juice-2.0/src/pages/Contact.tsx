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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
      // Zmień to na próbę:
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

  const inputClasses =
    "border-[2px] border-black rounded-[4px] text-[1.3rem] font-['Unbounded'] px-2 pt-0.5 placeholder-[#f7f7f7] w-full box-border bg-[#343434] text-[#ffffff]";

  return (
    <>
      <div>
        <Navigation />
      </div>
      <div className="mb-4 flex flex-col text-center pt-4 md:pt-[100px] w-full box-border px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px]">
        <div className="pb-8">
          <h1 className="font-bold text-4xl md:text-5xl">
            Formluarz kontakotwy
          </h1>
          <p className="text-[#585580] text-3xl">Wypełnij formularz </p>
          <p className="text-[#640577] text-3xl">Szybka odpowiedz</p>
          <p className="pb-[15px] text-[#804141] text-3xl">
            Niezapomniany smak
          </p>
        </div>

        <BasicTile>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <input
                className={`${inputClasses} h-40px`}
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <input
                className={`${inputClasses} h-40px`}
                placeholder="Imie"
                type="text"
                value={formData.imie}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
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
            <div className="pt-4">
              <button
                className="w-[314px]"
                onClick={handleSubmit}
                disabled={isSending}
              >
                {isSending ? "Wysyłanie..." : "Wyslij Wiadomosc"}
              </button>
            </div>
          </div>
        </BasicTile>
      </div>
    </>
  );
}

export default TransitionOposite(Contact);
