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
    try {
      if (user?.providerId === 'github.com') {
        await signOutGitHub()
      } else {
        await signOutEmail()
      }
      console.log('User signed out')
      router.push('/')
    } catch (error) {
      console.error(error)
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
