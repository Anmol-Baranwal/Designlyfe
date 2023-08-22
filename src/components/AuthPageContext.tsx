import React, { createContext, useState } from 'react'

type AuthPageFormType = 'login' | 'signup'

type AuthPageContextType = {
  formType: AuthPageFormType
  setFormType: (type: AuthPageFormType) => void
}

const AuthPageContext = createContext<AuthPageContextType>({
  formType: 'signup',
  setFormType: () => {
    //
  },
})

interface AuthPageProviderProps {
  children: React.ReactNode
}

export const AuthPageProvider: React.FC<AuthPageProviderProps> = ({
  children,
}) => {
  const [formType, setFormType] = useState<AuthPageFormType>('signup')

  return (
    <AuthPageContext.Provider value={{ formType, setFormType }}>
      {children}
    </AuthPageContext.Provider>
  )
}

export default AuthPageContext
