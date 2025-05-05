
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  bgClass?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  icon: Icon,
  features,
  bgClass = "bg-neuraxBlue/30"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`glass-card overflow-hidden rounded-xl ${bgClass} hover:shadow-xl transition-all duration-500 animate-scale-in`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transform: isHovered ? 'translateY(-8px)' : 'translateY(0)' }}
    >
      <div className="p-6 md:p-8 relative">
        {/* Subtle background glow that appears on hover */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-neuraxGreen/10 to-transparent rounded-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        ></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className={`bg-neuraxBlue-light/50 p-3 rounded-lg transition-all duration-300 ${isHovered ? 'bg-neuraxGreen/30' : ''}`}>
              <Icon className={`text-neuraxGreen transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
          
          <p className="text-gray-300 mb-6">{description}</p>
          
          <div className="mb-8">
            <h4 className="text-sm font-medium text-white/70 uppercase tracking-wider mb-3">Key Features</h4>
            <ul className="space-y-2.5">
              {features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-start transition-all duration-300"
                  style={{ 
                    transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  <span className={`inline-block w-1.5 h-1.5 rounded-full bg-neuraxGreen mt-2 mr-2 transition-all duration-300 ${isHovered ? 'w-2 h-2 bg-neuraxGreen' : ''}`}></span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={`flex space-x-3 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-90'}`}>
            <Button 
              variant="outline" 
              className="border-neuraxGreen/50 text-neuraxGreen hover:bg-neuraxGreen/10"
            >
              Learn More
            </Button>
            <Button 
              className={`bg-neuraxGreen hover:bg-neuraxGreen-dark text-neuraxDark ${isHovered ? 'shadow-lg shadow-neuraxGreen/20' : ''}`}
            >
              Demo
            </Button>
          </div>
          
          {/* Animated corner accent */}
          <div 
            className={`absolute top-0 right-0 w-16 h-16 overflow-hidden transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-neuraxGreen/10 transform rotate-45 translate-x-8 -translate-y-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
