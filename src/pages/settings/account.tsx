import SettingsAccountPage from '@/components/ui/dashboard/profile/account/page'
import SettingsLayout from '../../layouts/settingsLayout'
import { Button } from '@/components/ui/button'

const UserAccount = () => {
  return (
    <>
      <SettingsLayout button={<Button></Button>}>
        <SettingsAccountPage />
      </SettingsLayout>
    </>
  )
}

export default UserAccount
