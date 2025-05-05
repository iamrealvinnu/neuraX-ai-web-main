import React, { useState, useEffect } from 'react';
import { Menu, X, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InteractiveAvatar from './InteractiveAvatar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-neuraxDark/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="neura-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Updated with new design */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-neuraxGreen shadow-lg shadow-neuraxGreen/30 glow-border group-hover:shadow-neuraxGreen/60 transition-all duration-300">
              <img 
                src="/lovable-uploads/0cb7aa7a-1399-4292-a5d2-38a26a42dd3f.png" 
                alt="NeuraX AI Logo" 
                className="h-full w-full object-contain bg-neuraxDark p-1 transform group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-neuraxGreen/20 to-transparent group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neuraxGreen glow-text group-hover:from-neuraxGreen group-hover:to-white transition-all duration-300">NeuraX AI</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-white hover:text-neuraxGreen transition-colors">
              About
            </a>
            <a href="#services" className="text-white hover:text-neuraxGreen transition-colors">
              Solutions
            </a>
            <a href="#contact" className="text-white hover:text-neuraxGreen transition-colors">
              Contact
            </a>
            
            {/* Social Links */}
            <div className="flex items-center space-x-3 border-l border-white/20 pl-4">
              <a 
                href="https://www.linkedin.com/in/guptavinayc/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-neuraxGreen transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://github.com/iamrealvinnu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-neuraxGreen transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
            
            <Button className="bg-neuraxGreen hover:bg-neuraxGreen-dark text-neuraxDark font-medium btn-glow">
              Book a Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {/* Mobile Social Links */}
            <div className="flex items-center space-x-3 mr-4">
              <a 
                href="https://www.linkedin.com/in/guptavinayc/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-neuraxGreen transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://github.com/iamrealvinnu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-neuraxGreen transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
            
            <button
              className="text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 bg-neuraxBlue/80 glass-card rounded-lg animate-accordion-down">
            <div className="flex flex-col space-y-4 px-4">
              <a 
                href="#about" 
                className="text-white hover:text-neuraxGreen transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
              <a 
                href="#services" 
                className="text-white hover:text-neuraxGreen transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Solutions
              </a>
              <a 
                href="#contact" 
                className="text-white hover:text-neuraxGreen transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
              <Button 
                className="bg-neuraxGreen hover:bg-neuraxGreen-dark text-neuraxDark w-full font-medium"
                onClick={() => setIsOpen(false)}
              >
                Book a Consultation
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
