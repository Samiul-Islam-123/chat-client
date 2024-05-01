import React, { useEffect, useState } from 'react'
import ChatHeader from './ChatPanelComponents/ChatHeader'
import ChatBody from './ChatPanelComponents/ChatBody'
import ChatFooter from './ChatPanelComponents/ChatFooter'
import data from '../SampleData/ChatsData'
import { useCurrentConversation } from '../Contexts/CurrentConversationProvider'
import axios from 'axios'

function ChatPanel() {

    const { currentConversation, setCurrentConversation } = useCurrentConversation(null);
    const [ChatData, setChatData] = useState([]);

    const userID =JSON.parse(localStorage.getItem('mongo_user_id'));

    async function fetchChats(){
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-chats`,{
            headers : {
                user1id : userID,
                user2id : currentConversation.user_ID
            }
        })

        console.log(response)

        if(response.data.success === true){
            setChatData(response.data.chatData.Chats)
        }

        else{
            alert(response.data.message)
        }
        
    }

    useEffect(()=>{
        if(currentConversation != null){

            //console.log(currentConversation)
            fetchChats()
        }
    },[currentConversation])

    return (
        <>
            {currentConversation ? (<>
                <div className="chat-header">
                    <ChatHeader
                        profileImage={currentConversation.profileImage}
                        username={currentConversation.username}
                        onlineStatus={"Online"}
                    />
                </div>
                <div className="chat-body" style={{
                    height: "84vh",
                    overflow: "auto"
                }}>
                    <ChatBody ChatData = {ChatData}/>
                </div>
                <div className="chat-footer">
                    <ChatFooter />
                </div>
            </>) : (<>No conversation found</>)}

        </>
    )
}

export default ChatPanel