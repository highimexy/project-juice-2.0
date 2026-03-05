import Navigation from "../components/Navigation.tsx";
import WheelCustom from "../components/Wheel/Wheel.tsx";
import TransitionOposite from "../TransitionOposite.tsx";
import gradientSvg from "../assets/gradient.svg?url";

const segments = [
  { label: "- 10%", color: "#585580" },
  { label: "Nic", color: "#1a1a1a" },
  { label: "+10ml", color: "#804141" },
  { label: "Nic", color: "#1a1a1a" },
  { label: "- 15%", color: "#640577" },
  { label: "Nic", color: "#1a1a1a" },
  { label: "+10ml", color: "#585580" },
  { label: "Nic", color: "#1a1a1a" },
  { label: "- 5%", color: "#804141" },
  { label: "Nic", color: "#1a1a1a" },
  { label: "+10ml", color: "#640577" },
  { label: "Nic", color: "#1a1a1a" },
];

function Slot() {
  return (
    <div className="h-screen overflow-hidden flex flex-col pt-20">
      <Navigation />
      <div className="flex flex-col flex-1 min-h-0 w-full box-border px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px] pt-6 pb-10">

        {/* Tytuł z gradientem SVG */}
        <div className="text-center w-full mb-8">
          <div className="w-full flex justify-center mb-4">
            <svg
              viewBox="0 0 1000 100"
              className="w-full max-w-3xl h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="slotGradPattern" patternUnits="userSpaceOnUse" x="0" y="0" width="1000" height="100">
                  <image href={gradientSvg} x="0" y="0" width="1000" height="100" preserveAspectRatio="none" />
                </pattern>
                <filter id="slotTextShadow" x="-5%" y="-10%" width="110%" height="130%">
                  <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#7090ab" floodOpacity="0.75" />
                </filter>
              </defs>
              <text
                x="50%"
                y="78"
                textAnchor="middle"
                fill="url(#slotGradPattern)"
                fontWeight="bold"
                fontSize="72"
                fontFamily="inherit"
                filter="url(#slotTextShadow)"
              >
                Koło Fortuny
              </text>
            </svg>
          </div>

          <p className="text-white/80 text-xl font-['Space_Grotesk'] font-bold mb-1">
            Zakręć kołem i spróbuj wygrać zniżkę!
          </p>
          <p className="text-white/40 text-base font-['Space_Grotesk'] font-bold">
            Masz szansę na procentowe zniżki i dodatkowe ml.
          </p>
        </div>

        <div className="flex-1 min-h-0 flex items-center justify-center">
          <WheelCustom segments={segments} />
        </div>
      </div>
    </div>
  );
}

export default TransitionOposite(Slot);
