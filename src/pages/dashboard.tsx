import { Button } from '@/components/ui/button'
import { useAuthContext } from '../../lib/firebase/context/AuthContext'
import { signOutGitHub } from '../../lib/GitHubAuth'
import { signOutEmail } from '../../lib/emailPasswordAuth'
import { useRouter } from 'next/router'

interface DashboardProps {
  userId: string
  email: string | null
}

const Dashboard: React.FC<DashboardProps> = ({ userId, email }) => {
  const { user } = useAuthContext()

  const router = useRouter()
  const handleSignOut = async () => {
    console.log('Provider ID:', user?.providerId)
    console.log('Custom claim:', user?.customClaims?.authMethod)
    try {
      if (user?.customClaims?.authMethod === 'github') {
        await signOutGitHub() // Sign out using GitHub auth
      } else if (user?.customClaims?.authMethod === 'email') {
        await signOutEmail() // Sign out using email/password auth
      }
      console.log('User signed out')
    } catch (error) {
      console.error(error)
    } finally {
      router.push('/')
    }
  }

  return (
    <div>
      Hey, this is the secret dashboard. At least for now.
      <h1>
        {userId} {email}
      </h1>
      <Button variant="outline" type="button" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  )
}

export default Dashboard
