// import CompaniesTrust from '@/components/companies-trust'
import LandingPage from '@/components/landing-page'
import Navbar from '@/components/navbar/Navbar'
// import Showcase from '@/components/showcase'
import WhyUs from '@/components/why-us'

export default function Home() {
  return (
    <div className="bg-white">
      <main>
        <Navbar />
      </main>
      <LandingPage />
      {/* <CompaniesTrust /> */}
      <WhyUs />
      {/* <Showcase /> */}
    </div>
  )
}
