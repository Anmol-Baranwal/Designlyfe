import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, getAuth, User } from 'firebase/auth'
import { firebaseApp } from '../../../firebaseConfig'
import { FC } from 'react'

const auth = getAuth(firebaseApp)

export const AuthContext = createContext({})

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

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  )
}
