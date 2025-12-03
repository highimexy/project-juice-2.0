import MainButton from "./components/MainButton.tsx";
import Transition from "./Transition.tsx";

function Home() {
  return (
    <>
      <div className="w-full box-border px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px]">
        <div className="flex flex-col justify-center items-center h-screen gap-2.5 drop-shadow-[0_5px_2em_rgb(0,0,0)]">
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

            <text className="fill-[#e2e1e1] text-[48px] font-extrabold tracking-[1px] md:cursor-default">
              <textPath href="#arc-path" startOffset="50%" textAnchor="middle">
                JUiiCE.PL
              </textPath>
            </text>
          </svg>

          <div className="xl:w-[800px] flex flex-col">
            <div className="flex flex-col text-center mb-10">
              <h1 className="text-3xl md:text-5xl font-bold cursor-default text-[#585580]">
                - GŁĘBIA -
              </h1>
              <h1 className="text-3xl md:text-5xl mt-2.5 font-bold cursor-default text-[#640577]">
                - PRZYJEMNOŚĆ -
              </h1>
              <h1 className="text-3xl md:text-5xl mt-2.5 font-bold cursor-default text-[#804141]">
                - CHARAKTER -
              </h1>
            </div>

            <div className="home-p-container">
              <p className="flex text-center cursor-default font-bold">
                To nie jest kolejny chujowy liquid z drugiej ręki... <br />
                To kompozycja. Stworzona, by dostarczyć idealnie zbalansowane
                doznania od pierwszej, wyrazistej nuty, aż po bogaty,
                satysfakcjonujacy finisz. Tu nie ma miejsca na przypadek.
              </p>
            </div>
          </div>
          <div className="pt-8">
            <MainButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default Transition(Home);
