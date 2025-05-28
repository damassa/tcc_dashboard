module.exports = {
  darkMode: "class",
};

module.exports = {
  theme: {
    extend: {
      animation: {
        "pulse-slow": "pulse 4s ease-in-out infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: 0.6 },
          "50%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
