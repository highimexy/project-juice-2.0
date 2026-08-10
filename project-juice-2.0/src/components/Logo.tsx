import gradientSvg from "../assets/gradient.svg?url";

interface LogoProps {
  /** Unikalny identyfikator — potrzebny gdy logo występuje kilka razy na stronie */
  id: string;
  /** arc = napis na łuku (nav), flat = prosty napis (hero) */
  variant?: "arc" | "flat";
  text?: string;
  /** Szerokość w px (tylko wariant arc; flat rozciąga się na 100% kontenera) */
  width?: number;
  fontSize?: number;
  className?: string;
}

/**
 * Logo Juiice 3D:
 * - warstwy głębi wypełnione gradientem projektu (gradient.svg)
 * - błyszczące lico (gradient biały → stalowy)
 * - przechodzący połysk (shine sweep) animowany SMIL
 * - miękki cień w kolorze akcentu
 */
function Logo({
  id,
  variant = "arc",
  text = "JUIICE.PL",
  width = 170,
  fontSize = 40,
  className,
}: LogoProps) {
  const patternId = `logo-grad-${id}`;
  const faceId = `logo-face-${id}`;
  const shineId = `logo-shine-${id}`;
  const shadowId = `logo-shadow-${id}`;
  const arcId = `logo-arc-${id}`;

  const isArc = variant === "arc";
  const depth = isArc ? 8 : 14;
  const viewBox = isArc ? "0 0 300 100" : "0 0 820 160";
  const baseY = isArc ? 0 : 122;

  return (
    <svg
      viewBox={viewBox}
      style={{
        width: isArc ? `${width}px` : "100%",
        height: "auto",
        overflow: "visible",
        marginBottom: isArc ? "-12px" : 0,
        fontFamily: "'Unbounded', system-ui, sans-serif",
      }}
      className={className}
      role="img"
      aria-label={text}
    >
      <defs>
        {/* Gradient projektu jako pattern — spójny z resztą strony */}
        <pattern
          id={patternId}
          patternUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="820"
          height="160"
        >
          <image
            href={gradientSvg}
            x="0"
            y="0"
            width="820"
            height="160"
            preserveAspectRatio="none"
          />
        </pattern>

        {/* Lico — delikatny metaliczny gradient */}
        <linearGradient id={faceId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f0f5fa" />
          <stop offset="100%" stopColor="#b6c5d4" />
        </linearGradient>

        {/* Przechodzący połysk — wąski pas bieli wędrujący po literach */}
        <linearGradient
          id={shineId}
          x1="0"
          y1="0"
          x2="0.22"
          y2="0"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            from="-1.2 0"
            to="1.2 0"
            dur="3.4s"
            repeatCount="indefinite"
          />
        </linearGradient>

        {/* Miękki cień pod logo */}
        <filter id={shadowId} x="-15%" y="-30%" width="130%" height="220%">
          <feDropShadow
            dx="0"
            dy="5"
            stdDeviation="9"
            floodColor="#7090ab"
            floodOpacity="0.75"
          />
        </filter>

        {isArc && <path id={arcId} d="M 20,80 Q 150,0 280,80" />}
      </defs>

      {isArc ? (
        <>
          {/* Warstwy głębi 3D na łuku */}
          {Array.from({ length: depth }, (_, i) => {
            const offset = depth - i;
            return (
              <g key={i} transform={`translate(${offset * 0.5}, ${offset})`}>
                <text
                  fontSize={fontSize}
                  fontWeight="800"
                  letterSpacing="1"
                  opacity={0.5 + (i / depth) * 0.5}
                >
                  <textPath
                    href={`#${arcId}`}
                    startOffset="50%"
                    textAnchor="middle"
                    fill={`url(#${patternId})`}
                  >
                    {text}
                  </textPath>
                </text>
              </g>
            );
          })}
          {/* Lico */}
          <text
            fontSize={fontSize}
            fontWeight="800"
            letterSpacing="1"
            filter={`url(#${shadowId})`}
          >
            <textPath
              href={`#${arcId}`}
              startOffset="50%"
              textAnchor="middle"
              fill={`url(#${faceId})`}
            >
              {text}
            </textPath>
          </text>
          {/* Połysk */}
          <text fontSize={fontSize} fontWeight="800" letterSpacing="1" opacity="0.7">
            <textPath
              href={`#${arcId}`}
              startOffset="50%"
              textAnchor="middle"
              fill={`url(#${shineId})`}
            >
              {text}
            </textPath>
          </text>
        </>
      ) : (
        <>
          {/* Warstwy głębi 3D — proste */}
          {Array.from({ length: depth }, (_, i) => {
            const layerIndex = depth - i;
            return (
              <text
                key={i}
                x="50%"
                y={baseY + layerIndex}
                dx={layerIndex}
                textAnchor="middle"
                fill={`url(#${patternId})`}
                fontWeight="800"
                fontSize={fontSize}
                letterSpacing="2"
                opacity={0.55 + (i / depth) * 0.45}
              >
                {text}
              </text>
            );
          })}
          {/* Lico */}
          <text
            x="50%"
            y={baseY}
            textAnchor="middle"
            fill={`url(#${faceId})`}
            fontWeight="800"
            fontSize={fontSize}
            letterSpacing="2"
            filter={`url(#${shadowId})`}
          >
            {text}
          </text>
          {/* Połysk */}
          <text
            x="50%"
            y={baseY}
            textAnchor="middle"
            fill={`url(#${shineId})`}
            fontWeight="800"
            fontSize={fontSize}
            letterSpacing="2"
            opacity="0.7"
          >
            {text}
          </text>
        </>
      )}
    </svg>
  );
}

export default Logo;
