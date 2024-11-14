import React from 'react'
import Hero from '../../components/Hero/Hero'
import Trending from '../../components/Trending/Trending'
import Hero2 from '../../components/Hero-2/Hero2'
import Best_sellers from '../../components/best_sellers/Best_sellers'
import AuthorsCarousel from '../../components/authors_carousal/Authors_carousal'
import Footer from '../../components/Footer/Footer'


const Home = () => {
  return (
    <div>
        <Hero/>
        <Trending/>
        <Hero2/>
        <Best_sellers/>
    </div>
  )
}

export default Home
