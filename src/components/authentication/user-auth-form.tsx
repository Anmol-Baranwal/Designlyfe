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

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  formType: 'login' | 'signup'
  onSuccessfulAuth: (userId: string, email: string) => void
}

export function UserAuthForm({
  className,
  formType,
  onSuccessfulAuth,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('')

  const { signIn, signUp } = useAuthContext()

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
        } else {
          // Handle error if sign up fails
          console.error(error)
        }
      } else {
        const { result, error } = await signIn(email, password)
        if (result) {
          onSuccessfulAuth(result.user.uid, result.user.email)
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

  const router = useRouter()
  async function handleSubmitWithGitHub() {
    try {
      setIsLoading(true)
      const user = await signInWithGitHub()
      onSuccessfulAuth(user.uid, user.email)
      router.push('/dashboard')
    } catch (error) {
      // Handle error if authentication fails
      console.error(error)
      setIsLoading(false)
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
                onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {formType === 'login' && (
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-muted-foreground text-primary-500 pr-1 transition duration-300 underline-offset-4 hover:underline hover:text-primary"
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
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <FontAwesomeIcon
            icon={faSpinner}
            className="mr-2 h-4 w-4 animate-spin"
          />
        ) : (
          <FontAwesomeIcon icon={faGoogle} className="mr-2 h-4 w-4" />
        )}{' '}
        Google
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={handleSubmitWithGitHub}
      >
        {isLoading ? (
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
