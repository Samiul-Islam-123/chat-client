import { Button, Card, CardContent, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function LoginPage() {

  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();

  const AddUserData = async (data) => {
    console.log(`${process.env.REACT_APP_API_URL}/api/add-user`)
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/add-user`, data)
    if (response.data.success === true)
      return;

    else
      alert(response.data.message)
  }

  useEffect(() => {
    if (isSignedIn === true) {
      const payload = {
        username: user.fullName,
        id: user.id,
        profileImage: user.imageUrl
      }
      AddUserData(payload)
      navigate('/')
    }

  }, [isSignedIn])

  return (
    <Card>
      <CardContent>
        <Typography variant='h4'>
          User not Authenticated ☹️
        </Typography>

        <SignedOut
          
        >
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

      </CardContent>
    </Card>
  )
}

export default LoginPage