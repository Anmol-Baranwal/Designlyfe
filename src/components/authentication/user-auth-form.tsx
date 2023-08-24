import * as React from 'react'
import { cn } from '@/lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import Link from 'next/link'
import signInWithGitHub from '../../../lib/GitHubAuth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuthContext } from '../../../lib/firebase/context/AuthContext'
import { useToast } from '../../components/ui/use-toast'
import { resetPassword } from '../../../lib/emailPasswordAuth'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  formType: 'login' | 'signup'
  onSuccessfulAuth: (userId: string, email: string | null) => void
}

export function UserAuthForm({
  className,
  formType,
  onSuccessfulAuth,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [gitHubLoading, setGitHubLoading] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [emailWarning, setEmailWarning] = useState<boolean>(false)
  const [emailWarningText, setEmailWarningText] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordWarning, setPasswordWarning] = useState<boolean>(false)
  const [passwordWarningText, setPasswordWarningText] =
    React.useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [usernameWarning, setUsernameWarning] = useState<boolean>(false)
  const [usernameWarningText, setUsernameWarningText] = useState<string>('')

  const { signIn, signUp } = useAuthContext()

  const handleUsernameChange = (inputValue: string) => {
    setUsername(inputValue)
    if (formType === 'signup') {
      if (inputValue) {
        const regex = /^[a-zA-Z]+$/
        if (!regex.test(inputValue)) {
          setUsernameWarning(true)
          setUsernameWarningText('Only alphabets are allowed')
        } else {
          setUsernameWarning(false)
          setUsernameWarningText('')
        }
      } else {
        setUsernameWarning(false)
        setUsernameWarningText('')
      }
    }
  }

  const handleEmailChange = (inputValue: string) => {
    setEmail(inputValue)
    // if (formType === 'signup') { // for validation in login form
    if (inputValue) {
      const regex = /^[^\@]+@[^\s@]+\.[^\s@]+$/
      if (!regex.test(inputValue)) {
        setEmailWarning(true)
        setEmailWarningText('Please enter a valid email')
      } else {
        setEmailWarning(false)
        setEmailWarningText('')
      }
    } else {
      setEmailWarning(false)
      setEmailWarningText('')
    }
    // }
  }

  const handlePasswordChange = (inputValue: string) => {
    setPassword(inputValue)
    if (formType === 'signup') {
      if (inputValue) {
        const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
        if (!strongPasswordRegex.test(inputValue)) {
          setPasswordWarning(true)
          setPasswordWarningText(
            'Min 8 characters and should contain at least one capital letter and one number. Special characters are not allowed.'
          )
        } else {
          setPasswordWarning(false)
          setPasswordWarningText('')
        }
      } else {
        setPasswordWarning(false)
        setPasswordWarningText('')
      }
    }
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      if (formType === 'signup') {
        const { result, error } = await signUp(email, password)
        if (result) {
          // Include username in onSuccessfulAuth function if needed
          // const { username } = result.user
          onSuccessfulAuth(result.user.uid, result.user.email)
          router.push('/dashboard')
        } else {
          // Handle error if sign up fails
          console.error(error)
        }
      } else {
        const { result, error } = await signIn(email, password)
        if (result) {
          onSuccessfulAuth(result.user.uid, result.user.email)
          router.push('/dashboard')
        } else {
          // Handle error if sign in fails
          console.error(error)
        }
      }
      //   setTimeout(() => {
      //     setIsLoading(false)
      //   }, 3000)
    } catch (error) {
      console.error(error)
    }

    setIsLoading(false)
  }

  const { toast } = useToast()
  const handleForgotPassword = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (email === '') {
      toast({
        title: 'Email missing!',
        description: 'Enter an email to recieve password reset link',
      })
    } else {
      try {
        await resetPassword(email)
        toast({
          title: 'Reset Link Sent',
          description:
            'A password reset link has been sent to your email address',
        })
        setIsLoading(false)
      } catch (error) {
        console.error(error)

        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        })
        setIsLoading(false)
      }
    }
  }

  const router = useRouter()
  async function handleSubmitWithGitHub() {
    try {
      setGitHubLoading(true)
      const user = await signInWithGitHub()
      onSuccessfulAuth(user.uid, user.email)
      router.push('/dashboard')
    } catch (error) {
      // Handle error if authentication fails
      console.error(error)
      setGitHubLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          {formType === 'signup' && (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="username">
                Username
              </Label>
              <Input
                id="username"
                placeholder="Enter your username"
                autoComplete="username"
                disabled={isLoading}
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                isWarning={usernameWarning}
                warningText={usernameWarningText}
                required
              />
            </div>
          )}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              isWarning={emailWarning}
              warningText={emailWarningText}
              required
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              isWarning={passwordWarning}
              warningText={passwordWarningText}
              required
            />
          </div>
          {formType === 'login' && (
            <div className="text-right">
              <Link
                href={''}
                className="text-sm text-muted-foreground text-primary-500 pr-1 transition duration-300 underline-offset-4 hover:underline hover:text-primary"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </Link>
            </div>
          )}
          <Button disabled={isLoading}>
            {isLoading && (
              <FontAwesomeIcon
                icon={faSpinner}
                className="mr-2 h-4 w-4 animate-spin"
              />
            )}
            {formType === 'signup'
              ? 'Sign Up with Email'
              : 'Sign In with Email'}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      {/* <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <FontAwesomeIcon
            icon={faSpinner}
            className="mr-2 h-4 w-4 animate-spin"
          />
        ) : (
          <FontAwesomeIcon icon={faGoogle} className="mr-2 h-4 w-4" />
        )}{' '}
        Google
      </Button> */}
      <Button
        variant="outline"
        type="button"
        disabled={gitHubLoading}
        onClick={handleSubmitWithGitHub}
      >
        {gitHubLoading ? (
          <FontAwesomeIcon
            icon={faSpinner}
            className="mr-2 h-4 w-4 animate-spin"
          />
        ) : (
          <FontAwesomeIcon icon={faGithub} className="mr-2 h-4 w-4" />
        )}{' '}
        GitHub
      </Button>
    </div>
  )
}
