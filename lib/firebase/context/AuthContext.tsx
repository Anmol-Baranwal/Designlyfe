import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, getAuth, User, IdTokenResult } from 'firebase/auth'
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
  onSuccessfulAuth: (userId: string, email: string | null) => void
}

export const AuthContext = createContext({} as AuthContextData)

export const useAuthContext = () => useContext(AuthContext)

interface AuthContextProps {
  children: React.ReactNode
}

export const AuthContextProvider: FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const onSuccessfulAuth = (userId: string, email: string | null) => {
    const newUser: User = {
      uid: userId,
      email: email,
      emailVerified: false,
      isAnonymous: false,
      metadata: null,
      providerData: [],
      phoneNumber: null,
      displayName: null,
      photoURL: null,
      refreshToken: '',
      tenantId: null,
      delete: function (): Promise<void> {
        throw new Error('Function not implemented.')
      },
      getIdToken: function (
        forceRefresh?: boolean | undefined
      ): Promise<string> {
        throw new Error('Function not implemented.')
      },
      getIdTokenResult: function (
        forceRefresh?: boolean | undefined
      ): Promise<IdTokenResult> {
        throw new Error('Function not implemented.')
      },
      reload: function (): Promise<void> {
        throw new Error('Function not implemented.')
      },
      toJSON: function (): object {
        throw new Error('Function not implemented.')
      },
      providerId: '',
    }
    setUser(newUser)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // const tokenResult = await user.getIdTokenResult()
        // const customClaims = tokenResult.claims
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
    onSuccessfulAuth: onSuccessfulAuth,
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  )
}
