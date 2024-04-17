import React, { useEffect } from 'react'
import ChatHeader from './ChatPanelComponents/ChatHeader'
import ChatBody from './ChatPanelComponents/ChatBody'
import ChatFooter from './ChatPanelComponents/ChatFooter'
import data from '../SampleData/ChatsData'
import { useCurrentConversation } from '../Contexts/CurrentConversationProvider'

function ChatPanel() {

    const { currentConversation, setCurrentConversation } = useCurrentConversation();

    function fetchChats(userID){
        //Something will happen here :)
    }

    useEffect(()=>{
        console.log(currentConversation)
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
                    <ChatBody />
                </div>
                <div className="chat-footer">
                    <ChatFooter />
                </div>
            </>) : (<>No conversation found</>)}

        </>
    )
}

export default ChatPanel