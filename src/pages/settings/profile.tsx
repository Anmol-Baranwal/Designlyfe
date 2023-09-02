import SettingsProfilePage from '@/components/ui/dashboard/profile/main/page'
import SettingsLayout from '../../layouts/settingsLayout'
import { Button } from '@/components/ui/button'
const UserProfile = () => {
  return (
    <>
      <SettingsLayout button={<Button></Button>}>
        <SettingsProfilePage />
      </SettingsLayout>
    </>
  )
}

export default UserProfile
