import { Button } from '@/components/ui/button'
import { useAuthContext } from '../../lib/firebase/context/AuthContext'
import { signOutGitHub } from '../../lib/GitHubAuth'
// import { signOutEmail } from '../../lib/emailPasswordAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface DashboardProps {
  userId: string
  email: string | null
  username?: string
}
// { userId, email, username }
const Dashboard: React.FC<DashboardProps> = () => {
  const { user, loading } = useAuthContext()
  const userId = user?.uid
  const email = user?.email

  const router = useRouter()
  const handleSignOut = async () => {
    console.log('Provider ID:', user?.providerId)
    try {
      await signOutGitHub()
      console.log('User signed out')
    } catch (error) {
      console.error(error)
    } finally {
      router.push('/')
    }
  }

  useEffect(() => {
    if (user) {
      const { uid, email, displayName, photoURL } = user

      // Display the user details as needed
      console.log('User ID:', uid)
      console.log('Email:', email)
      console.log('Display Name:', displayName)
      console.log('Photo URL:', photoURL)
    }
  }, [user, router])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {router.pathname === '/dashboard' && (
        <>
          Hey, this is the secret dashboard. At least for now.
          <h1>
            {userId} {email}
          </h1>
          <Button variant="outline" type="button" onClick={handleSignOut}>
            Sign Out
          </Button>
        </>
      )}
    </div>
  )
}

export default Dashboard
