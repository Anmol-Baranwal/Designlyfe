import { Avatar, AvatarFallback, AvatarImage } from '../../avatar'
import { Button } from '../../button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../../dropdown-menu'
import { useAuthContext } from '../../../../../lib/firebase/context/AuthContext'
import { useRouter } from 'next/router'
import { signOutGitHub } from '../../../../../lib/GitHubAuth'
import { useEffect, useState } from 'react'

type UserData = {
  userId: string
  name: string
  email: string
  username: string
  avatarUrl: string
}

export function UserNav() {
  const { user } = useAuthContext()
  // const userId = user?.uid
  const email = user?.email || 'AB'

  const router = useRouter()

  const [isProfileClicked, setIsProfileClicked] = useState(false)

  const [userData, setUserData] = useState<UserData | null>(null)

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
    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/getUserDetails?userId=${user.uid}`)
          if (response.ok) {
            const data = await response.json()
            setUserData(data.user)
            // console.log(data.message)
          } else {
            console.error('Failed to fetch user data:', response.statusText)
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
    }

    if (!user) {
      // If the user is logged out, navigate to the home page
      router.push('/')
    } else {
      fetchUserData()
    }
  }, [user, router])

  if (isProfileClicked) {
    router.push('/settings/profile')
  }

  const choice = userData?.username || email // username is much better for finding avatar fallback name
  const shortName = choice
    .replace(/[^a-zA-Z]/g, '') // Remove non-alphabet characters
    .slice(0, 2) // Take the first two letters
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="@anmol" />
            <AvatarFallback>{shortName}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userData?.username || 'Builder'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userData?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsProfileClicked(true)}
          >
            Profile
            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem>
            Discussions
            {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            handleSignOut()
          }}
          className="cursor-pointer"
        >
          {/* <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer"> */}
          Log Out
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
