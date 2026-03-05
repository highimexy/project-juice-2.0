import Navigation from "../components/Navigation.tsx";
import TransitionOposite from "../TransitionOposite.tsx";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
    field: keyof typeof formData,
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
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
        headers: { "Content-Type": "application/json" },
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
    "bg-[#343434] border-2 border-black hover:border-white focus:border-white focus-visible:ring-0 text-white placeholder:text-white/60 font-['Unbounded'] text-xl rounded-lg";

  return (
    <>
      <div>
        <Navigation />
      </div>
      <div className="mb-4 flex flex-col text-center pt-4 md:pt-[100px] w-full box-border px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px]">
        <div className="pb-8">
          <h1 className="font-bold text-4xl md:text-5xl">
            Formularz kontaktowy
          </h1>
          <p className="text-[#585580] text-3xl">Wypełnij formularz</p>
          <p className="text-[#640577] text-3xl">Szybka odpowiedz</p>
          <p className="pb-[15px] text-[#804141] text-3xl">Niezapomniany smak</p>
        </div>

        <Card className="bg-[#111010] border-2 border-black shadow-[8px_8px_#161616] hover:shadow-[12px_12px_#161616] hover:border-white transition-all duration-300 m-auto w-full max-w-2xl">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5 text-left">
                <Label className="text-white font-['Unbounded']">Email</Label>
                <Input
                  className={inputClasses}
                  placeholder="twoj@email.pl"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e, "email")}
                />
              </div>
              <div className="flex flex-col gap-1.5 text-left">
                <Label className="text-white font-['Unbounded']">Imię</Label>
                <Input
                  className={inputClasses}
                  placeholder="Jan"
                  type="text"
                  value={formData.imie}
                  onChange={(e) => handleChange(e, "imie")}
                />
              </div>
              <div className="flex flex-col gap-1.5 text-left">
                <Label className="text-white font-['Unbounded']">Zamówienie</Label>
                <Textarea
                  className={`${inputClasses} h-[300px] resize-none`}
                  placeholder="Opisz swoje zamówienie..."
                  value={formData.zamowienie}
                  onChange={(e) => handleChange(e, "zamowienie")}
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
              <div className="pt-4 flex justify-center">
                <Button
                  variant="outline"
                  className="w-[314px] bg-[#111010] border-2 border-black hover:border-white hover:bg-[#111010] text-white font-['Unbounded'] font-black text-xl"
                  onClick={handleSubmit}
                  disabled={isSending}
                >
                  {isSending ? "Wysyłanie..." : "Wyslij Wiadomosc"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default TransitionOposite(Contact);
