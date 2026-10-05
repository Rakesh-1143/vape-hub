import { useId } from "react";
import type { CategoryKind } from "../data/content";
/** Original vector product studies: no manufacturer artwork or inventory claims. */
export function CategoryVisual({ kind }: { kind: CategoryKind }) {
  const id = useId().replace(/:/g, "");
  const paint = `url(#paint-${id})`;
  const metal = `url(#metal-${id})`;
  const dark = `url(#dark-${id})`;
  return (
    <svg
      viewBox="0 0 420 320"
      fill="none"
      aria-hidden="true"
      className={`category-visual visual-${kind}`}
    >
      <defs>
        <linearGradient
          id={`paint-${id}`}
          x1="80"
          y1="50"
          x2="290"
          y2="260"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--category-accent)" />
          <stop
            offset=".3"
            stopColor="var(--category-accent)"
            stopOpacity=".7"
          />
          <stop
            offset=".65"
            stopColor="var(--category-accent)"
            stopOpacity=".25"
          />
          <stop offset="1" stopColor="var(--category-accent)" />
        </linearGradient>
        <linearGradient id={`metal-${id}`}>
          <stop stopColor="#454c59" />
          <stop offset=".28" stopColor="#e5e8ec" />
          <stop offset=".45" stopColor="#8a909a" />
          <stop offset=".72" stopColor="#343b47" />
          <stop offset="1" stopColor="#bec3cc" />
        </linearGradient>
        <linearGradient id={`dark-${id}`}>
          <stop stopColor="#080b11" />
          <stop offset=".4" stopColor="#343b49" />
          <stop offset="1" stopColor="#0b0f17" />
        </linearGradient>
      </defs>
      <ellipse
        cx="218"
        cy="283"
        rx="114"
        ry="18"
        fill="var(--category-accent)"
        opacity=".09"
      />
      {(kind === "device" || kind === "pod") && (
        <g
          transform={
            kind === "pod"
              ? "translate(15 24) rotate(12 210 160)"
              : "rotate(-14 210 160)"
          }
        >
          <rect
            x="164"
            y="55"
            width="84"
            height={kind === "pod" ? 198 : 224}
            rx="17"
            fill={paint}
            stroke={metal}
            strokeWidth="2"
          />
          <path
            d="M172 66V253M240 66V253"
            stroke={metal}
            strokeWidth="2"
            opacity=".7"
          />
          <rect x="159" y="55" width="94" height="19" rx="7" fill={metal} />
          <path
            d="M180 56V38Q180 22 196 22H218Q234 22 234 38V56"
            fill={dark}
            stroke={metal}
          />
          <rect
            x="189"
            y="101"
            width="36"
            height="75"
            rx="3"
            fill={dark}
            stroke={metal}
          />
          <path
            d="M198 122h18m-18 8h14m-14 8h18"
            stroke="var(--category-accent)"
            strokeWidth="2"
          />
          <circle cx="207" cy="200" r="9" fill={dark} stroke={metal} />
          <rect
            x="162"
            y={kind === "pod" ? 245 : 268}
            width="88"
            height="12"
            rx="4"
            fill={metal}
          />
        </g>
      )}
      {kind === "bottle" && (
        <g transform="rotate(-12 210 160)">
          <path
            d="M162 104Q162 86 180 86H237Q255 86 255 104V253Q255 271 237 271H180Q162 271 162 253Z"
            fill={paint}
            stroke={metal}
          />
          <rect
            x="177"
            y="41"
            width="64"
            height="54"
            rx="9"
            fill={dark}
            stroke={metal}
          />
          {Array.from({ length: 8 }, (_, n) => (
            <path
              key={n}
              d={`M${183 + n * 7} 49V86`}
              stroke="#747d8e"
              strokeOpacity=".4"
            />
          ))}
          <path
            d="M163 143H254V232H163Z"
            fill="#121824"
            stroke={metal}
            strokeOpacity=".5"
          />
          <path
            d="M186 165H231M186 176H225M186 208H230"
            stroke="var(--category-accent)"
            strokeWidth="3"
          />
          <path
            d="M173 107V134"
            stroke="#fff"
            strokeOpacity=".3"
            strokeWidth="3"
          />
        </g>
      )}
      {kind === "coil" && (
        <g transform="rotate(-18 210 170)">
          {[0, 1].map((n) => (
            <g key={n} transform={`translate(${n * 85 - 40} ${n * 20})`}>
              <rect
                x="174"
                y="122"
                width="65"
                height="112"
                rx="8"
                fill={metal}
              />
              <ellipse cx="206" cy="120" rx="33" ry="13" fill={metal} />
              <ellipse cx="206" cy="120" rx="18" ry="8" fill={dark} />
              <path
                d="M176 146H237M176 158H237M176 190H237M176 202H237"
                stroke="#29323f"
                strokeWidth="4"
              />
              <rect
                x="172"
                y="224"
                width="70"
                height="13"
                rx="4"
                fill={paint}
              />
            </g>
          ))}
        </g>
      )}
      {kind === "battery" && (
        <g transform="rotate(12 210 170)">
          <rect
            x="260"
            y="97"
            width="48"
            height="158"
            rx="8"
            fill={dark}
            stroke={metal}
          />
          <path
            d="M270 118H298M270 128H298M270 218H290"
            stroke="var(--category-accent)"
          />
          {[0, 1].map((n) => (
            <g key={n} transform={`translate(${n * 60 - 28} ${n * 12})`}>
              <rect
                x="150"
                y="72"
                width="48"
                height="182"
                rx="14"
                fill={paint}
                stroke={metal}
              />
              <ellipse cx="174" cy="75" rx="24" ry="9" fill={metal} />
              <ellipse cx="174" cy="75" rx="9" ry="4" fill={dark} />
              <path d="M161 111V221" stroke="#fff" strokeOpacity=".3" />
              <path d="M172 124h12m-6-6v12" stroke="#eeece7" />
            </g>
          ))}
        </g>
      )}
      {kind === "accessory" && (
        <g transform="rotate(-8 210 180)">
          <rect
            x="104"
            y="121"
            width="160"
            height="114"
            rx="20"
            fill={dark}
            stroke={metal}
          />
          <path
            d="M117 141H251M117 216H251"
            stroke="var(--category-accent)"
            strokeOpacity=".5"
          />
          <rect x="166" y="150" width="42" height="22" rx="6" stroke={metal} />
          <path
            d="M264 100L251 174Q248 192 264 192H304Q318 192 316 174L305 100Z"
            fill={paint}
            fillOpacity=".3"
            stroke={metal}
          />
          <ellipse cx="284" cy="100" rx="22" ry="8" stroke={metal} />
          <path d="M257 177H312" stroke="var(--category-accent)" />
        </g>
      )}
    </svg>
  );
}
