import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  getAuth,
  User as FirebaseUser,
} from 'firebase/auth'
import { firebaseApp } from '../../../firebaseConfig'
import { FC } from 'react'
import {
  signIn as signInWithEmail,
  signUp as signUpWithEmail,
  resetPassword,
  SignInResult,
} from '../../emailPasswordAuth'
import { setCustomUserClaims } from '../../emailPasswordAuth'

interface CustomClaims {
  authMethod: string
}

const auth = getAuth(firebaseApp)

interface CustomUser extends FirebaseUser {
  customClaims?: {
    authMethod: string
  }
}

interface AuthContextData {
  user: CustomUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string) => Promise<any>
  resetPassword: (email: string) => Promise<any>
  setCustomClaims: (claims: CustomClaims) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextData)

export const useAuthContext = () => useContext(AuthContext)

interface AuthContextProps {
  children: React.ReactNode
}

export const AuthContextProvider: FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<CustomUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const tokenResult = await user.getIdTokenResult()
        const customClaims = tokenResult.claims
        const authMethod = customClaims?.authMethod || null
        setUser({ ...user, customClaims: { authMethod } })
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
    setCustomClaims: setCustomUserClaims,
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  )
}
