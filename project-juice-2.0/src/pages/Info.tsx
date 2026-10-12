import { ArrowUpRight, Droplets, FlaskConical, MapPin, Package, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Text3D from "../components/Text3d.tsx";
import PageHeader from "../components/PageHeader.tsx";
import Transition from "../Transition.tsx";

const VOLUMES = [
  {
    label: "15 ml / 30 ml",
    caption: "Buteleczki Gorilla",
    icon: FlaskConical,
    accent: "blue",
    description: "Wysokiej jakości buteleczki PET z dozownikiem typu Gorilla.",
  },
  {
    label: "12 mg / 18 mg",
    caption: "Wybierz swoją moc",
    icon: Droplets,
    accent: "purple",
    description: "Dostępne z nikotyną lub solą nikotynową.",
  },
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
              <br />
              <span className="text-white/55 text-base md:text-lg">
                Pojemności, moc i dostawa w pigułce.
              </span>
            </>
          }
          chips={[
            "15 ml / 30 ml",
            "12 mg / 18 mg",
            "Nikotyna / sól nikotynowa",
            "Dostawa osobista",
            "InPost",
          ]}
        />

        <section aria-label="Produkty, kontakt i dostawa" className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {VOLUMES.map(({ label, description, caption, icon: Icon, accent }) => (
            <Card key={label} className={`juice-surface juice-card info-feature info-feature-${accent} gap-0 py-0`}>
              <CardContent className="juice-info-content relative z-10 flex h-full flex-col gap-5 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <span className="juice-chip info-icon h-11 w-11"><Icon size={20} strokeWidth={1.5} aria-hidden="true" /></span>
                  <span className="text-xs font-bold tracking-wider text-white/40 uppercase">{caption}</span>
                </div>
                <h2 className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-white/90 sm:text-4xl">{label}</h2>
                <p className="max-w-sm text-base text-white/60">{description}</p>
              </CardContent>
            </Card>
          ))}

          <a href={CONTACT_INFO.href} target="_blank" rel="noopener noreferrer" className="info-contact group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a9bfd1]">
            <Card className="juice-surface juice-card info-feature info-feature-telegram h-full gap-0 py-0">
              <CardContent className="juice-info-content relative z-10 flex h-full flex-col gap-5 p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="juice-chip info-icon h-11 w-11"><Send size={20} strokeWidth={1.5} aria-hidden="true" /></span>
                  <span className="juice-chip px-3 py-2 text-xs">Porozmawiajmy <ArrowUpRight size={14} aria-hidden="true" /></span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-white/90 sm:text-4xl">{CONTACT_INFO.name}</h2>
                  <ArrowUpRight size={28} strokeWidth={1.5} className="text-[#8fbdd4] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                </div>
                <p className="text-base text-white/60">Masz pytanie lub chcesz zamówić? Napisz do nas.</p>
                <span className="font-['Space_Grotesk'] text-sm font-bold text-[#8fbdd4]">{CONTACT_INFO.handle}</span>
              </CardContent>
            </Card>
          </a>

          <Card className="juice-surface juice-card info-feature info-feature-delivery gap-0 py-0">
            <CardContent className="juice-info-content relative z-10 flex h-full flex-col gap-5 p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <span className="juice-chip info-icon h-11 w-11"><Package size={20} strokeWidth={1.5} aria-hidden="true" /></span>
                <span className="text-xs font-bold tracking-wider text-white/40 uppercase">Po drodze do Ciebie</span>
              </div>
              <h2 className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-white/90 sm:text-4xl">Dostawa</h2>
              <p className="max-w-sm text-base text-white/60">Spotkajmy się w Trójmieście lub odbierz przesyłkę w Paczkomacie InPost.</p>
              <div className="mt-auto flex flex-wrap gap-2">
                <span className="juice-chip px-3 py-2 text-xs"><MapPin size={14} aria-hidden="true" />Trójmiasto</span>
                <span className="juice-chip px-3 py-2 text-xs"><Package size={14} aria-hidden="true" />InPost</span>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

export default Transition(Info);
