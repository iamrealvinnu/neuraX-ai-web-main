
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

// New AI Features Section Component
import AIFeaturesSection from '@/components/AIFeaturesSection';

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "NeuraX AI | Culturally Intelligent AI Solutions";
  }, []);

  return (
    <div className="min-h-screen bg-neuraxDark">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <AIFeaturesSection />
      <ContactSection />
      <Footer />
      
      {/* Floating ChatBot */}
      <div className="fixed bottom-8 right-8 z-50">
        <ChatBot />
      </div>
    </div>
  );
};

export default Index;
