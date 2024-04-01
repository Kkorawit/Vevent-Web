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
      colors: {
        primaryColor:'#4520CC',
        purple400:'#6A4DD6',
        purple300:'#8F79E0',
        purple200:'#B5A6EB',
        purple100:'#DAD2F5',
        primaryLight:'#ECE9FA',
      }
    },
    
  },
  plugins: [],
}
