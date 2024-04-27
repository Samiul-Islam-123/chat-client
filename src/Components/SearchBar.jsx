import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import axios from 'axios';


function SearchBar(props) {

  const [searchQuery, setSearchQuery] = useState("");

  const SearchUser = async()=>{
    if(searchQuery != ""){
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/search-user/${searchQuery}`)
      if(response.data.success === true){
        props.setSearchResult(response.data.users)
      }
      else{
        alert(response.data.message)
      }
    }
  }

  useEffect(()=>{
    SearchUser();
    if(searchQuery === "")
    {
      props.setSearchResult([])
      setSearchQuery("")
    }
  },[searchQuery])

  return (
    <>

      <div style={{
        display : "flex",
        alignItems : "center"
      }}>
      <UserButton></UserButton>
    
    <TextField 
    onChange = {(e)=>{
      setSearchQuery(e.target.value)
    }}
        label="Search"
        fullWidth
        />
      </div>
        </>
  )
}

export default SearchBar