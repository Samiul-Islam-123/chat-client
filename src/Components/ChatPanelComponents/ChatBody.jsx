import React from 'react'
import data from '../../SampleData/ChatsData'
import { Card, CardContent, Typography } from '@mui/material'

function ChatBody() {

  
  return (
    <>
      {data[0].messages.map((item, index) => {
        //console.log(item)
        const marginLeftStyle = item.senderID === "user1" ? "auto" : "0px";
        return (<>
          <Card key={index} style={{
            marginLeft: marginLeftStyle, 
            width: "fit-content",
            maxWidth : "50vw"
          }}>
            <CardContent style={{
              display : "flex",
              flexDirection : "column"
            }}>
              <Typography variant='h8'>
                {item.content}
              </Typography>
              <Typography variant='h9' style={{
                fontSize: "10px"
              }}>
                {item.time}
              </Typography>
            </CardContent>
          </Card>

        </>)
      })}
    </>
  )
}

export default ChatBody