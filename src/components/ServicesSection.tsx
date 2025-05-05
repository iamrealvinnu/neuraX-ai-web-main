
import React from 'react';
import ProjectCard from './ProjectCard';
import { Brain, Zap, Code } from 'lucide-react';

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-neura-gradient">
      <div className="neura-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold heading-gradient mb-4">
            Our AI Solutions
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Cutting-edge AI tools and platforms designed to transform businesses, enhance productivity, and drive innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard 
            title="Neural Intelligence Engine"
            description="Our flagship AI engine combines deep learning and neural networks to deliver intelligent solutions for enterprise applications and decision-making systems."
            icon={Brain}
            features={[
              "Advanced machine learning models",
              "Real-time data processing",
              "Pattern recognition systems",
              "Customizable neural architectures"
            ]}
            bgClass="bg-neuraxBlue/40"
          />
          
          <ProjectCard 
            title="AI Personalization Framework"
            description="A sophisticated framework that adapts to user behaviors and preferences, creating personalized experiences across digital platforms and services."
            icon={Zap}
            features={[
              "Behavioral analysis algorithms",
              "Dynamic content adaptation",
              "Cross-platform personalization",
              "Privacy-first design approach"
            ]}
            bgClass="bg-neuraxBlue-light/30"
          />
          
          <ProjectCard 
            title="DevAI Platform"
            description="Accelerate software development with our AI-powered coding assistant, code optimization tools, and automated testing frameworks."
            icon={Code}
            features={[
              "Intelligent code generation",
              "Bug detection and fixes",
              "Performance optimization",
              "Cross-platform compatibility"
            ]}
            bgClass="bg-neuraxBlue/40"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
