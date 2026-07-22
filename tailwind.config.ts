import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#071D59',
          blue: '#0086F8',
          cyan: '#00C2FF',
          bgLight: '#F8FAFC',
          bgDark: '#0B0F19',
          cardDark: '#131B2E',
          cardBorderDark: '#1E293B',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
        display: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 0%, rgba(0, 194, 255, 0.15), transparent 70%)',
        'card-glass-light': 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4))',
        'card-glass-dark': 'linear-gradient(135deg, rgba(19, 27, 46, 0.8), rgba(15, 23, 42, 0.6))',
      },
    },
  },
  plugins: [],
};

export default config;
