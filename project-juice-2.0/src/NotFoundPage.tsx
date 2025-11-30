import { Link } from "react-router-dom";
import Navigation from "./components/Navigation.tsx";

function NotFoundPage() {
  return (
    <>
      <Navigation />
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="m-0 text-[#585580]">Error</h1>
          <h1 className="m-0 text-[#640577]">404</h1>
          <h1 className="m-0 text-[#804141]">Page not found</h1>
        </div>
        <div className="mt-8 flex items-center justify-center">
          <Link to={"/"}>
            <button>Go back Home</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;
