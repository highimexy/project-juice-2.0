import Navigation from "../components/Navigation.tsx";
import WheelCustom, { type Segment } from "../components/Wheel/Wheel.tsx";
import Text3D from "../components/Text3d.tsx";
import Transition from "../Transition.tsx";

const segments: Segment[] = [
  { label: "- 10%", color: "#585580", weight: 7 },
  { label: "Suchar", color: "#1a1a1a", weight: 10 },
  { label: "+10ml", color: "#804141", weight: 6 },
  { label: "Suchar", color: "#1a1a1a", weight: 10 },
  { label: "- 15%", color: "#640577", weight: 3 },
  { label: "Suchar", color: "#1a1a1a", weight: 10 },
  { label: "+10ml", color: "#585580", weight: 6 },
  { label: "Suchar", color: "#1a1a1a", weight: 10 },
  { label: "- 5%", color: "#804141", weight: 12 },
  { label: "Suchar", color: "#1a1a1a", weight: 10 },
  { label: "+10ml", color: "#640577", weight: 6 },
  { label: "Suchar", color: "#1a1a1a", weight: 10 },
];

function Slot() {
  return (
    <div className="h-screen overflow-hidden flex flex-col pt-36 lg:pt-24 relative">
      <Navigation />

      <div className="flex flex-col flex-1 min-h-0 w-full box-border px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px] pb-10">
        <div className="text-center w-full mb-8">
          <div className="w-full flex justify-center mb-4">
            <Text3D
              text="Koło Fortuny"
              viewBoxWidth={1000}
              viewBoxHeight={100}
              fontSize={72}
              depth={10}
              className="w-full max-w-3xl h-auto"
            />
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

export default Transition(Slot);
