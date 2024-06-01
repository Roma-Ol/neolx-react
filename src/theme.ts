import { extendTheme } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface Palette {
    secondary: {
      50: string;
    };
    typography: {
      white: string;
    };
  }
}

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          '50': '#f0fdfa',
          '100': '#ccfbf1',
          '200': '#99f6e4',
          '300': '#5eead4',
          '400': '#2dd4bf',
          '500': '#14b8a6',
          '600': '#0d9488',
          '700': '#0f766e',
          '800': '#115e59',
          '900': '#134e4a',
        },
        secondary: {
          '50': 'fff',
        },
        typography: {
          white: '#fff',
        },
        background: {
          body: '#f7fffd',
        },
      },
    },
    dark: {
      palette: {},
    },
  },
});

console.log(theme);

export default theme;
