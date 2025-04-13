import React from 'react'
import HomeHero from '../../components/home/HomeHero'
import PopularSection from '../../components/home/PopularSection'
import BestInSection from '../../components/home/BestInSection'
import NewsletterTape from '../../components/home/NewsletterTape'
import FeaturesTape from '../../components/home/FeaturesTape'
import JoinSection from '../../components/home/JoinSection'

const Home = () => {
  return (
    <div>
      <HomeHero />
      <PopularSection />
      <FeaturesTape />
      <BestInSection />
      <NewsletterTape />
      <JoinSection />
    </div>
  )
}

export default Home
