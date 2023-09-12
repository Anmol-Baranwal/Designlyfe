import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

interface EmailInfoProps {
  text: string
}

export const EmailInfo = ({ text }: EmailInfoProps) => {
  return (
    <div className="flex items-center">
      <FontAwesomeIcon icon={faCheck} className="mr-2 h-4 w-4 opacity-70" />
      <div className="text-sm">{text}</div>
    </div>
  )
}

export default EmailInfo
