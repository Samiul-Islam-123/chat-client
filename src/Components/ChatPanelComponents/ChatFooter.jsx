import { IconButton, TextField, FormControl } from '@mui/material';
import React, { useContext, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { SocketContext } from '../../Contexts/SocketProvider';

function ChatFooter() {

  const socket = useContext(SocketContext)
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if(message!=""){
      console.log(message)
      console.log(socket.id)
      setMessage("")
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', alignItems: 'center' }}>

        <FormControl fullWidth style={{ marginLeft: '8px' }}>
          <TextField 
          value={message}
            label="Type your message here"
            fullWidth
            onChange={(e)=>{
              setMessage(e.target.value)
            }}
            // Add any necessary props for handling the input
          />
        </FormControl>
        <IconButton type="submit">
          <SendIcon />
        </IconButton>
      </div>
    </form>
  );
}

export default ChatFooter;
