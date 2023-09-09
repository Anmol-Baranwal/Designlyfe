import { BriefTitle } from './brief-title'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/legacy/image'

const bulletPoints = [
  {
    iconSrc: '/landing-page/fire.png',
    text: 'No more hustling to search multiple websites',
  },
  {
    iconSrc: '/landing-page/fire.png',
    text: 'Do self branding with your public profile',
  },
  {
    iconSrc: '/landing-page/fire.png',
    text: 'Bookmark your favorite ones and explore trending',
  },
]

export const WhyUs = () => {
  return (
    <div className="bg-cover bg-center my-20">
      <div className="flex pl-24 pr-16 justify-center">
        <div className="flex flex-col w-1/2 py-8">
          <BriefTitle size="w-44 h-4" txt="Who are we?" />
          <h2 className="text-5xl font-regular mb-8 mt-3 text-bg-100 font-poppins">
            we are on a mission <br /> to build a community <br /> for you.{' '}
            <br />
          </h2>
          {bulletPoints.map((item, index) => (
            <p
              key={index}
              className="pl-2 flex items-center mb-3 font-dm-sans font-medium"
            >
              <Image
                src={item.iconSrc}
                alt={`bullet point fire icon ${index}`}
                width={18}
                height={22}
              />
              <span className="text-xl text-bg-300 pl-3">{item.text}</span>
            </p>
          ))}
          <div className="flex mt-8">
            <Button className="mr-8 py-8 px-14 text-xl bg-bg-100 border-2 tracking-widest hover:bg-primary-100">
              <Link href="/login">Try it (1 min)</Link>
            </Button>
          </div>
        </div>
        <div className="w-1/2 pt-20 pl-0">
          <div className="flex flex-row">
            <div className="bg-muted h-56 w-56 rounded-lg flex flex-col justify-center items-center border-accent-100 border mr-6">
              <h4 className="font-semibold font-dm-sans text-4xl">5+</h4>
              <p className="pt-2 font-dm-sans text-lg text-center">
                companies <br /> ready to collaborate{' '}
              </p>
            </div>
            <div className="bg-muted h-56 w-56 rounded-lg flex flex-col justify-center items-center border-primary-200 border mt-6">
              <h4 className="font-semibold font-dm-sans text-4xl">50+</h4>
              <p className="pt-2 font-dm-sans text-lg text-center">
                websites associated <br /> with UIVerse{' '}
              </p>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="bg-muted h-56 w-56 rounded-lg flex flex-col justify-center items-center border-slate-400 border mr-6">
              <h4 className="font-semibold font-dm-sans text-4xl">30+</h4>
              <p className="pt-2 font-dm-sans text-lg text-center">
                people interested <br /> in UIVers{' '}
              </p>
            </div>
            <div className="bg-muted h-56 w-56 rounded-lg flex flex-col justify-center items-center border-red-200 border  mt-6">
              <h4 className="font-semibold font-dm-sans text-4xl">300+</h4>
              <p className="pt-2 font-dm-sans text-lg text-center">
                assets across <br /> five categories{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyUs
