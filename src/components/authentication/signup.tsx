import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import Logo from '../Logo'

const SignupForm: FC = () => {
  const router = useRouter()

  const handleSignup = () => {
    // Perform signup logic
    // Redirect to the appropriate page after successful signup
    router.push('/dashboard')
  }

  const handleSignupWithGoogle = () => {
    // Perform signup with Google logic
    // Redirect to the appropriate page after successful signup
    router.push('/dashboard')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Logo className="text-4xl font-bold text-primary-100 mb-8" />
      <form className="bg-white p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-primary-500 mb-4">
          Sign Up
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-primary-500 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-primary-300 rounded-md px-3 py-2 w-full"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-primary-500 font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-primary-300 rounded-md px-3 py-2 w-full"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition duration-300"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="bg-white text-primary-500 flex items-center border border-primary-300 px-4 py-2 rounded-md hover:bg-primary-100 transition duration-300"
            onClick={handleSignupWithGoogle}
          >
            <span className="mr-2">
              <FontAwesomeIcon icon={faGoogle} />
            </span>
            Sign Up with Google
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignupForm
