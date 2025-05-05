
import React, { useEffect, useState } from 'react';
import { ArrowDown, Sparkles, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neuraxBlue-dark via-neuraxDark to-neuraxBlue opacity-90"></div>
        
        {/* Enhanced animated elements */}
        <div className="absolute top-0 left-0 w-screen h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neuraxBlue/30 via-transparent to-transparent opacity-60"></div>
        <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] bg-neuraxGreen/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 -left-20 w-[30rem] h-[30rem] bg-neuraxBlue-light/30 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-10 right-1/4 w-[25rem] h-[25rem] bg-neuraxGreen/5 rounded-full blur-3xl animate-pulse-slow"></div>
        
        {/* Grid pattern overlay - more subtle */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMxYTJlNWUiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48L2c+PC9zdmc+')] opacity-10"></div>
        
        {/* Floating particles */}
        <div className="hidden lg:block">
          {Array(15).fill(0).map((_, index) => (
            <div 
              key={index}
              className="absolute rounded-full bg-neuraxGreen/50 blur-sm"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="neura-container relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center lg:text-left">
            <div className="inline-block mb-3 px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 animate-pulse-slow">
              <span className="text-neuraxGreen text-sm font-medium flex items-center space-x-2">
                <Sparkles size={14} className="inline mr-2 text-neuraxGreen" />
                Next Generation AI Technology
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="heading-gradient glow-text">Shaping the Future</span> 
              <br className="hidden md:block" />
              <span className="text-white">with Intelligent AI</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We build revolutionary AI solutions that transform businesses, enhance human capabilities, and solve complex challenges across industries.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-neuraxGreen hover:bg-neuraxGreen-dark text-neuraxDark font-medium text-lg px-8 py-6 group relative overflow-hidden btn-glow">
                <span className="relative z-10 flex items-center">
                  Explore Solutions
                  <Brain className="ml-2 h-5 w-5" />
                </span>
                <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              </Button>
              
              <Button variant="outline" className="border-neuraxGreen text-neuraxGreen hover:bg-neuraxGreen/10 font-medium text-lg px-8 py-6 backdrop-blur-sm">
                <span className="flex items-center">
                  Learn More
                  <Zap className="ml-2 h-5 w-5" />
                </span>
              </Button>
            </div>
            
            {/* Feature tags */}
            <div className="mt-10 flex flex-wrap gap-2 justify-center lg:justify-start">
              {['Neural Networks', 'Machine Learning', 'Computer Vision', 'NLP', 'Deep Learning'].map((tag, index) => (
                <span 
                  key={index} 
                  className="tech-chip animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              {/* Enhanced animated glowing orb */}
              <div className="w-96 h-96 rounded-full bg-gradient-to-br from-neuraxGreen/30 to-neuraxBlue-light/20 animate-pulse-glow shadow-[0_0_60px_rgba(57,255,108,0.4)]"></div>
              
              {/* Floating logo with enhanced effects */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative h-64 w-64 rounded-full border-[3px] border-neuraxGreen shadow-2xl shadow-neuraxGreen/30">
                  <img 
                    src="/lovable-uploads/0cb7aa7a-1399-4292-a5d2-38a26a42dd3f.png" 
                    alt="NeuraX AI" 
                    className="absolute inset-0 w-full h-full object-contain bg-neuraxDark p-5 rounded-full animate-float"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neuraxGreen/10 via-transparent to-neuraxBlue/10"></div>
                  
                  {/* Animated ripple effect */}
                  <div className="absolute -inset-2 rounded-full border-2 border-neuraxGreen/30 animate-ping opacity-75"></div>
                  <div className="absolute -inset-4 rounded-full border border-neuraxGreen/20 animate-ping opacity-50" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute -inset-8 rounded-full border border-neuraxGreen/10 animate-ping opacity-30" style={{ animationDuration: '4s' }}></div>
                </div>
                
                {/* Orbiting particles */}
                <div className="absolute inset-0 rounded-full border border-neuraxGreen/50 animate-spin-slow"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 w-6 h-6 rounded-full bg-neuraxGreen/80 blur-sm"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 w-5 h-5 rounded-full bg-neuraxGreen/80 blur-sm"></div>
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-3 w-7 h-7 rounded-full bg-neuraxGreen/60 blur-sm"></div>
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-3 w-4 h-4 rounded-full bg-neuraxGreen/70 blur-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - enhanced */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70">
        <span className="text-sm mb-2 text-neuraxGreen/80 animate-pulse">Scroll to explore</span>
        <div className="w-7 h-10 rounded-full border border-neuraxGreen/50 flex items-center justify-center p-1">
          <div className="w-1.5 h-1.5 rounded-full bg-neuraxGreen animate-scroll-down"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
