import Navigation from "../components/Navigation.tsx";
import TransitionOposite from "../TransitionOposite.tsx";
import { Card, CardContent } from "@/components/ui/card";
import gradientSvg from "../assets/gradient.svg?url";

const volumes = [
  {
    label: "15ml",
    desc: "Idealna opcja na próbę — poznaj smak przed większym zamówieniem.",
    color: "#7090ab",
    shadow: "rgba(112,144,171,0.5)",
  },
  {
    label: "30ml",
    desc: "Pełna porcja — flagowy rozmiar, najlepszy stosunek ceny do ilości.",
    color: "#585580",
    shadow: "rgba(88,85,128,0.5)",
  },
];

const contacts = [
  {
    name: "Telegram",
    handle: "@username",
    href: "https://t.me/username",
    color: "#229ED9",
    shadow: "rgba(34,158,217,0.4)",
  },
  {
    name: "Signal",
    handle: "+48 000 000 000",
    href: "https://signal.me/#p/+48000000000",
    color: "#3A76F0",
    shadow: "rgba(58,118,240,0.4)",
  },
];

function Contact() {
  return (
    <>
      <Navigation />
      <div className="w-full box-border px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px] pt-24 pb-16">

        {/* Tytuł z gradientem SVG */}
        <div className="text-center mb-12">
          <div className="w-full flex justify-center mb-4">
            <svg
              viewBox="0 0 900 100"
              className="w-full max-w-2xl h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="contactGradPattern" patternUnits="userSpaceOnUse" x="0" y="0" width="900" height="100">
                  <image href={gradientSvg} x="0" y="0" width="900" height="100" preserveAspectRatio="none" />
                </pattern>
                <filter id="contactTextShadow" x="-5%" y="-10%" width="110%" height="130%">
                  <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#7090ab" floodOpacity="0.75" />
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Pojemności + Dostawa */}
          <div className="flex flex-col gap-4">
            <h2 className="font-['Unbounded'] font-bold text-xl text-white/60 uppercase tracking-widest mb-1">
              Pojemności
            </h2>

            {volumes.map((v) => (
              <Card
                key={v.label}
                className="bg-[#111010] border-2 border-black hover:border-white/30 transition-all duration-300 py-0 gap-0"
                style={{
                  ["--hover-shadow" as string]: `0 0 20px ${v.shadow}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${v.shadow}`;
                  (e.currentTarget as HTMLElement).style.borderColor = v.color;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                }}
              >
                <CardContent className="p-5 flex items-center gap-5">
                  <span
                    className="font-['Unbounded'] text-4xl font-bold shrink-0"
                    style={{ color: v.color }}
                  >
                    {v.label}
                  </span>
                  <p className="text-white/80 text-base font-['Space_Grotesk'] font-bold leading-snug">
                    {v.desc}
                  </p>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-[#111010] border-2 border-black hover:border-[#640577]/60 hover:shadow-[0_0_24px_rgba(100,5,119,0.3)] transition-all duration-300 py-0 gap-0">
              <CardContent className="p-5 flex flex-col gap-2">
                <span className="font-['Unbounded'] text-lg font-bold text-[#640577] uppercase tracking-wider">
                  Dostawa
                </span>
                <p className="text-white/80 text-base font-['Space_Grotesk'] font-bold leading-snug">
                  Działamy na terenie <span className="text-white">Trójmiasta</span> — dostawa osobista.{" "}
                  Możliwy również <span className="text-white">Paczkomat InPost</span> na terenie całej Polski.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Kontakt */}
          <div className="flex flex-col gap-4">
            <h2 className="font-['Unbounded'] font-bold text-xl text-white/60 uppercase tracking-widest mb-1">
              Kontakt
            </h2>

            <p className="text-white/70 text-base font-['Space_Grotesk'] font-bold leading-relaxed">
              Pytania o smaki, dostępność lub składanie zamówień — pisz do nas bezpośrednio:
            </p>

            {contacts.map((c) => (
              <a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card
                  className="bg-[#111010] border-2 border-black transition-all duration-300 py-0 gap-0"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px ${c.shadow}`;
                    (e.currentTarget as HTMLElement).style.borderColor = c.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                  }}
                >
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="flex flex-col">
                      <span
                        className="font-['Unbounded'] text-2xl font-bold"
                        style={{ color: c.color }}
                      >
                        {c.name}
                      </span>
                      <span className="text-white/50 text-sm font-['Space_Grotesk'] mt-1">
                        {c.handle}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}

            <p className="text-white/30 text-sm font-['Space_Grotesk'] mt-2">
              Staramy się odpowiadać możliwie najszybciej.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransitionOposite(Contact);
