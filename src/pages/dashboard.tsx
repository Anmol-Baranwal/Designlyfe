// import { Button } from '@/components/ui/button'
import { useAuthContext } from '../../lib/firebase/context/AuthContext'
// import { signOutEmail } from '../../lib/emailPasswordAuth'
import { useRouter } from 'next/router'
import { useToast } from '../components/ui/use-toast'
import DashboardInterface from '../components/ui/dashboard/main/dashboard-main-page'

interface DashboardProps {
  userId: string
  email: string | null
  username?: string
}
// { userId, email, username }
const Dashboard: React.FC<DashboardProps> = () => {
  const { user, loading } = useAuthContext()
  // const userId = user?.uid
  // const email = user?.email

  const router = useRouter()

  const { toast } = useToast()
  if (!user) {
    // User is not authenticated => redirect to home page
    router.push('/')
    return null
    // causes re-renders when users log out

    // toast({
    //   title: 'Authentication Required',
    //   description: 'Please Signup or Login to access dashboard',
    // })
    // return <div>Loading...</div>
  }

  // if (user) {
  //   const { uid, email, displayName, photoURL } = user

  //   // Display the user details as needed
  //   console.log('User ID:', uid)
  //   console.log('Email:', email)
  //   console.log('Display Name:', displayName)
  //   console.log('Photo URL:', photoURL)
  // }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {router.pathname === '/dashboard' && (
        <>
          <DashboardInterface />
        </>
      )}
    </div>
  )
}

export default Dashboard
