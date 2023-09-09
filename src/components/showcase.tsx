import Image from 'next/legacy/image'

export const Showcase = () => {
  return (
    <div className="mt-20 pt-20 relative w-full flex flex-col justify-center items-center">
      <Image
        src="/landing-page/showcase.png"
        alt={`showcase illustrations banner`}
        width={1510}
        height={466}
        className="mt-4"
      />
    </div>
  )
}

export default Showcase
