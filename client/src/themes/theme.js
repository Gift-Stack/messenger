import { createTheme } from '@material-ui/core';

export const theme = createTheme({
    typography: {
        fontFamily: 'Open Sans, sans-serif',
        fontSize: 14,
        button: {
            textTransform: 'none',
            letterSpacing: 0,
            fontWeight: 'bold',
        },
    },
    overrides: {
        MuiInput: {
            input: {
                fontWeight: 'bold',
            },
        },
    },
    palette: {
        primary: { main: '#3A8DFF' },
        secondary: { main: '#B0B0B0' },
    },
    spacing: 2,
    breakpoints: {
        values: {
            xs: 345,
            sm: 600,
            msm: 630, // Medium small (Slightly above small)
            md: 700,
            lg: 1010,
            xl: 1920,
        },
    },
});
