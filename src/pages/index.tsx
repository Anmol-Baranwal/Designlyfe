import LandingPage from '@/components/landing-page'
import Navbar from '@/components/navbar/Navbar'
import bgLanding from '../../public/home-page/bgLanding.png'

export default function Home() {
  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: `url(${bgLanding.src})`, // Set the background image URL
      }}
    >
      <main>
        <Navbar />
      </main>
      <LandingPage />
    </div>
  )
}
