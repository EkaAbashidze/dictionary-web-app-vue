/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'inconsolata': ['Inconsolata', 'sans'],
        'inconsolata-variable': ['InconsolataVariable', 'sans'],
        'inter': ['Inter', 'sans'],
        'inter-variable': ['InterVariable', 'sans'],
        'lora': ['Lora', 'serif'],
        'lora-italic-variable': ['LoraItalicVariable', 'serif'],
      },
    },
  },
  plugins: [],
}

