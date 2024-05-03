import React, { useContext, useEffect } from 'react';
import { Container, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles"; // Import createTheme from @mui/material/styles

import RoutesController from './RoutesController/RoutesController';

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { SocketContext } from './Contexts/SocketProvider';


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
  const socket = useContext(SocketContext)
  const userid = JSON.parse(localStorage.getItem('mongo_user_id'))
  useEffect(() => {
    // Listen for 'message' event from the server
    if (socket) {
      socket.emit("online", {
        userid : userid
      })
    }

    // Clean up event listener when component unmounts
    return () => {
      if (socket) {
        socket.off('online');
      }
    };
  }, [socket]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <div style={{
          height: "15px"
        }}></div>



        <RoutesController />
      </Container>
    </ThemeProvider>
  );
}

export default App;
