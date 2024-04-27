import { Card, CardActionArea, CardContent, Icon, Typography } from '@mui/material'
import React from 'react'
import Avatar from '@mui/material/Avatar';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useCurrentConversation } from '../Contexts/CurrentConversationProvider';

function Contact(props) {

    const {currentConversation, setCurrentConversation} = useCurrentConversation();
    //console.log(props)
  return (
    <>
    <Card style={{
        marginTop : "10px",
        marginBottom : "10px"
    }}>
    <CardActionArea disabled={props.isClickable} onClick={()=>{
        setCurrentConversation(props)
    }}>
        <CardContent style={{
            display : "flex",
            justifyContent : "space-between",
            alignItems : "center",
            
        }}>
            <div className="profile-pic-container" style={{
                marginRight : "10px"
            }}>
                <Avatar alt="Remy Sharp" src={props.profileImage} />
            </div>
            <div className="body-container" style={{
                marginRight : "auto"
            }}>
                <Typography variant='h6'>
                    {props.username}
                </Typography>
                <Typography variant='description' style={{
                    display : "flex",
                    alignItems : "center"
                }}>
                <Icon>
                    <DoneAllIcon />
                </Icon>
                    {props.lastMessage}
                </Typography>
            </div>
            <div className="extras">
                
                <Typography variant='description'>
                    {props.time}
                </Typography>
            </div>
        </CardContent>
    </CardActionArea>
    </Card>
    </>
  )
}

export default Contact