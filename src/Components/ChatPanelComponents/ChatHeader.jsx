import React from 'react'
import Avatar from '@mui/material/Avatar';
import { Divider, Typography } from '@mui/material';


function ChatHeader(props) {
    return (
        <>
            <div style={{
                display: "flex",
                alignItems: "center"
            }}>

                <Avatar alt="Remy Sharp" src={props.profileImage} style={{
                    marginRight: "10px"
                }} />
                <div >
                    <Typography variant='h6'>
                        {props.username}
                    </Typography>
                    <Typography variant='description'>
                        {props.onlineStatus}
                    </Typography>
                </div>
            </div>
            <Divider />
        </>
    )
}

export default ChatHeader