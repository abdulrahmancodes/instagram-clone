module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif']
    },
    extend: {
      colors: {
        blue: '#0095f6',
      },


      animation: {
        LoadingBarEnter: 'LoadingBarEnter .5s ease-out',
        LoadingBarProgress: 'LoadingBarProgress 2s linear infinite'
      },

      screens: {
        'sm': '450px',
        '640': '614px',
        'md': '875px'
      },

      backgroundImage: theme => ({
        'bg-phones': "url('./images/phones.png')",
        'all-images': "url('images/all-images.png')",
        'plus': "url('/images/plus.svg')"
      }),

      keyframes: {
        imgFade: {
          '0%': {
            opacity: 1
          },
          '17%': {
            opacity: 1
          },
          '25%': {
            opacity: 0
          },
          '92%': {
            opacity: 0
          },
          '100%': {
            opacity: 1
          }
        },

        LoadingBarEnter: {
          '0%': {
            transform: 'scaleX(0)'
          },
          '100': {
            transform: 'scaleX(1)'
          }
        },

        LoadingBarProgress: {
          '0%': {
            backgroundPosition: '0% 0'
          },
          '100%': {
            backgroundPosition: '125% 0'
          }
        }
      }
    },
  },
  variants: {
    extend: {
      animation: ['active'],
      borderWidth: ['hover']
    },
  },
  plugins: [],
}
