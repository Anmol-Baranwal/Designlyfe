import { Button } from '@/components/ui/button'
import { signOut } from 'firebase/auth'

interface DashboardProps {
  userId: string
  email: string | null
}

const Dashboard: React.FC<DashboardProps> = ({ userId, email }) => {
  const handleSignOut = async () => {
    try {
      await signOut()
      console.log('User signed out')
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
