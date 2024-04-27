import React, { useEffect, useState } from 'react'
import Contact from './Contact'
import { Button, Card, CardContent } from '@mui/material'
import SearchBar from './SearchBar'
import Contacts from './../SampleData/Contacts'
import axios from 'axios'

function ContactPanel() {

    const [contacts, setContacts] = useState([]);
    const [requests, setRequest] = useState([]);
    const [searchResults, setSearchResult] = useState([])

    const user_id = JSON.parse(localStorage.getItem('mongo_user_id'))

    const fetchContacts = async () => {
        //console.log(`${process.env.REACT_APP_API_URL}/api/my-contacts`)
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/my-contacts`, {
            headers: {
                userid: user_id
            }
        })

        if (res.data.success === true) {
            if (res.data.contacts != null)
                setContacts(res.data.contacts.contacts)
        }

        else {
            alert(res.data.message)
        }
    }

    const fetchRequests = async () => {
        //console.log(`${process.env.REACT_APP_API_URL}/api/my-contacts`)
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/requests-inbox`, {
            headers: {
                userid: user_id
            }
        })

        if (res.data.success === true) {
            //console.log(res.data)
            setRequest(res.data.requests)
        }

        else {
            alert(res.data.message)
        }
    }

    async function sendRequest(contactID) {

        console.log(contactID)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/add-contact`,{
            ownerID : user_id,
            contactID : contactID
        })

        console.log(response)

    }

    useEffect(() => {
        fetchContacts()
        fetchRequests()
    }, [])

    return (
        <>


            <SearchBar setSearchResult={setSearchResult} />

            <div style={{
                height: "90vh",
                overflow: "auto"
            }}>

                {
                    searchResults && searchResults.length > 0 && (
                        <>
                            <h2>Search Results</h2>
                            {searchResults.map((item, index) => (

                                <>
                                    <Contact
                                        isClickable={true}
                                        key={index}
                                        profileImage={item.profileImage}
                                        username={item.username}
                                        time={item.time}
                                        lastMessage={item.lastMessage}
                                    />
                                    <Button variant="contained"
                                        onClick={() => sendRequest(item._id)} // Wrap the function call in an arrow function
                                    >Send request</Button>

                                </>

                            ))}
                        </>
                    )
                }

                {
                    requests && requests.length > 0 && (
                        <>
                            <h2>Requests</h2>
                            {requests.map((item, index) => (
                                <>
                                    <Contact
                                        isClickable={true}
                                        key={index}
                                        profileImage={item.from.profileImage}
                                        username={item.from.username}
                                        time={item.time}
                                        lastMessage={item.lastMessage}
                                    />
                                    <Button variant="contained">Accept request</Button>
                                </>
                            ))}
                        </>
                    )
                }

                {
                    contacts && contacts.length > 0 && (
                        <>
                            <h2>Contacts</h2>
                            {contacts.map((item, index) => (
                                <Contact
                                    key={index}
                                    profileImage={item.profileImage}
                                    username={item.username}
                                    time={item.time}
                                    lastMessage={item.lastMessage}
                                />
                            ))}
                        </>
                    )
                }






            </div>
        </>
    )
}

export default ContactPanel