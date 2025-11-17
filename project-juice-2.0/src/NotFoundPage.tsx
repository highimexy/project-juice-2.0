import { Link } from "react-router-dom";
import Navigation from "./components/Navigation.tsx";

function NotFoundPage() {
  return (
    <>
      <Navigation />
      <div className="page-not-found">
        <div className="pnf-header">
          <h1 className="home-h1-1 pnf-h1">Error</h1>
          <h1 className="home-h1-2 pnf-h1">404</h1>
          <h1 className="home-h1-3 pnf-h1">Page not found</h1>
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
