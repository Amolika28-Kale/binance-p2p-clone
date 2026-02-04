import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    primary: {
      main: '#f7931a',
    },
    secondary: {
      main: '#0ecb81',
    },
    text: {
      primary: '#000000',
      secondary: '#6b7280',
    },
    divider: '#e5e7eb',
  },
  typography: {
    fontFamily: '"Inter", "system-ui", "-apple-system", "sans-serif"',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff',
            color: '#000000',
            fontSize: '0.875rem',
            borderRadius: '6px',
            transition: 'all 0.3s ease',
            '& fieldset': {
              borderColor: '#d1d5db',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: '#9ca3af',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#000000',
              borderWidth: '1px',
            },
          },
          '& .MuiInputBase-input': {
            color: '#000000',
            fontSize: '0.875rem',
            '&::placeholder': {
              color: '#9ca3af',
              opacity: 1,
            },
          },
          '& .MuiInputLabel-root': {
            color: '#6b7280',
            fontSize: '0.875rem',
            '&.Mui-focused': {
              color: '#000000',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderRadius: '6px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#f3f4f6',
          },
          '&.Mui-selected': {
            backgroundColor: '#f0f0f0',
            '&:hover': {
              backgroundColor: '#e5e7eb',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '6px',
          transition: 'all 0.3s ease',
        },
        contained: {
          backgroundColor: '#f7931a',
          color: '#000',
          '&:hover': {
            backgroundColor: '#f5a623',
            boxShadow: '0 2px 8px rgba(247, 147, 26, 0.3)',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 6,
  },
});

export default theme;
