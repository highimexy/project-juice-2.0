import { Link } from "react-router-dom";
import tony from "./assets/tony.png";
import logoAnimacja from "./assets/ANIMACJA.gif";

function NotFoundPage() {
  return (
    <>
      <div className="page-not-found">
        <div className="pnf-header">
          <div></div>
          <img src={tony} className="logo-pj" alt="project juice" />
          <h1>Not Found Page </h1>
          <img src={logoAnimacja} className="logo-pj" alt="project juice" />
        </div>
        <div className="pnf-button">
          <Link to={"/"}>
            <button>Go back Home</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;
