import MainButton from "./components/MainButton.tsx";
import Transition from "./Transition.tsx";

function Home() {
  return (
    <>
      <div className="content-wrapper ">
        <div className="home">
          <svg className="arc-heading" viewBox="0 0 300 100">
            <path
              id="arc-path"
              d="M 20,80 Q 150,0 280,80"
              fill="none"
              stroke="none"
            />

            <text className="arc-text">
              <textPath href="#arc-path" startOffset="50%" text-anchor="middle">
                juiice.pl
              </textPath>
            </text>
          </svg>

          <p>Description</p>
          <MainButton />
        </div>
      </div>
    </>
  );
}

export default Transition(Home);
