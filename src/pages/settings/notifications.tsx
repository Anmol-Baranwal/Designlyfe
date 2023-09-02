import SettingsNotificationsPage from '@/components/ui/dashboard/profile/notifications/page'
import SettingsLayout from '../../layouts/settingsLayout'
import { Button } from '@/components/ui/button'

const UserProfile = () => {
  return (
    <>
      <SettingsLayout button={<Button></Button>}>
        <SettingsNotificationsPage />
      </SettingsLayout>
    </>
  )
}

export default UserProfile
