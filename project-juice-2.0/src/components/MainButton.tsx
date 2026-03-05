import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RiArrowRightSLine } from "react-icons/ri";

function MainButton() {
  return (
    <Link to="/Taste">
      <Button
        variant="outline"
        className="w-[300px] bg-[#111010] border-2 border-black hover:border-white hover:bg-[#111010] text-white font-['Unbounded'] font-black text-xl flex items-center justify-between p-4"
      >
        Odkryj swoj smak
        <RiArrowRightSLine className="h-[30px] w-[30px] -mr-2.5" />
      </Button>
    </Link>
  );
}

export default MainButton;
