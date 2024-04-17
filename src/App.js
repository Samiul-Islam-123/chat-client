import React from 'react';
import { Container, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles"; // Import createTheme from @mui/material/styles

import RoutesController from './RoutesController/RoutesController';

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";


const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#8bc34a'
    },
    secondary: {
      main: "#FFD700"
    }
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">

        <SignedOut >
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        <RoutesController />
      </Container>
    </ThemeProvider>
  );
}

export default App;
