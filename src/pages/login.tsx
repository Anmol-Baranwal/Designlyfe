import { Metadata } from 'next'
// import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '../components/ui/button'
import { UserAuthForm } from '../components/authentication/user-auth-form'
import AuthPageContext from '@/components/AuthPageContext'
import { useAuthContext } from '../../lib/firebase/context/AuthContext'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
}

export default function AuthenticationPage() {
  // const [formType, setFormType] = useState<'login' | 'signup'>('signup')
  const { formType, setFormType } = useContext(AuthPageContext)

  const { onSuccessfulAuth } = useAuthContext()

  return (
    <>
      <div className="md:hidden">
        {/* <Image
          src="/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        /> */}
        {/* <Image
          src="/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        /> */}
      </div>
      <div className="container relative h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8'
          )}
          onClick={(e) => {
            e.preventDefault()
            setFormType(formType === 'login' ? 'signup' : 'login')
          }}
        >
          {formType === 'login' ? 'Signup' : 'Login'}
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image
              src="/UIVerse_brand_logo.png"
              alt="logo"
              width={25}
              height={25}
            />
            <Link href="/">&nbsp; UIVerse</Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This will save me countless hours of work and will help
                me find better resources much faster than ever.&rdquo;
              </p>
              <footer className="text-sm">Alicia Erisen</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center pt-20 space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {formType === 'signup' ? 'Create an account' : 'Sign In'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {formType === 'signup'
                  ? 'Enter your details below to create your account'
                  : 'Enter your login credentials'}
              </p>
            </div>
            <UserAuthForm
              formType={formType}
              onSuccessfulAuth={onSuccessfulAuth}
            />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
