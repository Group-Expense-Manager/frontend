/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          lighter: '#72777A',
          light: '#6C7072',
          base: '#404446',
          dark: '#303437',
          darker: '#202325',
          darkest: '#090A0A',
        },
        sky: {
          lightest: '#F7F9FA',
          lighter: '#F2F4F5',
          light: '#E3E5E5',
          base: '#CDCFD0',
          dark: '#979C9E',
        },
        primary: {
          lightest: '#D6F1FF',
          lighter: '#9BDCFD',
          light: '#6EC2FB',
          base: '#1EA7FF',
          dark: '#0859C5',
        },
        red: {
          lightest: '#FFE5E5',
          lighter: '#FF9898',
          light: '#FF6D6D',
          base: '#FF5247',
          dark: '#D3180C',
        },
        green: {
          lightest: '#ECFCE5',
          lighter: '#7DDE86',
          light: '#4CD471',
          base: '#23C16B',
          dark: '#198155',
        },
        yellow: {
          lightest: '#FFEFD7',
          lighter: '#FFD188',
          light: '#FFC462',
          base: '#FFB323',
          dark: '#A05E03',
        },
      },
      fontFamily: {
        thin: ['Sora-Thin', 'sans-serif'],
        extralight: ['Sora-ExtraLight', 'sans-serif'],
        light: ['Sora-Light', 'sans-serif'],
        regular: ['Sora-Regular', 'sans-serif'],
        medium: ['Sora-Medium', 'sans-serif'],
        semibold: ['Sora-SemiBold', 'sans-serif'],
        bold: ['Sora-Bold', 'sans-serif'],
        extrabold: ['Sora-ExtraBold', 'sans-serif'],
      },
      fontSize: {
        title1: '48px',
        title2: '32px',
        title3: '24px',
        large: '18px',
        regular: '16px',
        small: '14px',
        tiny: '12px',
      },
    },
  },
  plugins: [],
};
