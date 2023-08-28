import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  getAuth,
  User,
  IdTokenResult,
  UserMetadata,
} from 'firebase/auth'
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
  signIn: (email: string, password: string) => Promise<SignInResult>
  signUp: (email: string, password: string) => Promise<SignInResult>
  resetPassword: (email: string) => Promise<SignInResult>
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

  const onSuccessfulAuth = async (userId: string, email: string | null) => {
    try {
      // Create user document in Firestore
      const response = await fetch('/api/createUser', {
        method: 'POST',
        body: JSON.stringify({
          collectionName: 'users',
          data: { userId, email, name: '' },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        console.error('Failed to create user document in Firestore')
        return
      }

      const newUser: User = {
        uid: userId,
        email: email,
        emailVerified: false,
        isAnonymous: false,
        metadata: {} as UserMetadata,
        providerData: [],
        phoneNumber: null,
        displayName: null,
        photoURL: null,
        refreshToken: '',
        tenantId: null,
        delete: function (): Promise<void> {
          throw new Error('Function not implemented.')
        },
        getIdToken: function (): Promise<string> {
          throw new Error('Function not implemented.')
        },
        getIdTokenResult: function (): Promise<IdTokenResult> {
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
    } catch (error) {
      console.error(error)
    }
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
