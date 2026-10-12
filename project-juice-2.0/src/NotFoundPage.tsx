import Text3D from "./components/Text3d.tsx";
import Transition from "./Transition.tsx";

function NotFoundContent() {
  return (
    <main className="not-found-page relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 py-24 text-center">
      <div className="relative flex w-full max-w-3xl flex-col items-center">
        <div className="not-found-art relative my-5 flex w-full max-w-[650px] items-center justify-center sm:my-7" aria-hidden="true">
          <div className="not-found-halo pointer-events-none absolute" />
          <div className="relative z-10 w-full">
            <Text3D text="404" fontSize={240} viewBoxWidth={740} viewBoxHeight={320} depth={18} className="w-full h-auto" />
          </div>
          <span className="absolute bottom-[6%] left-0 right-0 font-mono text-[9px] tracking-[0.18em] text-[#a9bfd1]/60 sm:text-[10px]">
            SIGNAL LOST
          </span>
        </div>

        <h1 className="sr-only">404 — nie znaleziono strony</h1>

      </div>
    </main>
  );
}

const NotFoundPage = Transition(NotFoundContent);

export default NotFoundPage;
