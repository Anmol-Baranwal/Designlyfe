import React from 'react'
import { Button } from './ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import EmailInfo from './email-info'

const Subscribe: React.FC = () => {
  return (
    <div className="py-20" id="subscribe">
      <div className="text-center shadow-lg border-bg-muted border py-16 mx-20 rounded-2xl">
        <h1 className="text-2xl lg:text-4xl xl:text-5xl font-semibold mb-4 lg:mb-1 text-primary-100">
          want notifications from us. <br />
        </h1>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="text-bg-300 text-lg">
              what type of emails
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-items-start text-left pl-2 space-x-8">
              <div className="space-y-1">
                {/* <h4 className="text-sm font-semibold">@UIVerse</h4> */}
                <EmailInfo text="Updates on the New resources" />
                <EmailInfo text="Updates on the launch" />
                <EmailInfo text="Insights on a SAAS product" />
                <EmailInfo text="Perks, fun, and Life itself" />
                <div className="flex items-center pt-2">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="mr-2 h-4 w-4 opacity-70"
                  />
                  <span className="text-sm text-muted-foreground">
                    You will get a weekly email
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <div className="mt-10 md:w-3/4 lg:w-1/2 xl:w-2/5 mx-auto flex items-center bg-primary-100 py-4 px-4 rounded-full min-h-8 max-w-[555px]">
          <input
            placeholder="Enter your email address"
            type="email"
            className="w-full px-4 py-2 outline-none bg-transparent rounded-l-lg placeholder-bg-muted tracking-wider text-md pl-8 max-w-full text-primary-300"
            style={{ caretColor: 'white' }}
          />
          <Button
            type="submit"
            className="py-6 px-12 text-xl bg-primary-300 text-bg-100 rounded-full hover:bg-accent-100 transition-all duration-300"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Subscribe
