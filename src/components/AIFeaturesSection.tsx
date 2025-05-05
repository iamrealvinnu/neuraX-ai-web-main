
import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, MessageSquare, Network, Bot, Microchip } from 'lucide-react';
import DynamicAgentAvatar from './DynamicAgentAvatar';

const AIFeaturesSection = () => {
  const features = [
    {
      id: 'nlp',
      icon: <MessageSquare className="h-10 w-10 text-neuraxGreen" />,
      title: 'Natural Language Processing',
      description: 'Our advanced NLP engines can understand context, sentiment, and intent to provide human-like interactions with remarkable accuracy.',
      animation: 'fade-right',
      capabilities: ['Intent Recognition', 'Entity Extraction', 'Sentiment Analysis', 'Context Awareness']
    },
    {
      id: 'brain',
      icon: <BrainCircuit className="h-10 w-10 text-neuraxGreen" />,
      title: 'Neural Intelligence Engine',
      description: 'Powered by a sophisticated neural network architecture that mimics human cognitive processes for superior reasoning and pattern recognition.',
      animation: 'fade-up',
      capabilities: ['Deep Learning', 'Transfer Learning', 'Pattern Recognition', 'Adaptive Responses']
    },
    {
      id: 'agents',
      icon: <Bot className="h-10 w-10 text-neuraxGreen" />,
      title: 'Specialized AI Agents',
      description: 'Purpose-built AI agents with domain expertise in various fields, ready to assist with specialized knowledge and problem-solving skills.',
      animation: 'fade-down',
      capabilities: ['Domain Expertise', 'Personalized Assistance', 'Multi-Agent Collaboration', 'Continuous Learning']
    },
    {
      id: 'network',
      icon: <Network className="h-10 w-10 text-neuraxGreen" />,
      title: 'Adaptive Neural Framework',
      description: 'Our systems learn and evolve based on interactions, continuously improving to better serve your specific needs and preferences.',
      animation: 'fade-left',
      capabilities: ['Self-Improvement', 'Behavioral Adaptation', 'Preference Learning', 'Contextual Memory']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const agents = [
    { id: 'assistant', name: 'NeuraX Assistant', role: 'General Assistant' },
    { id: 'technical', name: 'TechMind', role: 'Technical Specialist' },
    { id: 'research', name: 'DataVoyager', role: 'Research Analyst' },
    { id: 'creative', name: 'CreativeNeuron', role: 'Creative Designer' },
    { id: 'philosophical', name: 'EthosAI', role: 'Philosophical Guide' },
    { id: 'multimodal', name: 'SynthAI', role: 'Multimodal Specialist' }
  ];

  return (
    <section id="ai-features" className="py-24 bg-neuraxDark relative overflow-hidden">
      {/* Neural network background */}
      <div className="absolute inset-0 opacity-30 z-0">
        <div className="absolute w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-neuraxGreen"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0.8, 1.5, 0.8],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i + 'line'}
              className="absolute h-px bg-neuraxGreen/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 200 + 50}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      <div className="neura-container relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold heading-gradient mb-4">
              Advanced AI Capabilities
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Experience the next generation of AI with our human-like agents and advanced neural network technologies.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="bg-neuraxBlue/30 rounded-xl p-6 border border-neuraxGreen/20 hover:border-neuraxGreen/50 transition-all duration-300"
              variants={itemVariants}
            >
              <div className="flex items-start">
                <div className="bg-neuraxBlue-dark p-3 rounded-lg mr-4">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 mb-4">{feature.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {feature.capabilities.map((capability, idx) => (
                      <span key={idx} className="px-3 py-1 bg-neuraxBlue-light/20 text-neuraxGreen text-xs rounded-full">
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive AI Agents Preview */}
        <motion.div 
          className="mt-20 bg-neuraxBlue-dark/50 rounded-2xl p-8 border border-neuraxGreen/30"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-3">Meet Our Intelligent AI Agents</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our specialized AI agents combine domain expertise with human-like interaction capabilities to provide personalized assistance.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {agents.map((agent, idx) => (
              <motion.div 
                key={idx}
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-3">
                  <DynamicAgentAvatar 
                    agentId={agent.id} 
                    size="lg" 
                  />
                </div>
                <h4 className="text-white font-medium">{agent.name}</h4>
                <p className="text-neuraxGreen text-sm">{agent.role}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <motion.button 
              className="px-6 py-3 bg-neuraxGreen text-neuraxDark rounded-full font-medium hover:bg-neuraxGreen/80 transition-colors flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const chatSection = document.querySelector('.fixed.bottom-8.right-8');
                if (chatSection) {
                  const chatButton = chatSection.querySelector('button');
                  chatButton?.click();
                }
              }}
            >
              <Microchip size={18} />
              Chat with Our AI Agents
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIFeaturesSection;
