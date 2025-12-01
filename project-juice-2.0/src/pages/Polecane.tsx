import { BasicTile } from "../components/BasicTile/BasicTile.tsx";
import Navigation from "../components/Navigation.tsx";
import TransitionOposite from "../TransitionOposite.tsx";

function Polecane() {
  return (
    <>
      <div>
        <Navigation />
      </div>
      <div className="mb-10 flex flex-col text-center pt-[100px] w-full box-border px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px]">
        <h1>INFORMACJE</h1>
        <p className="mt-[5px] text-[#585580]">
          Poradniki, artykuły, ciekawostki
        </p>
        <p className="mt-[5px] text-[#640577]">z Polski i swiata</p>
        <p className="mt-[5px] text-[#804141]">
          dotyczace ogolnopojetego tematu vapowania
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex md:flex-row">
        <BasicTile>
          <div>
            <h1 className="mb-4">Artykuł 1</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              repudiandae quasi doloribus et incidunt minus facilis nesciunt
              quia accusantium quas, vel quibusdam vitae laudantium, blanditiis
              necessitatibus officia, ea nobis eum?e
            </p>
          </div>
        </BasicTile>
        <BasicTile>
          <div>
            <h1 className="mb-4">Artykuł 1</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              repudiandae quasi doloribus et incidunt minus facilis nesciunt
              quia accusantium quas, vel quibusdam vitae laudantium, blanditiis
              necessitatibus officia, ea nobis eum?e
            </p>
          </div>
        </BasicTile>
        <BasicTile>
          <div>
            <h1 className="mb-4">Artykuł 1</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              repudiandae quasi doloribus et incidunt minus facilis nesciunt
              quia accusantium quas, vel quibusdam vitae laudantium, blanditiis
              necessitatibus officia, ea nobis eum?e
            </p>
          </div>
        </BasicTile>
      </div>
    </>
  );
}

export default TransitionOposite(Polecane);
