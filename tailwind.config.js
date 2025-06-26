/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'oxford': {
          50: '#f5f7fa',
          100: '#e9ecf3',
          200: '#c8d1e1',
          300: '#a2b2cc',
          400: '#6c7fa6',
          500: '#3d4d6b',
          600: '#273a53',
          700: '#1d2b3a',
          800: '#16202b',
          900: '#101724',
        },
        'parchment': {
          50: '#fdf6e3',
          100: '#f7e7b7',
          200: '#f2d98b',
          300: '#eac75a',
          400: '#e1b93a',
          500: '#cfa32a',
          600: '#b18a1e',
          700: '#8c6b16',
          800: '#6b5110',
          900: '#4d3a0a',
        },
        'cream': {
          50: '#fdfcf7',
          100: '#f8f5e9',
          200: '#f3ebd3',
          300: '#ede2c0',
          400: '#e5d6a8',
          500: '#d8c88c',
        },
        'ink': {
          50: '#f6f6f7',
          100: '#e3e4e7',
          200: '#c7c9cf',
          300: '#a3a7b2',
          400: '#7a7f8e',
          500: '#5f6473',
          600: '#4a4e5c',
          700: '#3d404b',
          800: '#33353e',
          900: '#23242a',
        },
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'parchment-texture': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23d1c7b7\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
};
