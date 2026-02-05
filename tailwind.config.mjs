/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'beach': {
          'terracotta': '#9F6C52',
          'sand': '#CEB298',
          'cream': '#EEE7DD',
          'slate': '#A7B9C6',
          'blue': '#92ABBB',
        }
      },
      fontFamily: {
        'header': ['"Bodoni Moda"', 'serif'],
        'subheader': ['"Montserrat"', 'sans-serif'],
        'body': ['"Lato"', 'sans-serif'],
        'cursive': ['"Herr Von Muellerhoff"', 'cursive'],
      }
    },
  },
  plugins: [],
}
