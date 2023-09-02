import { Avatar, AvatarFallback, AvatarImage } from '../../avatar'
import { Button } from '../../button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../../dropdown-menu'
import { useAuthContext } from '../../../../../lib/firebase/context/AuthContext'
import { useRouter } from 'next/router'
import { signOutGitHub } from '../../../../../lib/GitHubAuth'
import { useEffect, useState } from 'react'

export function UserNav() {
  const { user } = useAuthContext()
  // const userId = user?.uid
  // const email = user?.email

  const router = useRouter()

  const [isProfileClicked, setIsProfileClicked] = useState(false)

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
    if (!user) {
      // If the user is logged out, navigate to the home page
      router.push('/')
    }
  }, [user, router])

  if (isProfileClicked) {
    router.push('/settings/profile')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="@anmol" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Anmol</p>
            <p className="text-xs leading-none text-muted-foreground">
              uiverse@example.com
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
