import { BasicTile } from "../components/BasicTile/BasicTile.tsx";
import Navigation from "../components/Navigation.tsx";
import TransitionOposite from "../TransitionOposite.tsx";

interface ArticleCard {
  id: string;
  title: string;
  description: string;
  path: string;
}
function Polecane() {
  // Tablica z dodanym unikalnym, stabilnym polem 'id'
  const ArticleCards: ArticleCard[] = [
    {
      id: "1",
      title: "Title 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel leo luctus, sodales diam eget, varius lorem. Donec ornare ultricies turpis, quis sodales nisi tincidunt non.",
      path: "/",
    },
    {
      id: "2",
      title: "Title 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel leo luctus, sodales diam eget, varius lorem. Donec ornare ultricies turpis, quis sodales nisi tincidunt non.",
      path: "/",
    },
    {
      id: "3",
      title: "Title 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel leo luctus, sodales diam eget, varius lorem. Donec ornare ultricies turpis, quis sodales nisi tincidunt non.",
      path: "/",
    },
  ];

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
        {ArticleCards.map((card) => (
          <BasicTile key={card.id}>
            <div>
              <h1 className="mb-4">{card.title}</h1>
              <p>{card.description}</p>
            </div>
          </BasicTile>
        ))}
      </div>
    </>
  );
}

export default TransitionOposite(Polecane);
