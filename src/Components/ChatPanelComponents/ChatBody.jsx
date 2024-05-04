import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, Icon, Typography } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CheckIcon from '@mui/icons-material/Check';
import { SocketContext } from '../../Contexts/SocketProvider';

function ChatBody(props) {
  console.log(props.ChatData)
  const [chats, setChats] = useState(props.ChatData);
  const myID = JSON.parse(localStorage.getItem('mongo_user_id'));
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('private-message', data => {
      setChats(prevChats => [...prevChats, data]);
    });

    // Cleanup function to remove the listener when component unmounts
    return () => {
      socket.off('private-message');
    };
  }, [socket]);

  return (
    <>
    {chats.length > 0 ? (<>
      {chats.map((item, index) => {
        // Convert timestamp string to a JavaScript Date object
        const timestamp = new Date(item.timestamp);

        // Get the hours and minutes
        const hours = timestamp.getHours().toString().padStart(2, '0');
        const minutes = timestamp.getMinutes().toString().padStart(2, '0');

        // Format as HH:MM
        const formattedTimestamp = `${hours}:${minutes}`;

        const marginLeftStyle = item.from === myID ? 'auto' : '0px';

        return (
          <Card
            key={index}
            style={{
              marginLeft: marginLeftStyle,
              width: 'fit-content',
              maxWidth: '50vw',
              marginTop: '5px',
              marginBottom: '5px',
            }}
          >
            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h8">{item.content}</Typography>
              <div
                style={{
                  marginTop: '15px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h9" style={{ fontSize: '10px' }}>
                  {formattedTimestamp}
                </Typography>

                {item.from === myID && (
                  <Icon>
                    {item.seen === true ? <DoneAllIcon /> : <CheckIcon />}
                  </Icon>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>) : (<>Mushi</>)}
      
    </>
  );
}

export default ChatBody;
