import React, { useContext, useEffect, useState, useRef } from 'react';
import { Card, CardContent, Icon, Typography } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CheckIcon from '@mui/icons-material/Check';
import { SocketContext } from '../../Contexts/SocketProvider';
import axios from 'axios';

function ChatBody({ currentConversation }) {
  const [chats, setChats] = useState();
  const myID = JSON.parse(localStorage.getItem('mongo_user_id'));
  const socket = useContext(SocketContext);
  const currentConversationRef = useRef(currentConversation);
  const messagesEndRef = useRef(null);


  useEffect(() => {
    // Update the ref whenever currentConversation changes
    currentConversationRef.current = currentConversation;
  }, [currentConversation]);

  useEffect(() => {
    socket.on('private-message', data => {
      // Access the latest value of currentConversation using the ref
      if (currentConversationRef.current.user_ID === data.from) {
        // socket.emit('mark-seen', {
          
          // })
          setChats(prevChats => [...prevChats, data]);
          console.log("seen")
          socket.emit('mark-seen', data.chatID)
      }
      //console.log(data);
    });

    socket.on('seen-marked', data=>{

    })

    socket.on('private-message-sent', data => {
      //console.log("seen")

      setChats(prevChats => [...prevChats, data]);
    });

    // Cleanup function to remove the listener when component unmounts
    return () => {
      socket.off('private-message');
    };
  }, [socket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats]);

  async function fetchChats() {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-chats`, {
      headers: {
        user1id: myID,
        user2id: currentConversation.user_ID
      }
    });

    if (response.data.success === true) {
      setChats(response.data.chatData.Chats);
    } else {
      alert(response.data.message);
    }
  }

  useEffect(() => {
    fetchChats();
  }, [currentConversation]);

  useEffect(() => {
    if(chats){

      if(chats.length >0){

        // if(chats[chats.length-1].seen != true)
        //   //console.log(("Plz mark it as seen"))
      }
    }
  }, [chats]);

  useEffect(() => {
    if(chats){

      if(chats.length > 0){

        // if(chats[chats.length-1].seen != true)
        //   //console.log(("Plz mark it as seen"))
      } 

    }
  }, []);

  return (
    <>
    <div style={{ overflowY: 'auto', maxHeight: '83vh' }}>

      {chats ? (
        <>
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

                    {/* {item.from === myID && (
                      <Icon>
                      {item.seen === true ? <DoneAllIcon /> : <CheckIcon />}
                      </Icon>
                    )} */}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </>
      ) : (
        <></>
      )}
            <div ref={messagesEndRef} />

      </div>
    </>
  );
}

export default ChatBody;
