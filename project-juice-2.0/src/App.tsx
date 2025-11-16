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
          <div className="description-container">
            <div className="home-h1-container">
              <h1 className="home-h1-1">- GLEBIA -</h1>
              <h1 className="home-h1-2">- CHARAKTER -</h1>
              <h1 className="home-h1-3">- PELNIA -</h1>
            </div>
            <div className="home-p-container">
              {" "}
              <p>
                To nie jest kolejny liquid z "zabki". To kompozycja. Stworzona,
                by dostarczyć idealnie zbalansowane doznania od pierwszej,
                wyrazistej nuty, aż po bogaty, satysfakcjonujacy finisz. Tu nie
                ma miejsca na przypadek. Tylko mistrzowska receptura i czysta
                przyjemnosc. Poczuj roznice. Odkryj swoj smak.
              </p>
            </div>
          </div>

          <MainButton />
        </div>
      </div>
    </>
  );
}

export default Transition(Home);
