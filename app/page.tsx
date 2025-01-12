import Navbar from './components/Navbar'
import LandingSection from './components/LandingSection'
import TimelineSection from './components/TimelineSection'
import OrganizersSection from './components/OrganizersSection'
import FAQSection from './components/FAQSection'

export default function Home() {
  return (
    <main>
      <Navbar />
      <LandingSection />
      <TimelineSection />
      <OrganizersSection />
      <FAQSection />
    </main>
  )
}

