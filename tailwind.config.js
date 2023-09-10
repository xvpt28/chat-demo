/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("daisyui")],
  daisyui: {
    themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        main: "#0682a6",
        purple: "#6C40B5",
        "purple-dark": "#28124D",
        "bg-light": "rgb(245, 245, 245)",
        "grey-text": "rgb(102, 102, 102)",
        offline: "rgb(185, 185, 185)",
        "grey-hover": "rgb(245, 245, 245)",
        "grey-select": "rgb(235, 235, 235)",
      },
      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "19px"],
        base: ["16px", "22px"],
        lg: ["20px", "28px"],
        xl: ["24px", "32px"],
      },
      fontFamily: {
        sans: ["Noto Sans"],
      },
      boxShadow: {
        button: "0px 4px 12px rgba(0, 0, 0, 0.10)",
      },
      scale: {
        83: "0.8333",
        66: "0.6666",
      },

      borderRadius: {
        search: "20px",
      },
      border: {
        outerContainer: "",
      },
      animation: {
        none: "none",
        spin: "spin 1s linear infinite",
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
};
