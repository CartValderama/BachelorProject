import React from 'react'
import Footer from '../components/Footer'
import Intro from '../components/landingPage-components/Intro'
import About from '../components/landingPage-components/About'
import AppDescription from '../components/landingPage-components/AppDescription'
import Demo from '../components/landingPage-components/Demo'
import AboutModes from '../components/landingPage-components/AboutModes'
import IntroModes from '../components/landingPage-components/IntroModes'
import NavBar from '../components/tailwind-components/Navbar'

export default function LandingPage() {
  return (
    <>
      <NavBar />
      <Intro />
      <AppDescription />
      <IntroModes />
      <AboutModes />
      <Demo />
      <About />
      <Footer />
    </>
  )
}
