import React from 'react';
import { Linkedin, Github, Mail, ArrowUp, Phone } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neuraxBlue-dark pt-12 pb-6">
      <div className="neura-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-neuraxGreen glow-border">
                <img 
                  src="/lovable-uploads/0cb7aa7a-1399-4292-a5d2-38a26a42dd3f.png" 
                  alt="NeuraX AI Logo" 
                  className="h-full w-full object-contain bg-neuraxDark p-1 transform hover:scale-110 transition-all duration-300"
                />
              </div>
              <span className="text-xl font-bold text-white">NeuraX AI</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Revolutionizing education and healthcare with culturally intelligent, 
              explainable AI solutions for startups and SMEs.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/guptavinayc/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neuraxGreen transition-colors transform hover:scale-110"
              >
                <Linkedin size={22} />
              </a>
              <a 
                href="https://github.com/iamrealvinnu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neuraxGreen transition-colors transform hover:scale-110"
              >
                <Github size={22} />
              </a>
              <a 
                href="mailto:gupta.vinayC@gmail.com" 
                className="text-gray-400 hover:text-neuraxGreen transition-colors transform hover:scale-110"
              >
                <Mail size={22} />
              </a>
              <a 
                href="tel:+917738927663" 
                className="text-gray-400 hover:text-neuraxGreen transition-colors transform hover:scale-110"
              >
                <Phone size={22} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-400 hover:text-neuraxGreen transition-colors">Neural Intelligence Engine</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-neuraxGreen transition-colors">AI Personalization Framework</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-neuraxGreen transition-colors">DevAI Platform</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-neuraxGreen transition-colors">Custom AI Solutions</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-neuraxGreen transition-colors">About</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-neuraxGreen transition-colors">Services</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-neuraxGreen transition-colors">Contact</a>
              </li>
              <li>
                <div className="flex space-x-3">
                  <a 
                    href="https://www.linkedin.com/in/guptavinayc/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-neuraxGreen transition-colors"
                  >
                    LinkedIn
                  </a>
                  <span className="text-gray-600">|</span>
                  <a 
                    href="https://github.com/iamrealvinnu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-neuraxGreen transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} NeuraX AI. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-neuraxGreen hover:text-neuraxGreen-light transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
