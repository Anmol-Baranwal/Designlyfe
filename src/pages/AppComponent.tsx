import { useAuthContext } from '../../lib/firebase/context/AuthContext'
import { useEffect, FC } from 'react'

import Dashboard from './dashboard'
import { UserAuthForm } from '@/components/authentication/user-auth-form'

interface AppComponentProps {
  children: React.ReactNode
}

const AppComponent: FC<AppComponentProps> = ({ children }) => {
  const { user, loading } = useAuthContext()

  useEffect(() => {
    if (user) {
      const { uid, email, displayName, photoURL, customClaims } = user

      // Display the user details as needed
      console.log('User ID:', uid)
      console.log('Email:', email)
      console.log('Display Name:', displayName)
      console.log('Photo URL:', photoURL)
      console.log('Custom Claims:', customClaims)
    }
  }, [user])

  const handleSuccessfulAuth = (
    userId: string,
    email: string | null,
    username?: string
  ) => {
    console.log('User ID:', userId)
    console.log('Email:', email || 'No email provided')
    if (username) {
      console.log('Username:', username)
    }
    // Redirect to the dashboard or perform any other actions
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {user ? (
        <Dashboard userId={user.uid} email={user.email} />
      ) : (
        <UserAuthForm
          formType="login"
          onSuccessfulAuth={handleSuccessfulAuth}
        />
      )}
      {children}
    </>
  )
}

export default AppComponent
