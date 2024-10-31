import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2ED86B',
        error: '#FF5E5E',
        background: '#0D1B2A',
        input: '#1B263B',
        card: '#1A273C',
        text: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'heading-1': [
          '64px',
          { lineHeight: '80px', letterSpacing: '0', fontWeight: 600 },
        ],
        'heading-2': [
          '48px',
          { lineHeight: '56px', letterSpacing: '0', fontWeight: 600 },
        ],
        'heading-3': [
          '32px',
          { lineHeight: '40px', letterSpacing: '0', fontWeight: 600 },
        ],
        'heading-4': [
          '24px',
          { lineHeight: '32px', letterSpacing: '0', fontWeight: 700 },
        ],
        'heading-5': [
          '20px',
          { lineHeight: '24px', letterSpacing: '0', fontWeight: 700 },
        ],
        'heading-6': [
          '16px',
          { lineHeight: '24px', letterSpacing: '0', fontWeight: 700 },
        ],
        'body-large': ['20px', { lineHeight: '32px', letterSpacing: '0' }],
        'body-regular': ['16px', { lineHeight: '24px', letterSpacing: '0' }],
        'body-small': ['14px', { lineHeight: '24px', letterSpacing: '0' }],
        'body-extra-small': [
          '12px',
          { lineHeight: '24px', letterSpacing: '0' },
        ],
        caption: ['14px', { lineHeight: '16px', letterSpacing: '0' }],
      },
      spacing: {
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px',
        32: '128px',
        40: '160px',
        48: '192px',
        64: '256px',
        80: '320px',
        96: '384px',
        100: '400px',
      },
      gridTemplateColumns: {
        12: 'repeat(4, minmax(0, 1fr))',
      },
      maxWidth: {
        container: '1440px',
      },
      gap: {
        gutter: '24px',
      },
      margin: {
        layout: '120px',
      },
    },
  },
  plugins: [],
};

export default config;
