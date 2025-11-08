import { Link } from "react-router-dom";
import logoAnimacja from "./assets/ANIMACJA.gif";
import logoAnimacjaLewo from "./assets/home-export.gif"

function NotFoundPage() {
  return (
    <>
      <div className="page-not-found">
        <div className="pnf-header">
          <img src={logoAnimacja} className="logo-pj" alt="project juice" />
          <h1>Error404<br></br> Page not found</h1>
          <img src={logoAnimacjaLewo} className="logo-pj" alt="project juice" />
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
