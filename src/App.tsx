import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { TechStack } from './components/TechStack'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { SectionOrnament } from './components/SectionOrnament'
import { AdminDashboard } from './components/AdminDashboard'
import { QueuePage } from './components/QueuePage'

const isAdmin = window.location.pathname === '/admin'
const isQueue = window.location.pathname === '/queue'

function App() {
  if (isAdmin) return <AdminDashboard />
  if (isQueue) return <QueuePage />

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-50 selection:bg-emerald-400/30 selection:text-white antialiased">
      <div
        aria-hidden
        className="fixed inset-0 -z-20 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/[0.06] blur-[140px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/[0.05] blur-[140px] rounded-full" />
      </div>

      <Header />
      <Hero />

      <SectionOrnament label="About" />
      <About />

      <SectionOrnament label="Experience" />
      <Experience />

      <TechStack />

      <SectionOrnament label="Projects" />
      <Projects />

      <SectionOrnament label="Contact" />
      <Contact />

      <Footer />
    </main>
  )
}

export default App
