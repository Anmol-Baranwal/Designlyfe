/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/layouts/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        'crimson-text': ['Crimson Text', 'serif'],
        'dm-sans': ['DM Sans', 'sans'],
        'dm-sans-italic': ['DM Sans Italic', 'sans'],
        'dm-sans-200': ['DM Sans 200', 'sans'],
        'dm-sans-300': ['DM Sans 300', 'sans'],
        'dm-sans-400': ['DM Sans 400', 'sans'],
        'dm-sans-500': ['DM Sans 500', 'sans'],
        'dm-sans-600': ['DM Sans 600', 'sans'],
        'dm-sans-700': ['DM Sans 700', 'sans'],
        'dm-sans-800': ['DM Sans 800', 'sans'],
        'dm-sans-900': ['DM Sans 900', 'sans'],
        'dm-sans-1000': ['DM Sans 1000', 'sans'],
        poppins: ['Poppins', 'sans-serif'],
        'poppins-italic': ['Poppins Italic', 'sans-serif'],
        'poppins-300': ['Poppins 300', 'sans-serif'],
        'poppins-400': ['Poppins 400', 'sans-serif'],
        'poppins-500': ['Poppins 500', 'sans-serif'],
        'poppins-600': ['Poppins 600', 'sans-serif'],
        'poppins-700': ['Poppins 700', 'sans-serif'],
        'poppins-800': ['Poppins 800', 'sans-serif'],
      },
      colors: {
        'primary-100': '#372744',
        'primary-200': '#BC6FF1',
        'primary-300': '#fdf6fd',
        'accent-100': '#D9ACF5',
        'accent-200': '#fff4ff',
        'text-100': '#EEEEEE',
        'text-200': '#FDEBED',
        'bg-100': '#222831',
        'bg-200': '#393E46',
        'bg-300': '#454e59',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      screens: {
        xs: '200px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        // 2xl: '1536px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  darkMode: ['class', '[data-theme="dark"]'],
}
