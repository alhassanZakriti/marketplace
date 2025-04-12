import React from 'react'
import HomeHero from '../../components/home/HomeHero'
import PopularSection from '../../components/home/PopularSection'
import BestInSection from '../../components/home/BestInSection'

const Home = () => {
  return (
    <div>
      <HomeHero />
      <PopularSection />
      <BestInSection />
    </div>
  )
}

export default Home
