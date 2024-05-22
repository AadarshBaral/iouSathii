// tailwind.config.js
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{

        orange:'#BF6736',
        textDark: "#1E2225"

      },
      fontFamily: {
        poppins_light: 'Poppins_300Light',
        poppins_regular: 'Poppins_400Regular',
        poppins_medium: 'Poppins_500Medium',
        poppins_semibold: 'Poppins_600SemiBold',
        poppins_bold: 'Poppins_700Bold',
      },
    },
  },
  plugins: [],
}