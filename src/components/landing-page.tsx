import { Button } from './ui/button'
import bgLanding from '../../public//home-page/bgLanding.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faChartArea } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'

const LandingPage = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen h-full"
      style={{
        backgroundImage: `url(${bgLanding.src})`, // Set the background image URL
      }}
    >
      <Image
        src="/home-page/craftwork.png"
        alt="asset"
        width={40}
        height={40}
        className="position-craftwork"
      />
      <Image
        src="/home-page/getillustrations.png"
        alt="asset"
        width={40}
        height={40}
        className="position-getillustrations"
      />
      <Image
        src="/home-page/lsgraphics.png"
        alt="asset"
        width={40}
        height={40}
        className="position-lsgraphics"
      />
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 mt-32 text-primary-300 tracking-wide">
          Organize Your Resources
        </h1>
        <h2 className="text-lg text-center mb-10 text-accent-100">
          Community platform to upvote, bookmark, and organize trending
          resources with your dashboard. <br />
          <span className="tracking-wide text-md font-medium">
            Be Faster! Be Smarter!
          </span>
        </h2>
        <div className="flex transition-all duration-500">
          <Button className="mr-8 h-12 px-8 text-md bg-transparent border-2 border-accent-100 hover:border-accent-200 hover:bg-accent-200 hover:text-bg-300 hover:shadow-accent-100 hover:shadow-sm">
            <Link href="/login">Try the Demo</Link>
            <FontAwesomeIcon icon={faArrowRight} className="ml-3 h-4 w-4" />
          </Button>
          <Button className="mr-8 h-12 px-8 text-md bg-transparent border-2 border-primary-200 hover:bg-primary-200 hover:shadow-primary-200 hover:shadow-sm">
            <FontAwesomeIcon icon={faChartArea} className="mr-3 h-4 w-4" />{' '}
            <Link
              href="https://docs.google.com/forms/d/1-8Ga2dGzXhoH8a7w9_mRFtoukfD7a4Al_A060OdHWq8/edit#responses"
              target="_blank"
            >
              Join
            </Link>
            &nbsp;waitlist
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
