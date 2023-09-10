import React from 'react'
import ArrowOdd from '../../public/landing-page/how-it-works/arrowOdd.svg'
import ArrowEven from '../../public/landing-page/how-it-works/arrowEven.svg'
import { howItWorksData } from '../../data/works'
import Image from 'next/legacy/image'

const HowItWorks: React.FC = () => {
  const lastIndex = howItWorksData.length - 1
  return (
    <section
      className="bg-primary-100 bg-center bg-no-repeat bg-cover relative py-16 md:py-24"
      id="how-it-works"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-accent-100 text-center mb-16 font-poppins">
          How does it works?
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {howItWorksData.map((item, index) => {
            const isEven = index % 2 === 0
            const isLast = index === lastIndex
            return (
              <div
                className={`card relative text-white text-left ${
                  isEven ? 'before-even' : 'before-odd'
                }`}
                key={item.id}
              >
                <div className="flex flex-row">
                  <div className="bg-primary-300 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto lg:mx-0 mb-4 text-bg-300 font-semibold text-lg">
                    {`0${item.id}`}
                  </div>
                  <div className="arrow-container xl:flex xs:hidden pl-8">
                    {!isLast ? (
                      isEven ? (
                        <Image
                          src={ArrowOdd}
                          alt="Arrow Even"
                          className="mt-8"
                        />
                      ) : (
                        <Image
                          src={ArrowEven}
                          alt="Arrow Even"
                          className="mt-8"
                        />
                      )
                    ) : null}
                  </div>
                </div>
                <div className="text-center md:text-left font-dm-sans mb-4">
                  <h2 className="text-xl md:text-xl lg:text-2xl font-medium text-primary-300 mt-2 mb-2 md:mb-4">
                    {item.title}
                  </h2>
                  <p className="text-md text-primary-300 opacity-80 tracking-wide">
                    {item.text}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
