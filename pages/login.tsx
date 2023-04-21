import React from 'react'
import { Button } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import logo from '../public/no1logo.png'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth, db } from '../configs/firebase'
import { doc, setDoc } from 'firebase/firestore'
type Props = {}

function login({}: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)
  const login = () => signInWithGoogle()
  return (
    <>
      <Head>
        <title>Log in</title>
      </Head>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="p-5 rounded-lg border-solid border-blueColor border-[1px] flex flex-col justify-center items-center hover:shadow-boxShadowLoginBox hover:border-none">
          <Image src={logo} alt="logo" className="w-[200px] h-[200px] object-cover rounded-full" />
          <Button variant="outlined" onClick={login}>
            log in with google
          </Button>
        </div>
      </div>
    </>
  )
}

export default login
