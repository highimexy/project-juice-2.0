import Navigation from "../components/Navigation.tsx";
import { Card, CardContent } from "@/components/ui/card";
import gradientSvg from "../assets/gradient.svg?url";
import Transition from "../Transition.tsx";

// Dane są teraz czystsze - stylizację przenosimy do komponentu
const VOLUMES = [
  { label: "15ml / 30ml", theme: "blue" },
  { label: "12mg / 18mg", theme: "purple" },
];

const CONTACT_INFO = {
  name: "Telegram",
  handle: "@username",
  href: "https://t.me/username",
};

function Info() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="grow flex flex-col px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px] pt-32 lg:pt-24 pb-16">
        {/* NAGŁÓWEK - Zawsze na górze */}
        <header className="text-center mb-12 shrink-0">
          <div className="w-full flex justify-center mb-4">
            <svg
              viewBox="0 0 900 100"
              className="w-full max-w-2xl h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="contactGradPattern"
                  patternUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="900"
                  height="100"
                >
                  <image
                    href={gradientSvg}
                    x="0"
                    y="0"
                    width="900"
                    height="100"
                    preserveAspectRatio="none"
                  />
                </pattern>
                <filter
                  id="contactTextShadow"
                  x="-5%"
                  y="-10%"
                  width="110%"
                  height="130%"
                >
                  <feDropShadow
                    dx="0"
                    dy="6"
                    stdDeviation="12"
                    floodColor="#7090ab"
                    floodOpacity="0.75"
                  />
                </filter>
              </defs>
              <text
                x="50%"
                y="78"
                textAnchor="middle"
                fill="url(#contactGradPattern)"
                fontWeight="bold"
                fontSize="72"
                fontFamily="inherit"
                filter="url(#contactTextShadow)"
              >
                Informacje
              </text>
            </svg>
          </div>
          <p className="text-white/80 text-xl font-['Space_Grotesk'] font-bold max-w-xl mx-auto">
            Wszystko co musisz wiedzieć przed zamówieniem.
          </p>
        </header>

        {/* CENTROWANA ZAWARTOŚĆ */}
        <section className="grow flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full">
            {/* KOLUMNA: POJEMNOŚCI */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="font-['Unbounded'] font-bold text-xl uppercase tracking-widest">
                  Pojemności i Moc
                </h2>
                <p className="text-white/70 text-base font-['Space_Grotesk'] font-bold">
                  Dostępne warianty naszych produktów:
                </p>
              </div>

              {VOLUMES.map((v) => (
                <Card
                  key={v.label}
                  className={`bg-[#111010] border-2 border-black transition-all duration-300
                    ${
                      v.theme === "blue"
                        ? "hover:border-[#7090ab] hover:shadow-[0_0_24px_rgba(112,144,171,0.4)]"
                        : "hover:border-[#585580] hover:shadow-[0_0_24px_rgba(88,85,128,0.4)]"
                    }`}
                >
                  <CardContent className="p-6">
                    <span
                      className={`font-['Unbounded'] text-4xl font-bold ${v.theme === "blue" ? "text-[#7090ab]" : "text-[#585580]"}`}
                    >
                      {v.label}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* KOLUMNA: KONTAKT I DOSTAWA */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="font-['Unbounded'] font-bold text-xl  uppercase tracking-widest">
                  Kontakt / Dostawa
                </h2>
                <p className="text-white/70 text-base font-['Space_Grotesk'] font-bold">
                  Pisz do nas bezpośrednio:
                </p>
              </div>

              <a
                href={CONTACT_INFO.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="bg-[#111010] border-2 border-black hover:border-[#229ED9] hover:shadow-[0_0_28px_rgba(34,158,217,0.3)] transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col">
                      <span className="font-['Unbounded'] text-2xl font-bold text-[#229ED9]">
                        {CONTACT_INFO.name}
                      </span>
                      <span className="text-white/50 text-sm font-['Space_Grotesk'] mt-1">
                        {CONTACT_INFO.handle}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </a>

              <Card className="bg-[#111010] border-2 border-black hover:border-[#640577]/60 hover:shadow-[0_0_24px_rgba(100,5,119,0.3)] transition-all duration-300">
                <CardContent className="p-6 space-y-2">
                  <span className="font-['Unbounded'] text-lg font-bold text-[#640577] uppercase tracking-wider">
                    Dostawa
                  </span>
                  <p className="text-white/80 text-base font-['Space_Grotesk'] font-bold leading-snug">
                    Działamy na terenie{" "}
                    <span className="text-white underline decoration-[#640577]">
                      Trójmiasta
                    </span>{" "}
                    — dostawa osobista. Możliwy również{" "}
                    <span className="text-white underline decoration-blue-500">
                      Paczkomat InPost
                    </span>
                    .
                  </p>
                </CardContent>
              </Card>

              <p className="text-white/30 text-xs font-['Space_Grotesk'] text-right">
                Odpowiadamy najszybciej jak to możliwe.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Transition(Info);
