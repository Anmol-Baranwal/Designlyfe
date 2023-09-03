import LandingPage from '@/components/landing-page'
import Navbar from '@/components/navbar/Navbar'

export default function Home() {
  return (
    <div>
      <main>
        <Navbar />
      </main>
      <LandingPage />
      <div className="bg-primary-300 mt-50">hey</div>
    </div>
  )
}
