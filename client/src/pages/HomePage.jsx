import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../services/api.js';

// Homepage Section Components
import HeroSlider from '../components/home/HeroSlider.jsx';
import FeaturedCollections from '../components/home/FeaturedCollections.jsx';
import NewArrivals from '../components/home/NewArrivals.jsx';
import ShopByOccasion from '../components/home/ShopByOccasion.jsx';
import BridalEditorial from '../components/home/BridalEditorial.jsx';
import WhyChooseUs from '../components/home/WhyChooseUs.jsx';
import BestSellersCarousel from '../components/home/BestSellersCarousel.jsx';
import FashionStory from '../components/home/FashionStory.jsx';
import Testimonials from '../components/home/Testimonials.jsx';
import SocialGallery from '../components/home/SocialGallery.jsx';
import NewsletterSection from '../components/home/NewsletterSection.jsx';

export default function HomePage() {
  const [heroSlides, setHeroSlides] = useState([]);
  const [curatedData, setCuratedData] = useState({
    featured: [],
    newArrivals: [],
    bestSellers: [],
    bridalCollection: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [slidesRes, curatedRes] = await Promise.all([
          api.get('/cms/hero-slides'),
          api.get('/products/curated'),
        ]);

        if (slidesRes.data.success) {
          setHeroSlides(slidesRes.data.data);
        }
        if (curatedRes.data.success) {
          setCuratedData(curatedRes.data.data);
        }
      } catch (err) {
        console.error('Error loading homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Fashion House Sialkot | Luxury Bridal & Designer Lehenga Couture</title>
        <meta
          name="description"
          content="Heirloom handcrafted bridal lehengas, made-to-measure wedding couture, and interactive 3D bespoke customizer by Fashion House Sialkot."
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        {/* 1. Hero Slider with Center-Bottom Controls */}
        <HeroSlider slides={heroSlides} />

        {/* 2. Featured Collections */}
        <FeaturedCollections />

        {/* 3. New Arrivals (8 Products Grid) */}
        <NewArrivals products={curatedData.newArrivals} />

        {/* 4. Shop by Occasion */}
        <ShopByOccasion />

        {/* 5. Bridal Editorial Section */}
        <BridalEditorial />

        {/* 7. Why Choose Us (Visual Trust Pillars) */}
        <WhyChooseUs />

        {/* 8. Best Sellers Carousel */}
        <BestSellersCarousel products={curatedData.bestSellers} />

        {/* 9. Full-Width Fashion Story */}
        <FashionStory />

        {/* 10. Real Bride Testimonials */}
        <Testimonials />

        {/* 11. Social / Instagram Gallery */}
        <SocialGallery />

        {/* 12. Newsletter Signup with Welcome Privilege */}
        <NewsletterSection />
      </div>
    </>
  );
}
