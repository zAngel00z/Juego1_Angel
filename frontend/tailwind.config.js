module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pitch: "#178A50",
        gold: "#FFD700",
        glass: "rgba(255,255,255,0.15)",
        dark: "#222831"
      },
      fontFamily: {
        cartoon: ["'Baloo 2'", "cursive"]
      },
      boxShadow: {
        glory: "0 0 30px 8px #FFD70088, 0 0 0 8px #fff3 inset",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
      },
      backgroundImage: {
        'gradient-football': "linear-gradient(135deg, #178A50 0%, #FFD700 100%)"
      }
    },
  },
  plugins: [],
};