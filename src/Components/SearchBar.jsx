import { Button, TextField } from '@mui/material'
import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";


function SearchBar() {
  return (
    <>

      <div style={{
        display : "flex",
        alignItems : "center"
      }}>
      <UserButton></UserButton>
    
    <TextField 
        label="Search"
        fullWidth
        />
      </div>
        </>
  )
}

export default SearchBar