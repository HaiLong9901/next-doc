import { auth, db } from '@/configs/firebase'
import '@/styles/globals.css'
import { Roboto } from 'next/font/google'
import { doc, setDoc } from 'firebase/firestore'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import '../styles/document.css'
import '../styles/style.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Login from './login'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
export default function App({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth)
  useEffect(() => {
    const setUserIdDb = async () => {
      try {
        await setDoc(
          doc(db, 'users', user?.email as string),
          {
            email: user?.email,
            photoURL: user?.photoURL,
          },
          {
            merge: true,
          },
        )
      } catch (error) {
        console.log('ERROR SETTING USER INFO IN DB: ', error)
      }
    }

    if (user) {
      setUserIdDb()
    }
  }, [user])
  if (loading) return <div>Loading</div>
  if (!user) return <Login />

  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  )
}
