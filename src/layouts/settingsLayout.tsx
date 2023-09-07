import { Metadata } from 'next'
// import Image from 'next/image'

import { Separator } from '../components/ui/separator'
import { SidebarNav } from '../components/ui/dashboard/profile/components/sidebar-nav'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import FeedbackButton from '@/components/ui/dashboard/feedback-button'
import { useAuthContext } from '../../lib/firebase/context/AuthContext'

export const metadata: Metadata = {
  title: 'Settings Layout',
  description: 'Advanced settings for unique public profile',
}

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/settings/profile',
  },
  {
    title: 'Account',
    href: '/settings/account',
  },
  {
    title: 'Appearance',
    href: '/settings/appearance',
  },
  {
    title: 'Notifications',
    href: '/settings/notifications',
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
  button?: ReactNode
}

export default function SettingsLayout({
  children,
  button,
}: SettingsLayoutProps) {
  const router = useRouter()

  const { user } = useAuthContext()
  if (!user) {
    router.push('/')
    return null
  }

  const goHomePage = () => {
    router.push('/dashboard')
    return
  }

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div
              className="pl-6 font-semibold text-2xl cursor-pointer"
              onClick={() => goHomePage()}
            >
              UIVerse
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <FeedbackButton />
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        {/* <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        /> */}
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your profile settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
