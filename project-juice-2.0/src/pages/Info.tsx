import { Card, CardContent } from "@/components/ui/card";
import Text3D from "../components/Text3d.tsx";
import PageHeader from "../components/PageHeader.tsx";
import Transition from "../Transition.tsx";

const VOLUMES = [
  { label: "15ml / 30ml", theme: "blue" },
  { label: "12mg / 18mg", theme: "purple" },
];

const CONTACT_INFO = {
  name: "Telegram",
  handle: "@juiicepl",
  href: "https://t.me/juiicepl",
};

function Info() {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="grow flex flex-col px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px] pt-36 lg:pt-24 pb-16">
        {/* NAGŁÓWEK */}
        <PageHeader
          heading={
            <Text3D
              text="Informacje"
              viewBoxWidth={900}
              viewBoxHeight={100}
              fontSize={72}
              depth={10}
              className="w-full max-w-2xl h-auto"
            />
          }
          description={
            <>
              <span className="text-white/90">
                Wszystko, co musisz wiedzieć przed zamówieniem.
              </span>
              <br className="hidden md:block" />
              <span className="text-white/55 text-base md:text-lg">
                Pojemności, moc i dostawa w pigułce.
              </span>
            </>
          }
          chips={[
            "15 ml / 30 ml",
            "12 mg / 18 mg",
            "Dostawa osobista",
            "InPost",
          ]}
        />

        {/* CENTROWANA ZAWARTOŚĆ */}
        <section className="grow flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full">
            {/* KOLUMNA: POJEMNOŚCI */}
            <div className="space-y-6 flex flex-col">
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
                  className={`flex-1 bg-[#000]/35 bg-linear-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl border-2 border-white/10 transition-all duration-300
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
                <h2 className="font-['Unbounded'] font-bold text-xl uppercase tracking-widest">
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
                <Card className="bg-[#000]/35 bg-linear-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl border-2 border-white/10 hover:border-[#229ED9] hover:shadow-[0_0_28px_rgba(34,158,217,0.35)] transition-all duration-300">
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

              <Card className="bg-[#000]/35 bg-linear-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl border-2 border-white/10 hover:border-[#640577]/70 hover:shadow-[0_0_24px_rgba(100,5,119,0.35)] transition-all duration-300">
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
