'use client';

import React from 'react';

interface BSquareLogoProps {
  variant?: 'full' | 'compact' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isDark?: boolean;
}

export const BSquareLogo: React.FC<BSquareLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  isDark = false,
}) => {
  const heightMap = {
    sm: 'h-9',
    md: 'h-12 sm:h-13',
    lg: 'h-14 sm:h-15',
    xl: 'h-18 sm:h-20',
  };

  const selectedHeight = heightMap[size] || 'h-12 sm:h-13';
  const textColor = isDark ? '#FFFFFF' : '#071D59';
  const taglineColor = isDark ? '#38BDF8' : '#0086F8'; // Vibrant blue/cyan tagline for maximum readability
  const separatorColor = isDark ? '#334155' : '#0F172A';

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${selectedHeight} w-auto shrink-0 ${className}`}
        aria-label="BSquare Solutions Icon Logo"
      >
        <defs>
          <linearGradient id="b2_box_icon_new" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#071D59" />
            <stop offset="50%" stopColor="#0086F8" />
            <stop offset="100%" stopColor="#00C2FF" />
          </linearGradient>
          <linearGradient id="b_ribbon_icon_new" x1="20" y1="20" x2="120" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#071D59" />
            <stop offset="60%" stopColor="#0086F8" />
            <stop offset="100%" stopColor="#00C2FF" />
          </linearGradient>
        </defs>
        <rect x="10" y="10" width="140" height="140" rx="30" fill="none" stroke="url(#b2_box_icon_new)" strokeWidth="12" />
        <path
          d="M 45 30 L 45 95 C 45 115, 95 115, 95 75 C 95 40, 45 40, 45 75"
          fill="none"
          stroke="url(#b_ribbon_icon_new)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="104" y="44" fill={textColor} fontSize="36" fontWeight="900" fontFamily="Space Grotesk, sans-serif">2</text>
      </svg>
    );
  }

  // HD Vector SVG Logo (Provides infinite crisp resolution and editable text weights)
  return (
    <svg
      viewBox="0 0 540 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${selectedHeight} w-auto shrink-0 ${className}`}
      aria-label="BSquare Solutions & Services Official Logo"
    >
      <defs>
        <linearGradient id="b2_box_hd_new" x1="0" y1="0" x2="140" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#071D59" />
          <stop offset="50%" stopColor="#0086F8" />
          <stop offset="100%" stopColor="#00C2FF" />
        </linearGradient>

        <linearGradient id="b_ribbon_hd_new" x1="25" y1="20" x2="110" y2="125" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#071D59" />
          <stop offset="60%" stopColor="#0086F8" />
          <stop offset="100%" stopColor="#00C2FF" />
        </linearGradient>

        <linearGradient id="caret_a_grad_hd_new" x1="0" y1="0" x2="24" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0086F8" />
          <stop offset="100%" stopColor="#00C2FF" />
        </linearGradient>
      </defs>

      {/* 1. Gradient Rounded Square Icon Box */}
      <rect
        x="10"
        y="10"
        width="120"
        height="120"
        rx="26"
        fill="none"
        stroke="url(#b2_box_hd_new)"
        strokeWidth="11"
      />

      {/* Stylized Ribbon 'b' */}
      <path
        d="M 45 30 L 45 95 C 45 115, 95 115, 95 75 C 95 40, 45 40, 45 75"
        fill="none"
        stroke="url(#b_ribbon_hd_new)"
        strokeWidth="15.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Superscript '2' */}
      <text
        x="90"
        y="38"
        fill={textColor}
        fontSize="34"
        fontWeight="900"
        fontFamily="Space Grotesk, sans-serif"
      >
        2
      </text>

      {/* 2. Vertical Separator Bar */}
      <line
        x1="158"
        y1="18"
        x2="158"
        y2="122"
        stroke={separatorColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* 3. Wordmark: BSQUARE (Extra Bold) */}
      <g fontFamily="Space Grotesk, Inter, sans-serif" fontWeight="900" fontSize="56" letterSpacing="1">
        {/* BSQU */}
        <text x="182" y="76" fill={textColor}>
          BSQU
        </text>

        {/* Tech Caret 'A' */}
        <path
          d="M 370 76 L 388 32 L 406 76"
          fill="none"
          stroke="url(#caret_a_grad_hd_new)"
          strokeWidth="9.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* RE */}
        <text x="414" y="76" fill={textColor}>
          RE
        </text>
      </g>

      {/* 4. Subtitle: — SOLUTIONS & SERVICES — (Big, Bold & High Contrast) */}
      <g>
        {/* Left Accent Line */}
        <line x1="182" y1="108" x2="216" y2="108" stroke="#0086F8" strokeWidth="3" strokeLinecap="round" />

        {/* Tag Line Text */}
        <text
          x="226"
          y="113"
          fill={taglineColor}
          fontSize="17.5"
          fontWeight="900"
          fontFamily="Space Grotesk, Inter, sans-serif"
          letterSpacing="4.5"
        >
          SOLUTIONS & SERVICES
        </text>

        {/* Right Accent Line */}
        <line x1="504" y1="108" x2="538" y2="108" stroke="#0086F8" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
};
