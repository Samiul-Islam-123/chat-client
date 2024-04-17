import { IconButton, TextField, FormControl } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';

function ChatFooter() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log("Mushi Mushi")
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', alignItems: 'center' }}>

        <FormControl fullWidth style={{ marginLeft: '8px' }}>
          <TextField 
            label="Type your message here"
            fullWidth
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
