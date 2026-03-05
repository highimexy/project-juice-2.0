import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { to: "/Taste", label: "Smaki", color: "text-white" },
  { to: "/Kontakt", label: "Kontakt", color: "text-[#585580]" },
  { to: "/Slot", label: "???", color: "text-[#804141]" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between box-border w-full py-5 px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px] 2xl:py-10 bg-black/30 backdrop-blur-sm border-b-2 border-black">
      <Link to="/">
        <svg
          className="w-full max-w-[400px] h-auto -mb-4 md:max-w-[600px]"
          viewBox="0 0 300 100"
        >
          <path
            id="arc-path"
            d="M 20,80 Q 150,0 280,80"
            fill="none"
            stroke="none"
          />
          <text className="fill-[#e2e1e1] text-[38px] font-extrabold tracking-[1px] cursor-pointer md:cursor-default">
            <textPath href="#arc-path" startOffset="50%" textAnchor="middle">
              JUiiCE.PL
            </textPath>
          </text>
        </svg>
      </Link>

      {/* Desktop nav */}
      <div className="hidden lg:flex gap-[15px]">
        {navLinks.map(({ to, label, color }) => (
          <Link key={to} to={to}>
            <Button
              variant="outline"
              className={`h-10 w-40 bg-[#111010] border-2 border-black hover:border-white hover:bg-[#111010] ${color}`}
            >
              {label}
            </Button>
          </Link>
        ))}
      </div>

      {/* Mobile nav */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="block lg:hidden text-white hover:bg-transparent"
            aria-label="Otwórz menu"
          >
            <Menu className="w-10 h-10" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-[#1a1a1a] border-black w-full text-white"
        >
          <div className="flex flex-col items-center gap-5 mt-16">
            {navLinks.map(({ to, label, color }) => (
              <Link key={to} to={to} className="w-full flex justify-center">
                <Button
                  variant="outline"
                  className={`w-[90%] bg-[#111010] border-2 border-black hover:border-white hover:bg-[#111010] ${color}`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Button>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Navbar;
