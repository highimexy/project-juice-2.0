import Navigation from "../components/Navigation.tsx";
import TransitionOposite from "../TransitionOposite.tsx";

function Polecane() {
  return (
    <>
      <div>
        <Navigation />
      </div>
      <div className="flex flex-col text-center pt-[100px] w-full box-border px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px]">
        <h1>Praca w toku...</h1>
        <p className="mt-[5px] text-[#585580]">
          Na tej stronie beda artykuly
        </p>
        <p className="mt-[5px] text-[#640577]">
          z Polski i swiata
        </p>
        <p className="mt-[5px] text-[#804141]">
          dotyczace ogolnopojetego tematu vapowania
        </p>
      </div>
    </>
  );
}

export default TransitionOposite(Polecane);