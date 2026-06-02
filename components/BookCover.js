"use client";

import { useState } from "react";

/**
 * 3D book mockup built around the real cover artwork.
 *
 * Drop the real cover at /public/book-cover.jpg and it appears automatically —
 * no code change needed. Until that file exists (or if it fails to load), a
 * faithful inline-SVG recreation of the cover is shown so the hero is never
 * broken. CSS (.book in globals.css) adds page thickness, spine shading,
 * sheen, drop shadow and a gentle float so it reads as a physical book.
 */
export default function BookCover() {
  const [useFallback, setUseFallback] = useState(false);

  return (
    <div className="book-stage">
      <div className="book">
        {useFallback ? (
          <CoverFallback />
        ) : (
          <img
            className="book__img"
            src="/book-cover.jpg"
            width={1024}
            height={1536}
            alt="The Purpose Driven Wealth Plan — How to Eliminate Debt and Build Wealth at the Same Time, by Denise Boisvert and Steve Gibbs, Esq. AEP"
            loading="eager"
            onError={() => setUseFallback(true)}
          />
        )}
      </div>
    </div>
  );
}

/** Pure-SVG stand-in for the cover (emerald + gold, broken-card motif). */
function CoverFallback() {
  return (
    <svg
      className="book__img"
      viewBox="0 0 1024 1536"
      role="img"
      aria-label="The Purpose Driven Wealth Plan book cover"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="46%" r="62%">
          <stop offset="0%" stopColor="#1a6253" />
          <stop offset="55%" stopColor="#0f4639" />
          <stop offset="100%" stopColor="#072821" />
        </radialGradient>
        <radialGradient id="flash" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7e0" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#f0d98a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f0d98a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f1d893" />
          <stop offset="50%" stopColor="#d9b85f" />
          <stop offset="100%" stopColor="#b8902f" />
        </linearGradient>
      </defs>

      <rect width="1024" height="1536" fill="url(#bgGlow)" />

      {/* Title */}
      <text
        x="512"
        y="225"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontStyle="italic"
        fontWeight="600"
        fontSize="98"
        fill="url(#gold)"
      >
        The Purpose Driven
      </text>
      <text
        x="512"
        y="360"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontWeight="700"
        fontSize="150"
        letterSpacing="2"
        fill="url(#gold)"
      >
        WEALTH PLAN
        <tspan fontSize="58" dy="-58">
          ™
        </tspan>
      </text>

      <line
        x1="150"
        y1="430"
        x2="874"
        y2="430"
        stroke="#d9b85f"
        strokeOpacity="0.5"
        strokeWidth="2"
      />
      <text
        x="512"
        y="505"
        textAnchor="middle"
        fontFamily="'Hanken Grotesk', sans-serif"
        fontWeight="400"
        fontSize="46"
        fill="#eadfb8"
      >
        How to Eliminate Debt and Build
      </text>
      <text
        x="512"
        y="562"
        textAnchor="middle"
        fontFamily="'Hanken Grotesk', sans-serif"
        fontWeight="400"
        fontSize="46"
        fill="#eadfb8"
      >
        Wealth at the Same Time
      </text>

      {/* Broken gold card */}
      <g transform="translate(512 880)">
        <ellipse cx="0" cy="190" rx="300" ry="40" fill="#000" opacity="0.28" />
        {/* left half */}
        <g transform="rotate(-7)">
          <rect
            x="-310"
            y="-150"
            width="300"
            height="300"
            rx="26"
            fill="url(#gold)"
          />
          <rect x="-250" y="-92" width="74" height="58" rx="9" fill="#caa34a" />
          <text
            x="-285"
            y="-104"
            fontFamily="'Hanken Grotesk', sans-serif"
            fontSize="30"
            fontWeight="600"
            fill="#5b4715"
          >
            GOLD CARD
          </text>
          <text
            x="-290"
            y="55"
            fontFamily="'Hanken Grotesk', sans-serif"
            fontSize="40"
            fontWeight="700"
            fill="#5b4715"
          >
            1234 5678
          </text>
          <text
            x="-290"
            y="118"
            fontFamily="'Hanken Grotesk', sans-serif"
            fontSize="24"
            fontWeight="600"
            fill="#5b4715"
          >
            CARDHOLDER
          </text>
        </g>
        {/* right half */}
        <g transform="rotate(7)">
          <rect
            x="20"
            y="-150"
            width="300"
            height="300"
            rx="26"
            fill="url(#gold)"
          />
          <text
            x="44"
            y="55"
            fontFamily="'Hanken Grotesk', sans-serif"
            fontSize="40"
            fontWeight="700"
            fill="#5b4715"
          >
            9876 5432
          </text>
        </g>
        {/* center flash + shards */}
        <rect x="-130" y="-220" width="260" height="440" fill="url(#flash)" />
        <g fill="#e7c970">
          <polygon points="-30,-150 10,-120 -20,-90" />
          <polygon points="40,-40 70,-10 30,5" />
          <polygon points="-60,60 -30,90 -70,100" />
          <polygon points="60,120 90,150 50,160" />
          <polygon points="120,-90 150,-70 115,-55" />
          <polygon points="-150,-30 -120,-10 -155,5" />
        </g>
      </g>

      <line
        x1="150"
        y1="1360"
        x2="874"
        y2="1360"
        stroke="#d9b85f"
        strokeOpacity="0.4"
        strokeWidth="2"
      />
      <text
        x="512"
        y="1440"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontWeight="600"
        fontSize="46"
        fill="#eadfb8"
      >
        By Denise Boisvert
        <tspan fontStyle="italic" fontWeight="500">
          {" and "}
        </tspan>
        Steve Gibbs, Esq. AEP®
      </text>
    </svg>
  );
}
