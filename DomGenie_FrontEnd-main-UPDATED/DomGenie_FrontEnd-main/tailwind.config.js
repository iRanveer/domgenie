/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {"50":"#fefce8","100":"#fef9c3","200":"#fef08a","300":"#fde047","400":"#facc15","500":"#eab308","600":"#ca8a04","700":"#a16207","800":"#854d0e","900":"#713f12","950":"#422006"}
      },
      /* animation: {
        borderRunner: "borderRunner 9s linear infinite",
      }, */
      animation: {
        blink: "blink 1s infinite",
      },
      keyframes: {
        borderRunner: {
          "0%": { top: "0", left: "0" },
          "25%": { top: "0", left: "100%" },
          "50%": { top: "100%", left: "100%" },
          "75%": { top: "100%", left: "0" },
          "100%": { top: "0", left: "0" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },

      zIndex: {
        99: '99',
        100: '100', // optional: if you want other values
      },
    },
    /* fontFamily: {
      'body': [
    'Roboto', 
    'ui-sans-serif', 
    'system-ui', 
    '-apple-system', 
    'system-ui', 
    'Segoe UI', 
    'Roboto', 
    'Helvetica Neue', 
    'Arial', 
    'Noto Sans', 
    'sans-serif', 
    'Apple Color Emoji', 
    'Segoe UI Emoji', 
    'Segoe UI Symbol', 
    'Noto Color Emoji'
  ],
      'sans': [
    'Roboto', 
    'ui-sans-serif', 
    'system-ui', 
    '-apple-system', 
    'system-ui', 
    'Segoe UI', 
    'Roboto', 
    'Helvetica Neue', 
    'Arial', 
    'Noto Sans', 
    'sans-serif', 
    'Apple Color Emoji', 
    'Segoe UI Emoji', 
    'Segoe UI Symbol', 
    'Noto Color Emoji'
  ]
    } */
  fontFamily: {
    montserrat: ["Montserrat", "sans-serif"],
    poppins: ["Poppins", "sans-serif"],
    roboto: ["Roboto", "sans-serif"],
    mandali: ["Mandali", "sans-serif"],
  },
    
  },
  plugins: [require('@tailwindcss/typography')],
}