import Image from 'next/legacy/image'

export const CompaniesTrust = () => {
  return (
    <div className="mt-20 pt-20 relative w-full flex flex-col justify-center items-center">
      <h1 className="text-5xl">Companies that trusts Us.</h1>
      <Image
        src="/landing-page/underline.png"
        alt={`styled underline`}
        width={300}
        height={14}
        className="mt-4"
      />
      <div className="mt-16">
        <Image
          src="/landing-page/companies.png"
          alt={`companies list`}
          width={1000}
          height={100}
        />
      </div>
    </div>
  )
}

export default CompaniesTrust
