import WheelCustom, { type Segment } from "../components/Wheel/Wheel.tsx";
import Text3D from "../components/Text3d.tsx";
import PageHeader from "../components/PageHeader.tsx";
import Transition from "../Transition.tsx";

const segments: Segment[] = [
  { label: "- 10%", color: "#585580", weight: 2 },
  { label: "Pudło!", color: "#1a1a1a", weight: 14 },
  { label: "+10ml", color: "#804141", weight: 2 },
  { label: "Pudło!", color: "#1a1a1a", weight: 14 },
  { label: "- 15%", color: "#640577", weight: 1 },
  { label: "Pudło!", color: "#1a1a1a", weight: 14 },
  { label: "+10ml", color: "#585580", weight: 2 },
  { label: "Pudło!", color: "#1a1a1a", weight: 14 },
  { label: "- 5%", color: "#804141", weight: 4 },
  { label: "Pudło!", color: "#1a1a1a", weight: 15 },
  { label: "+10ml", color: "#640577", weight: 2 },
  { label: "Pudło!", color: "#1a1a1a", weight: 14 },
];

function Slot() {
  return (
    <div className="h-screen overflow-hidden flex flex-col pt-36 lg:pt-24 relative">

      <div className="flex flex-col flex-1 min-h-0 w-full box-border px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px] pb-10">
        <PageHeader
          heading={
            <Text3D
              text="Koło Fortuny"
              viewBoxWidth={1000}
              viewBoxHeight={100}
              fontSize={72}
              depth={10}
              className="w-full max-w-3xl h-auto"
            />
          }
          description={
            <>
              Zakręć kołem i spróbuj wygrać zniżkę!
              <br />
              <span className="text-white/40 text-base md:text-lg">
                Masz szansę na procentowe rabaty i dodatkowe ml.
              </span>
            </>
          }
          chips={["-5% · -10% · -15%", "+10 ml", "Pudło!"]}
        />

        <div className="flex-1 min-h-0 flex items-center justify-center">
          <WheelCustom segments={segments} />
        </div>
      </div>
    </div>
  );
}

export default Transition(Slot);
