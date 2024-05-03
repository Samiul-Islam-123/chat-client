import React, { useContext, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { Divider, Typography } from '@mui/material';
import { SocketContext } from '../../Contexts/SocketProvider';


function ChatHeader(props) {

    const socket = useContext(SocketContext);
    const [isOnline, setISOnline] = useState(false);
    
    console.log(props.userID)
    socket.emit('get-online-status', {
        userID : props.userID
    })
    useEffect(()=>{

        socket.on('offline', (data)=>{
            console.log("User disconnected")
            console.log(data)
        })

        socket.on('online_status', (data)=>{
            setISOnline(data)
        })
    },[socket])
    
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
                        {isOnline === true ? (<>
                            Online
                        </>) : (<>
                            Offline
                        </>)}
                    </Typography>
                </div>
            </div>
            <Divider />
        </>
    )
}

export default ChatHeader