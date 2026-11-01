import Hero from '@/components/home/Hero';
import CategoryStrip from '@/components/home/CategoryStrip';
import PlantQuiz from '@/components/home/PlantQuiz';
import PopularPlants from '@/components/home/PopularPlants';
import GreenSetupBanner from '@/components/home/GreenSetupBanner';
import TrustStrip from '@/components/home/TrustStrip';
import StatsAndTestimonials from '@/components/home/StatsAndTestimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <PlantQuiz />
      <PopularPlants />
      <GreenSetupBanner />
      <TrustStrip />
      <StatsAndTestimonials />
    </>
  );
}

