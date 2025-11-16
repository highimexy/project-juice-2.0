import { Link } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";

function MainButton() {
  return (
    <>
        <div className="mainbtn-container">
          <Link className="no-underline " to={"/Taste"}>
            <button>
              Odkryj smaki
              <RiArrowRightSLine className="icon" />
            </button>
          </Link>
        </div>
    </>
  );
}

export default MainButton;
