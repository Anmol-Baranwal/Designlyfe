import LandingPage from '@/components/landing-page'
import Navbar from '@/components/navbar/Navbar'

export default function Home() {
  return (
    <div className="bg-white">
      <main>
        <Navbar />
      </main>
      <LandingPage />
    </div>
  )
}
