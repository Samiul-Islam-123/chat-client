import React from 'react'
import Contact from './Contact'
import { Card, CardContent } from '@mui/material'
import SearchBar from './SearchBar'
import Contacts from './../SampleData/Contacts'

function ContactPanel() {



    return (
        <>

        
            <SearchBar />

            <div style={{
                height : "90vh",
                overflow : "auto"
            }}>

            {
                Contacts.map((item, index) => {
                    //console.log(item)
                    return (<>
                        <Contact profileImage={item.profileImage}
                            username={item.username}
                            time={item.time}
                            lastMessage={item.lastMessage}
                            />
                    </>)
                })
            }

            </div>
        </>
    )
}

export default ContactPanel