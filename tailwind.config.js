module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sansSerif: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        monospace: ['LeituraTwo', 'serif'],
      },
      colors: {
        'gray': {
          100: '#f7f5f2',
          200: '#f5f7f8',
          300: '#eaeaea',
          400: '#cacaca',
          500: '#aaaaaa',
          600: '#808080',
          700: '#202020',
        },
        'primary': {
          300: '#dbbc8f4d',
          400: '#dbbc8fcc',
          500: '#dbbc8f',
          600: '#D4A45F',
          700: '#A56A0B',
        },
        'secondary': {
          300: '#1952524d',
          400: '#195252cc',
          500: '#195252',
          600: '#0B4141',
        },
        'red': {
          100: '#E38687',
          200: '#DC6869',
          300: '#B05354',
        },
        'transparent': 'transparent',
        'primary-focus': '#dbbc8f40',
        'secondary-focus': '#dbbc8f40',
        'active': '#448084',
        'black': '#202020',
        'error': '#DC6869',
        'white': '#ffffff',
      },
      fontSize: {
        'sm': '0.8125rem', // 13px
        'base': '1rem', // 16px
        'lg': '1.125rem', // 18px
        'xl': '1.25rem', // 20px
        '2xl': '1.375rem', // h6 - 22px
        '3xl': '1.5rem', // 24px
        '4xl': '1.625rem', // h5 - 26px
        '5xl': '1.875rem', // h4 - 30px
        '6xl': '2.1875rem', // h3 - 35px
        '7xl': '2.5rem', // h2 - 40px
        '8xl': '3.125rem', // h1 - 50px
        '9xl': '4.5rem', // 80px
        '10xl': '7rem', // 128px
      },
      boxShadow: {
        focus: '0 0 0 0.2rem #dbbc8f40',
      },
      transitionProperty: {
        height: 'height',
      },
    },
  },
  plugins: [],
}
