
import React from 'react';
import { User, Code, Database, Globe } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-neuraxDark">
      <div className="neura-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold heading-gradient mb-4">
            About NeuraX AI
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Founded in 2025, NeuraX AI is a remote-first AI consulting firm delivering innovative solutions for education and healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="glass-card p-6 md:p-8 rounded-2xl glow-border">
              <h3 className="text-2xl font-semibold mb-4 text-white">Our Founder</h3>
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-neuraxBlue-light rounded-full p-2">
                  <User size={28} className="text-neuraxGreen" />
                </div>
                <div>
                  <h4 className="text-xl font-medium text-white">Vinay Gupta</h4>
                  <p className="text-gray-400">Founder & AI Consultant</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                AI developer and data scientist with expertise in Python, TensorFlow, PyTorch, React.js, 
                SQL Server, NLP, and computer vision.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-28 text-gray-400">Education:</div>
                  <div className="text-white">MSIT (91%), BSc Data Science (91.2%)</div>
                </div>
                <div className="flex items-center">
                  <div className="w-28 text-gray-400">Experience:</div>
                  <div className="text-white">Software Developer Intern, GDI Nexus (2024-2025)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-white">Our Expertise</h3>
            
            <div className="glass-card p-6 rounded-xl hover:border-neuraxGreen/50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="bg-neuraxBlue-light rounded-full p-2 mt-1">
                  <Code size={24} className="text-neuraxGreen" />
                </div>
                <div>
                  <h4 className="text-xl font-medium text-white">Ethical AI Solutions</h4>
                  <p className="text-gray-300 mt-2">
                    We develop transparent, explainable AI solutions that respect privacy and cultural context.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl hover:border-neuraxGreen/50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="bg-neuraxBlue-light rounded-full p-2 mt-1">
                  <Database size={24} className="text-neuraxGreen" />
                </div>
                <div>
                  <h4 className="text-xl font-medium text-white">NLP & Computer Vision</h4>
                  <p className="text-gray-300 mt-2">
                    Specializing in natural language processing and computer vision for under-resourced languages.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl hover:border-neuraxGreen/50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="bg-neuraxBlue-light rounded-full p-2 mt-1">
                  <Globe size={24} className="text-neuraxGreen" />
                </div>
                <div>
                  <h4 className="text-xl font-medium text-white">Global Reach</h4>
                  <p className="text-gray-300 mt-2">
                    Working with clients in India, Korea, and beyond to bring AI solutions to underserved markets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
