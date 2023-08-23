import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, getAuth, User } from 'firebase/auth'
import { firebaseApp } from '../../../firebaseConfig'
import { FC } from 'react'
import {
  signIn as signInWithEmail,
  signUp as signUpWithEmail,
  resetPassword,
  SignInResult,
} from '../../emailPasswordAuth'

const auth = getAuth(firebaseApp)

interface AuthContextData {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string) => Promise<any>
  resetPassword: (email: string) => Promise<any>
}

export const AuthContext = createContext({} as AuthContextData)

export const useAuthContext = () => useContext(AuthContext)

interface AuthContextProps {
  children: React.ReactNode
}

export const AuthContextProvider: FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const authContextValue: AuthContextData = {
    user,
    loading,
    signIn: signInWithEmail,
    signUp: signUpWithEmail,
    resetPassword: resetPassword,
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  )
}
