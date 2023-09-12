import { Button } from './ui/button'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faChartArea } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { BriefTitle } from './brief-title'

const LandingPage = () => {
  return (
    <div className="bg-cover bg-center my-2" id="home">
      <div className="flex pl-24 pr-16 justify-center">
        <div className="flex flex-col md:w-1/2 w-full py-8 text-center md:text-left">
          <BriefTitle
            size="w-60 h-4"
            txt="Join waitlist Now"
            className="cursor-pointer hover:tracking-wider hover:text-slate-600 transition-all duration-300"
            href="https://docs.google.com/forms/d/1-8Ga2dGzXhoH8a7w9_mRFtoukfD7a4Al_A060OdHWq8"
          />
          <h2
            className="lg:text-6xl text-5xl font-medium mb-10 mt-2 text-bg-100 font-poppins"
            style={{ lineHeight: '1.3' }}
          >
            find best quality <br /> design assets <br /> 10x faster <br />
          </h2>
          <div className="flex justify-center md:justify-normal">
            <Link href="/login">
              <Button className="mr-8 py-8 px-14 text-xl bg-bg-100 border-2 tracking-widest hover:bg-primary-100">
                Try the Demo
              </Button>
            </Link>
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
        <div className="hidden md:w-1/2 md:block pt-20 pl-24 my-auto">
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
