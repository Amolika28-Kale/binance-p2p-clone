/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Binance Style Colors
        bg: "#0b0e11",
        card: "#1e2329",
        border: "#2b3139",
        brandYellow: "#fcd535", // 'yellow' ऐवजी 'brandYellow' नाव दिले जेणेकरून Tailwind च्या मूळ पिवळ्या रंगाशी संघर्ष होणार नाही
        brandGreen: "#0ecb81",
        brandRed: "#f6465d",   // Sell बटण आणि किंमत कमी झाली तर दाखवण्यासाठी
        textGray: "#848e9c",  // उपशीर्षकांसाठी (Subtitles)
      },
      boxShadow: {
        'glow': '0 0 20px rgba(252, 213, 53, 0.2)',
        'glow-green': '0 0 20px rgba(14, 203, 129, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    }
  },
  plugins: [],
}