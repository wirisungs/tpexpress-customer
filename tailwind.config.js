/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        basicBlack: "#1C1C1C",
        subtitle: "#767676",
        primary: "#EB455F",
        border: "#D2D2D2",

        // Text
        "grayText-767676": "#767676",
        "primaryText-EB455F": "#EB455F",
        "blueText-495DC1": "#495DC1",

        // Background
        "grayBG-FCFCFC": "#FCFCFC",
        "whiteBG-EEEEEE": "#EEEEEE",
      },
      height: {
        header115: "115px",
      },
    },
  },
  plugins: [],
};
