import { Button } from '../button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog'
import { Label } from '../label'
import { Textarea } from '../textarea'
import { useState } from 'react'
import { useAuthContext } from '../../../../lib/firebase/context/AuthContext'
import { Input } from '../input'

type FeedbackFormEvent = React.FormEvent<HTMLButtonElement>

const FeedbackButton = () => {
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState<number | undefined>()

  const { user } = useAuthContext()
  const uid = user ? user.uid : null
  const email = user ? user.email : null

  const handleRatingChange = (selectedRating: number) => {
    if (selectedRating >= 1 && selectedRating <= 5) {
      setRating(selectedRating)
    } else {
      setRating(undefined) // set to undefined if rating is invalid
    }
  }

  const handleSubmit = async (e: FeedbackFormEvent) => {
    e.preventDefault()

    if (message.trim() === '') {
      return
    }

    console.log({ rating })
    try {
      const response = await fetch('/api/addFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, rating, uid, email }),
      })

      if (response.ok) {
        console.log('Feedback added successfully')
        setMessage('')
        setRating(undefined)
      } else {
        console.error('Failed to add feedback')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const isRatingValid = (rating: number | undefined) => {
    return rating !== undefined && rating >= 1 && rating <= 5
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-foreground">Feedback &nbsp;</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feedback Form</DialogTitle>
            <DialogDescription>
              Your honest feedback is appreciated.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="rating">Rate Your Experience (1-5)</Label>
              <Input
                id="rating"
                type="number"
                min={1}
                max={5}
                placeholder="Higher the number, better is the experience"
                value={rating === undefined ? '' : rating}
                onChange={(e) => handleRatingChange(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="What changes would you like in UIVerse and why?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              disabled={!isRatingValid(rating) || message.trim() === ''}
            >
              Submit Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div></div>
    </>
  )
}

export default FeedbackButton
