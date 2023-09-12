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
      <div className="text-center shadow-lg border py-16 px-4 md:px-0 mx-2 md:mx-20 rounded-2xl md:border-bg-muted">
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
                {/* <h4 className="text-sm font-semibold">@Designlyfe</h4> */}
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
        <div className="mt-10 mx-auto flex items-center justify-center min-h-8 max-w-full">
          <form
            action="https://send.pageclip.co/ohnHl8Ae8MNAzMnc9l2cnl8Wp8DdhwXF/newsletter"
            className="pageclip-form flex w-full justify-center items-center mt-0"
            method="post"
          >
            <input
              placeholder="Enter your email address"
              type="email"
              name="email"
              className="w-80 py-[22px] mr-2 bg-bg-100 placeholder-bg-muted rounded-md tracking-wider text-md pl-8 pr-12 text-primary-300"
              style={{ caretColor: 'white' }}
              autoComplete="off"
              // value={}
            />
            <Button
              type="submit"
              className="pageclip-form__submit py-8 px-14 text-xl bg-transparent border-2 border-bg-100 text-bg-100 rounded-md hover:bg-primary-200 transition-all duration-300"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Subscribe
