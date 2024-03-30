module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        poppins: ["Poppins", "sans-serif"],
        IBM: ["IBM Plex Sans","sans-serif"]
      },
      rounded:{
        
      },
      colors: {
      'main' : '#4520CC',
      },
      fontSize: {
        'topic': '48px',
      }
    },
    
  },
  plugins: [],
}