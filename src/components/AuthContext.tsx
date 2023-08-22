import React, { createContext, useState } from 'react'

type AuthFormType = 'login' | 'signup'

type AuthContextType = {
  formType: AuthFormType
  setFormType: (type: AuthFormType) => void
}

const AuthContext = createContext<AuthContextType>({
  formType: 'signup',
  setFormType: () => {
    //
  },
})

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [formType, setFormType] = useState<AuthFormType>('signup')

  return (
    <AuthContext.Provider value={{ formType, setFormType }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
