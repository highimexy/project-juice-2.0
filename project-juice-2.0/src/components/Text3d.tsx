import gradientSvg from "../assets/gradient.svg?url";

interface Text3DProps {
  text: string;
  fontSize?: number;
  viewBoxWidth?: number;
  viewBoxHeight?: number;
  /** Głębokość efektu 3D (liczba warstw) */
  depth?: number;
  className?: string;
}

/**
 * Komponent 3D text — białe lico napisu z kolorową głębią 3D
 * wypełnioną gradientem z gradient.svg (identycznym jak w reszcie projektu).
 *
 * Użycie:
 *   <Text3D text="Koło Fortuny" viewBoxWidth={900} fontSize={72} />
 */
function Text3D({
  text,
  fontSize = 72,
  viewBoxWidth = 1000,
  viewBoxHeight = 100,
  depth = 10,
  className = "w-full max-w-3xl h-auto",
}: Text3DProps) {
  // Unikalny ID oparty o treść napisu, żeby wiele instancji na stronie się nie gryzło
  const uid = text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const patternId = `t3d-grad-${uid}`;
  const filterId = `t3d-shadow-${uid}`;

  const baseY = Math.round(viewBoxHeight * 0.72);

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={text}
      overflow="visible"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Gradient jako pattern — identyczny z resztą projektu */}
        <pattern
          id={patternId}
          patternUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={viewBoxWidth}
          height={viewBoxHeight}
        >
          <image
            href={gradientSvg}
            x="0"
            y="0"
            width={viewBoxWidth}
            height={viewBoxHeight}
            preserveAspectRatio="none"
          />
        </pattern>

        {/* Delikatna poświata pod spodem */}
        <filter id={filterId} x="-15%" y="-30%" width="130%" height="200%">
          <feDropShadow
            dx="0"
            dy="10"
            stdDeviation="14"
            floodColor="#7090ab"
            floodOpacity="0.7"
          />
        </filter>
      </defs>

      {/*
        Warstwy głębi 3D:
        Zaczynamy od najdalszej (najbardziej przesuniętej) do najbliższej.
        Każda warstwa przesuwa się o 1px w prawo i 1px w dół.
        Wypełnienie = gradient (ten "kolor z tyłu" jak w obrazku).
      */}
      {Array.from({ length: depth }, (_, i) => {
        const layerIndex = depth - i; // od depth do 1
        return (
          <text
            key={i}
            x="50%"
            y={baseY + layerIndex}
            dx={layerIndex}
            textAnchor="middle"
            fill={`url(#${patternId})`}
            fontWeight="bold"
            fontSize={fontSize}
            fontFamily="inherit"
            // Głębsze warstwy nieco bardziej przezroczyste → ładniejsza głębia
            opacity={0.55 + (i / depth) * 0.45}
          >
            {text}
          </text>
        );
      })}

      {/* Lico — biały napis na wierzchu z poświatą */}
      <text
        x="50%"
        y={baseY}
        textAnchor="middle"
        fill="white"
        fontWeight="bold"
        fontSize={fontSize}
        fontFamily="inherit"
        filter={`url(#${filterId})`}
      >
        {text}
      </text>
    </svg>
  );
}

export default Text3D;
