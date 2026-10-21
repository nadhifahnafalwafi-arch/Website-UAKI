/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
     
      colors: {
        brand: {
          DEFAULT: '#626F44', 
          soft: '#A3B16B', 
        },
        leaf: '#A6B465', 
        cream: '#FFFAE2', 
        ivory: '#FAF8F3', 
        butter: '#FFED8C', 
        snow: '#FFFFFE', 
        moss: '#404A2E', 
        sage: '#8A9A55', 
        mist: '#EEF0E4', 
        night: '#1F2616', 
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(1.875rem, 1rem + 2.6vw, 3rem)', { lineHeight: '1.22', letterSpacing: '-0.01em' }],
        lead: ['15px', { lineHeight: '1.75' }],
        tagline: ['clamp(1.125rem, 1rem + 0.35vw, 1.25rem)', { lineHeight: '1.4' }], 
        'hero-dept': ['clamp(2.125rem, 1.1rem + 4.4vw, 4.75rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }], 
        'about-dept': ['clamp(0.9375rem, 0.85rem + 0.35vw, 1.125rem)', { lineHeight: '1.85' }], 
        heading: ['clamp(1.5rem, 1.15rem + 1.3vw, 2rem)', { lineHeight: '1.2', letterSpacing: '0.01em' }],
        subheading: ['18px', { lineHeight: '1.4' }],
        body: ['15px', { lineHeight: '1.85' }],
        stat: ['26px', { lineHeight: '1.1' }],
        nav: ['15px', { lineHeight: '1.5' }],
        'body-sm': ['14px', { lineHeight: '1.7' }],
        footer: ['13px', { lineHeight: '1.7' }],
      },
      maxWidth: {
        content: '1200px',
      },
      spacing: {
        
        section: '5rem', 
        'section-lg': '6rem', 
        'title-gap': '3rem',
        'title-gap-lg': '3.5rem', 
      },
      borderRadius: {
        card: '20px',
        photo: '14px',
        showcase: '28px',
        organic: '56px', 
        'organic-inner': '46px',
      },
      gridTemplateColumns: {
        footer: '2fr 1fr 1fr 1.5fr',
        hero: '1.3fr 1fr',
        about: 'minmax(0, 340px) 1fr',
        welcome: 'minmax(0, 300px) 1fr',
        intro: 'minmax(0, 1fr) minmax(0, 500px)', 
        philosophy: 'minmax(0, 382px) 1fr', 
      },
      boxShadow: {
        nav: '0 10px 30px -12px rgba(38, 45, 22, 0.55)',
        photo: '0 28px 50px -24px rgba(98, 111, 68, 0.55)',
        stat: '0 16px 36px -24px rgba(98, 111, 68, 0.45)',
        button: '0 10px 22px -12px rgba(98, 111, 68, 0.8)',
        'card-dark': '0 30px 60px -28px rgba(24, 29, 14, 0.75)',
        lift: '0 18px 40px -22px rgba(24, 29, 14, 0.7)',
      },
    
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(calc(-1 * var(--set-w, 0px)), 0, 0)' },
        },
        'gentle-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'gentle-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.75' },
          '50%': { transform: 'scale(1.18)', opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 30s) linear infinite',
        'gentle-spin': 'gentle-spin 14s linear infinite',
        'gentle-pulse': 'gentle-pulse 3.2s ease-in-out infinite',
      },
      zIndex: {
        nav: '1000',
        trail: '1100', 
      },
    },
  },
  plugins: [],
}
