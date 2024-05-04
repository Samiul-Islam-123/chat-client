import React, { useContext, useEffect, useState } from 'react'
import Contact from './Contact'
import { Button, Card, CardContent, Divider, IconButton, Toolbar } from '@mui/material'
import SearchBar from './SearchBar'
import Contacts from './../SampleData/Contacts'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import { SocketContext } from '../Contexts/SocketProvider'
import Badge from '@mui/material/Badge';
import InboxIcon from '@mui/icons-material/Inbox';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import OutboxIcon from '@mui/icons-material/Outbox';



function ContactPanel() {

    const [contacts, setContacts] = useState([]);
    const [requests, setRequest] = useState([]);
    const [searchResults, setSearchResult] = useState([])

    const [request_sent, setRequest_Sent] = useState([]);
    const [request_inbox, setRequest_Inbox] = useState([]);
    const [SnackMessage, setSnackMessage] = useState("")

    const [contacts_indicator, setcontacts_indicator] = useState(true);
    const [request_indicator, setrequest_indicator] = useState(true);
    const [inbox_indicator, setinbox_indicator] = useState(true);
    

    const [open, setOpen] = React.useState(false);

    const socket = useContext(SocketContext)

    useEffect(() => {
        socket.on('request-sent', data => {
            setinbox_indicator(false)
            setSnackMessage(data);
            setOpen(true);
        })
    }, [socket])

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const [ContentToDisplay, setContentToDisplay] = useState('contacts');

    const user_id = JSON.parse(localStorage.getItem('mongo_user_id'))

    const fetchContacts = async () => {
        //console.log(`${process.env.REACT_APP_API_URL}/api/my-contacts`)
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/my-contacts`, {
            headers: {
                userid: user_id
            }
        })

        if (res.data.success === true) {
            //console.log(res)
            if (res.data.contacts != null)
                setContacts(res.data.contacts.contacts)
        }

        else {
            alert(res.data.message)
        }
    }


    const fetchRequest_Sent = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/requests-sent`, {
            headers: {
                userid: user_id
            }
        })
        console.log(res);

        if (res.data.success === true) {
            //console.log(res.data)
            if(res.data.requests.length>0)
                setrequest_indicator(false)
            setRequest_Sent(res.data.requests)
        }

        else {
            alert(res.data.message)
        }
    }

    const fetchRequest_Inbox = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/requests-inbox`, {
            headers: {
                userid: user_id
            }
        })

        console.log(res);


        if (res.data.success === true) {
            console.log(res.data)
            if(res.data.requests.length>0)
                setinbox_indicator(false)
            setRequest_Inbox(res.data.requests)
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
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/send-request`, {
            fromID: user_id,
            toID: contactID
        })

        if (response.data.success === true) {
            setSnackMessage(response.data.message)
            socket.emit('send-request', (contactID))
            setOpen(true);
        }

        else {
            alert(response.data.message)
        }

    }

    async function AcceptRequest(fromID) {
        const toID = user_id;
        console.log(toID, fromID)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/accept-request`, {
            fromID: fromID,
            toID: toID
        })

        console.log(response);

        if (response.data.success === true) {
            setSnackMessage(response.data.message)
            setOpen(true)
        }

        else {
            alert(response.data.message)
        }
    }

    useEffect(() => {

        if (ContentToDisplay === 'contacts') {
            fetchContacts()
        }
        if (ContentToDisplay === 'request-sent') {
            fetchRequest_Sent()
        }
        if (ContentToDisplay === 'request-inbox') {
            fetchRequest_Inbox()
        }
    }, [ContentToDisplay])

    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={SnackMessage}
            />

            <SearchBar setSearchResult={setSearchResult} />

            <Toolbar style={{
                justifyContent: "space-between"
            }}>
                <IconButton variant='outlined' onClick={() => {
                    setContentToDisplay('contacts')
                }}>
                    <Badge color="secondary" variant="dot" invisible={contacts_indicator}>
                            <PermContactCalendarIcon />
                        </Badge>
                </IconButton>
                <IconButton variant='outlined' onClick={() => {
                    setContentToDisplay('request-sent')
                }}>
                    <Badge color="secondary" variant="dot" invisible={request_indicator}>
                            <OutboxIcon />
                        </Badge>
                </IconButton>
                
                    <IconButton onClick={() => {
                        setContentToDisplay('request-inbox')
                    }}>
                        <Badge color="secondary" variant="dot" invisible={inbox_indicator}>
                            <InboxIcon />
                        </Badge>

                    </IconButton>

            </Toolbar>

            <Divider />

            <div style={{
                height: "85vh",
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


                {ContentToDisplay === 'contacts' ? (
                    <>
                        {contacts && contacts.length > 0 ? (
                            <>
                                <h2>Contacts</h2>
                                {contacts.map((item, index) => (
                                    <>

                                        <Contact
                                            user_ID={item._id}
                                            key={index}
                                            profileImage={item.profileImage}
                                            username={item.username}
                                            time={item.time}
                                            lastMessage={item.lastMessage}
                                        />
                                    </>
                                ))}
                            </>
                        ) : (
                            <p>No contacts yet.</p>
                        )}
                    </>
                ) : ContentToDisplay === 'request-sent' ? (
                    <>
                        {request_sent && request_sent.length > 0 ? (
                            <>
                                <h2>Requests</h2>
                                {request_sent.map((item, index) => (
                                    <Contact
                                        isClickable={true}
                                        key={index}
                                        profileImage={item.to.profileImage}
                                        username={item.to.username}
                                        time={item.time}
                                        lastMessage={item.lastMessage}
                                    />
                                ))}
                            </>
                        ) : (
                            <p>No requests sent yet.</p>
                        )}
                    </>
                ) : ContentToDisplay === 'request-inbox' ? (
                    <>
                        {request_inbox && request_inbox.length > 0 ? (
                            <>
                                {
                                    console.log(request_inbox)
                                }
                                <h2>Requests</h2>
                                {request_inbox.map((item, index) => (
                                    <>
                                        {
                                            console.log(item)
                                        }
                                        <Contact
                                            isClickable={true}
                                            key={index}
                                            profileImage={item.from.profileImage}
                                            username={item.from.username}
                                            time={item.time}
                                            lastMessage={item.request_content}
                                        />
                                        <Button variant="contained" onClick={() => AcceptRequest(item.from._id)}>Accept request</Button>
                                    </>
                                ))}
                            </>
                        ) : (
                            <p>No requests in your inbox.</p>
                        )}
                    </>
                ) : (
                    <p>Invalid content.</p>
                )}










            </div>
        </>
    )
}

export default ContactPanel