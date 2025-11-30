import { Link } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";

function MainButton() {
  return (
    <>
      <div>
        <Link className="no-underline" to={"/Taste"}>
          {/* Globalne style buttona (border, bg, font) są nadal brane z index.css.
             Tutaj dodajemy tylko układ (flex) i wymiary specyficzne dla MainButton.
          */}
          <button className="w-[300px] flex items-center justify-between p-4">
            Odkryj swoj smak
            <RiArrowRightSLine className="h-[30px] w-[30px] -mr-2.5" />
          </button>
        </Link>
      </div>
    </>
  );
}

export default MainButton;