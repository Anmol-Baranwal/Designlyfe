import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const Subscribe: React.FC = () => {
  return (
    <div className="bg-gray-100 py-16 md:py-24 lg:py-32">
      <div className="mx-auto text-center">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold mb-4 lg:mb-6">
          Subscribe to get notified about events
        </h1>
        <div className="mt-8 md:w-3/4 lg:w-1/2 xl:w-2/5 mx-auto">
          <Input
            placeholder="Enter your email address"
            type="email"
            id="subscribeEmail"
            className="w-full px-4 py-2"
          />
          <Button type="submit" className="mt-4 px-6 py-2 font-medium">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Subscribe
