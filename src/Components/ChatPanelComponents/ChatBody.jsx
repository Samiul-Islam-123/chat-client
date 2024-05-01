import React from 'react'
import data from '../../SampleData/ChatsData'
import { Card, CardContent, Icon, Typography } from '@mui/material'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CheckIcon from '@mui/icons-material/Check';

function ChatBody(props) {

  const Chats = props.ChatData;
  const myID = JSON.parse(localStorage.getItem('mongo_user_id'))

  // console.log(Chats)

  return (
    <>
      {Chats.map((item, index) => {
        console.log(item)

        // Convert timestamp string to a JavaScript Date object
        const timestamp = new Date(item.timestamp);

        // Get the hours and minutes
        const hours = timestamp.getHours().toString().padStart(2, '0');
        const minutes = timestamp.getMinutes().toString().padStart(2, '0');

        // Format as HH:MM
        const formattedTimestamp = `${hours}:${minutes}`;

        const marginLeftStyle = item.from === myID ? "auto" : "0px";
        return (<>
          <Card key={index} style={{
            marginLeft: marginLeftStyle,
            width: "fit-content",
            maxWidth: "50vw",
            marginTop : "5px",
            marginBottom : "5px"
          }}>
            <CardContent style={{
              display: "flex",
              flexDirection: "column"
            }}>
              <Typography variant='h8'>
                {item.content}
              </Typography>
              <div style={{
                marginTop : "15px",
                display : "flex",
                justifyContent : "space-between",
                alignItems : "center"
              }}>
              <Typography variant='h9' style={{
                fontSize: "10px"
              }}>
                {formattedTimestamp}
              </Typography>

              <Icon>
                {
                  item.seen === true ? (<>
                    <DoneAllIcon />
                  </>) : (<>
                    <CheckIcon />
                  </>)
                }
              </Icon>
              </div>
            </CardContent>
          </Card>

        </>)
      })}
    </>
  )
}

export default ChatBody