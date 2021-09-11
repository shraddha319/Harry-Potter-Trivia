module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        customGray: "#232323",
        // primary: "#E63E2D",
        gold: "#CDB750",
        // secondary: "#CDB750",
      },

      screens: {
        sm: "360px",
      },
    },
    fontFamily: {
      hp: "parry-hotter",
      filsonThin: "filson-thin",
      filsonRegular: "filson-regular",
      filsonMedium: "filson-medium",
      filsonBold: "filson-bold",
    },
  },
  variants: {
    extend: {},
  },
};
