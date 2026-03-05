import Navigation from "../components/Navigation.tsx";
import WheelCustom from "../components/Wheel/Wheel.tsx";
import TransitionOposite from "../TransitionOposite.tsx";

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
    <>
      <Navigation />
      <div className="flex flex-col items-center gap-6 pt-8 pb-16 w-full box-border px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px]">
        <div className="text-center">
          <h1 className="font-bold text-4xl md:text-5xl mb-2">Koło Fortuny!</h1>
          <p className="text-[#585580] text-2xl">Zakręć kołem i spróbuj wygrać zniżkę!</p>
          <p className="text-[#640577] text-2xl">Masz szansę na procentowe zniżki.</p>
        </div>
        <WheelCustom segments={segments} />
      </div>
    </>
  );
}

export default TransitionOposite(Slot);
