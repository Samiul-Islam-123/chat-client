import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ContactPanel from '../../Components/ContactPanel'
import ChatPanel from '../../Components/ChatPanel'
import { useCurrentConversation } from '../../Contexts/CurrentConversationProvider';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

function ChatPage() {

  const [display, setDisplay] = useState(false);
  const { currentConversation, setCurrentConversation } = useCurrentConversation();
  const { isSignedIn, user, isLoaded } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(isSignedIn)
    if (isSignedIn === false) {
      navigate('/login')
    }
    
    else if(isSignedIn === true)
    setDisplay(true);
  }, [isSignedIn])

  useEffect(() => {
    //console.log(currentConversation)
  }, [currentConversation])

  return (
    <>
      {display === true && (<>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <ContactPanel />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <ChatPanel />
          </Grid>
        </Grid>
      </>)}
    </>
  )
}

export default ChatPage