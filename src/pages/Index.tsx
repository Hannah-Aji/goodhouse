import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedProperties } from '@/components/FeaturedProperties';
import { Footer } from '@/components/Footer';
import { useState } from 'react';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection 
          onCategoryChange={setActiveCategory} 
          activeCategory={activeCategory} 
        />
        <FeaturedProperties categoryFilter={activeCategory} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
