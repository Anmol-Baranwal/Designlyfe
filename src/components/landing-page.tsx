import { Button } from './ui/button'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faChartArea } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { BriefTitle } from './brief-title'

const LandingPage = () => {
  return (
    <div className="bg-cover bg-center">
      <div className="flex px-16 justify-center">
        <div className="flex flex-col w-1/2 py-10">
          <BriefTitle size="w-60 h-4" txt="Join waitlist Now" />
          <h2 className="text-6xl font-medium mb-10 mt-2 text-bg-100 font-poppins leading-tight ">
            find best quality <br /> design assets for free <br /> 10x faster{' '}
            <br />
          </h2>
          <div className="flex">
            <Button className="mr-8 py-8 px-14 text-xl bg-bg-100 border-2 hover:bg-primary-100">
              <Link href="/login">Try the Demo</Link>
            </Button>
            {/* <Button className="mr-8 h-12 px-8 text-md bg-transparent border-2 border-primary-200 hover:bg-primary-200 hover:shadow-primary-200 hover:shadow-sm">
            <FontAwesomeIcon icon={faChartArea} className="mr-3 h-4 w-4" />{' '}
            <Link
              href="https://docs.google.com/forms/d/1-8Ga2dGzXhoH8a7w9_mRFtoukfD7a4Al_A060OdHWq8/edit#responses"
              target="_blank"
            >
              Join
            </Link>
            &nbsp;waitlist
          </Button> */}
          </div>
        </div>
        <div className="w-1/2 pt-20 pl-24">
          <Image
            src={'/landing-page/hero-illustration.png'}
            alt="hero illustration"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  )
}

export default LandingPage
