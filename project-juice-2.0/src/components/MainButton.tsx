import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";

function MainButton() {
  return (
    <>
      <div className="content-wrapper">
        <div className="mainbtn-container">
          <Link to={"/Taste"}>
            <button>
              SMAKI
              <FaArrowAltCircleRight className="icon" />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default MainButton;
