/**
 * Original, self-contained SVG illustration of a farmer in a wheat field.
 * Drawn as flat-color shapes (no external images/assets), so it renders
 * instantly with zero network dependency and carries no licensing risk.
 * Used as a decorative strip along the bottom of the Hero section to give
 * the site an unmistakably agricultural visual identity.
 */
export default function FarmerScene({ className = "" }: { className?: string }) {
  const wheatPositions = [40, 120, 200, 280, 720, 800, 860, 1080, 1140];

  return (
    <svg
      viewBox="0 0 1200 180"
      preserveAspectRatio="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Rolling field silhouette */}
      <path
        d="M0,150 Q150,110 300,140 T600,125 T900,145 T1200,115 L1200,180 L0,180 Z"
        fill="white"
        fillOpacity="0.08"
      />

      {/* Sun */}
      <circle cx="1130" cy="30" r="22" fill="#FFB300" fillOpacity="0.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1={1130 + Math.cos((deg * Math.PI) / 180) * 30}
          y1={30 + Math.sin((deg * Math.PI) / 180) * 30}
          x2={1130 + Math.cos((deg * Math.PI) / 180) * 40}
          y2={30 + Math.sin((deg * Math.PI) / 180) * 40}
          stroke="#FFB300"
          strokeOpacity="0.5"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}

      {/* Wheat stalks scattered across the field */}
      {wheatPositions.map((x, i) => (
        <g key={i} transform={`translate(${x}, ${145 - (i % 3) * 4})`} opacity="0.5">
          <line x1="0" y1="0" x2="0" y2="34" stroke="#FFB300" strokeWidth="2.5" strokeLinecap="round" />
          {[0, 6, 12, 18].map((dy) => (
            <g key={dy}>
              <circle cx="-4" cy={dy} r="2.3" fill="#FFB300" />
              <circle cx="4" cy={dy + 3} r="2.3" fill="#FFB300" />
            </g>
          ))}
        </g>
      ))}

      {/* Farmer figure - simple flat pictogram */}
      <g transform="translate(520, 55)" fill="white">
        {/* head */}
        <circle cx="0" cy="0" r="13" />
        {/* simple turban/hat line */}
        <path d="M-13,-4 Q0,-16 13,-4" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* torso */}
        <path d="M-15,18 L15,18 L10,72 L-10,72 Z" />
        {/* legs */}
        <rect x="-13" y="72" width="9" height="34" rx="3" />
        <rect x="4" y="72" width="9" height="34" rx="3" />
        {/* arm holding tool */}
        <path d="M14,26 L42,6" stroke="white" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        {/* hoe handle + blade */}
        <path d="M42,6 L60,44" stroke="#FFB300" strokeWidth="4" strokeLinecap="round" />
        <rect x="52" y="41" width="16" height="7" rx="2" fill="#FFB300" transform="rotate(20 60 44)" />
        {/* other arm resting */}
        <path d="M-14,26 L-24,50" stroke="white" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      </g>

      {/* A second, smaller farmer silhouette in the distance for depth */}
      <g transform="translate(250, 95) scale(0.55)" fill="white" fillOpacity="0.55">
        <circle cx="0" cy="0" r="13" />
        <path d="M-15,18 L15,18 L10,72 L-10,72 Z" />
        <rect x="-13" y="72" width="9" height="34" rx="3" />
        <rect x="4" y="72" width="9" height="34" rx="3" />
        <path d="M14,26 L36,14" stroke="white" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
