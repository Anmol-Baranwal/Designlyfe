import { Button } from './button'
import { useToast } from './use-toast'

interface ToastWithTitleProps {
  title?: string
  description: React.ReactNode
}

export function ToastWithTitle({ title, description }: ToastWithTitleProps) {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: title,
          description: description,
        })
      }}
    ></Button>
  )
}

export default ToastWithTitle
