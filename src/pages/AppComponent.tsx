import { useAuthContext } from '../../lib/firebase/context/AuthContext'
import { useEffect, FC } from 'react'

import Dashboard from './dashboard'

interface AppComponentProps {
  children: React.ReactNode
}

const AppComponent: FC<AppComponentProps> = ({ children }) => {
  const { user, loading } = useAuthContext()

  useEffect(() => {
    if (user) {
      const { uid, email, displayName, photoURL } = user

      // Display the user details as needed
      console.log('User ID:', uid)
      console.log('Email:', email)
      console.log('Display Name:', displayName)
      console.log('Photo URL:', photoURL)
    }
  }, [user])

  if (loading) {
    // Render a loading component or indicator
    return <div>Loading...</div>
  }

  return (
    <>
      {user ? (
        <Dashboard userId={user.uid} email={user.email} />
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default AppComponent
