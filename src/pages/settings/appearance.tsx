import SettingsAppearancePage from '@/components/ui/dashboard/profile/appearance/page'
import SettingsLayout from '../../layouts/settingsLayout'
import { Button } from '@/components/ui/button'

const UserProfile = () => {
  return (
    <>
      <SettingsLayout button={<Button></Button>}>
        <SettingsAppearancePage />
      </SettingsLayout>
    </>
  )
}

export default UserProfile
