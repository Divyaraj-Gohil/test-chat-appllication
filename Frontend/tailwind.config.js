/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'chat': "url('/src/Asset/chat.jpg')",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}