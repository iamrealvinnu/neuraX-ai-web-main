
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Brain, Network, Microchip, MessageSquare, Star } from 'lucide-react';

type DynamicAgentAvatarProps = {
  agentId: string;
  size?: 'sm' | 'md' | 'lg';
  animationSpeed?: 'slow' | 'normal' | 'fast';
  glowColor?: string;
  primaryColor?: string;
};

const DynamicAgentAvatar: React.FC<DynamicAgentAvatarProps> = ({
  agentId,
  size = 'md',
  animationSpeed = 'normal',
  glowColor = '#0aff9d',
  primaryColor = '#0F1429'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Get dimensions based on size
  const getDimensions = () => {
    switch (size) {
      case 'sm': return 32;
      case 'lg': return 80;
      case 'md':
      default: return 48;
    }
  };
  
  const dimensions = getDimensions();
  
  // Get animation speed multiplier
  const getSpeedMultiplier = () => {
    switch (animationSpeed) {
      case 'slow': return 0.5;
      case 'fast': return 2;
      case 'normal':
      default: return 1;
    }
  };
  
  const speedMultiplier = getSpeedMultiplier();
  
  // Use the agentId to generate a consistent pattern
  const seedFromAgentId = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  };
  
  const initialSeed = seedFromAgentId(agentId);
  
  // Function to draw neural patterns on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas resolution for retina displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions * dpr;
    canvas.height = dimensions * dpr;
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, dimensions, dimensions);
    
    // Fill background
    ctx.fillStyle = primaryColor;
    ctx.fillRect(0, 0, dimensions, dimensions);
    
    // Generate nodes and connections based on agent ID
    const rng = () => {
      // Simple pseudo-random number generator using a mutable seed
      // We need to use let here as we're modifying the seedValue
      let seedValue = rng.seedValue;
      seedValue = (seedValue * 9301 + 49297) % 233280;
      rng.seedValue = seedValue; // Store the updated seed
      return seedValue / 233280;
    };
    // Initialize the seed value as a property of the function
    rng.seedValue = initialSeed;
    
    // Draw neural network nodes
    const numNodes = 4 + Math.floor(rng() * 4);
    const nodes: {x: number, y: number, size: number}[] = [];
    
    for (let i = 0; i < numNodes; i++) {
      const margin = dimensions * 0.15;
      const x = margin + (dimensions - 2 * margin) * rng();
      const y = margin + (dimensions - 2 * margin) * rng();
      const size = 1 + rng() * 3;
      nodes.push({ x, y, size });
      
      // Draw node
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = glowColor;
      ctx.fill();
      
      // Add glow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
      gradient.addColorStop(0, `${glowColor}80`);
      gradient.addColorStop(1, `${glowColor}00`);
      ctx.beginPath();
      ctx.arc(x, y, size * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    // Draw connections between nodes
    ctx.lineWidth = 0.5;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (rng() > 0.6) continue; // Skip some connections
        
        const n1 = nodes[i];
        const n2 = nodes[j];
        
        // Calculate distance for alpha
        const dist = Math.sqrt(Math.pow(n2.x - n1.x, 2) + Math.pow(n2.y - n1.y, 2));
        const alpha = Math.max(0, 1 - dist / (dimensions * 0.8));
        
        // Draw connection
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.strokeStyle = `${glowColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.stroke();
      }
    }
    
    // Add circuit-like patterns unique to each agent
    const patternSeed = initialSeed % 4;
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = `${glowColor}60`;
    
    if (patternSeed === 0) {
      // Circular pattern
      for (let r = dimensions * 0.2; r < dimensions * 0.5; r += dimensions * 0.1) {
        ctx.beginPath();
        ctx.arc(dimensions / 2, dimensions / 2, r, 0, Math.PI * 2 * rng());
        ctx.stroke();
      }
    } else if (patternSeed === 1) {
      // Grid pattern
      const gridSize = 4 + Math.floor(rng() * 3);
      const cellSize = dimensions / gridSize;
      
      for (let i = 0; i <= gridSize; i++) {
        if (rng() > 0.3) {
          ctx.beginPath();
          ctx.moveTo(0, i * cellSize);
          ctx.lineTo(dimensions * rng(), i * cellSize);
          ctx.stroke();
        }
        
        if (rng() > 0.3) {
          ctx.beginPath();
          ctx.moveTo(i * cellSize, 0);
          ctx.lineTo(i * cellSize, dimensions * rng());
          ctx.stroke();
        }
      }
    } else if (patternSeed === 2) {
      // Hexagonal pattern
      const centerX = dimensions / 2;
      const centerY = dimensions / 2;
      const hexRadius = dimensions * 0.3;
      
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const x = centerX + hexRadius * Math.cos(angle);
        const y = centerY + hexRadius * Math.sin(angle);
        
        if (i === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
      
      // Add inner details
      for (let i = 0; i < 3; i++) {
        const angle1 = (Math.PI / 3) * i;
        const angle2 = (Math.PI / 3) * (i + 3);
        ctx.beginPath();
        ctx.moveTo(
          centerX + hexRadius * Math.cos(angle1),
          centerY + hexRadius * Math.sin(angle1)
        );
        ctx.lineTo(
          centerX + hexRadius * Math.cos(angle2),
          centerY + hexRadius * Math.sin(angle2)
        );
        ctx.stroke();
      }
    } else {
      // Spiral pattern
      const centerX = dimensions / 2;
      const centerY = dimensions / 2;
      let radius = 2;
      let angle = 0;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      
      for (let i = 0; i < 50; i++) {
        angle += 0.2;
        radius += 0.4;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        if (x < 0 || y < 0 || x > dimensions || y > dimensions) break;
        
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    
  }, [agentId, dimensions, glowColor, primaryColor, initialSeed]);

  // Get the appropriate icon based on agent ID
  const getAgentIcon = () => {
    // Deterministically select an icon based on agent ID
    const iconIndex = initialSeed % 5;
    
    switch (iconIndex) {
      case 0: return <Bot className="text-neuraxGreen" size={dimensions * 0.4} />;
      case 1: return <Brain className="text-neuraxGreen" size={dimensions * 0.4} />;
      case 2: return <Network className="text-neuraxGreen" size={dimensions * 0.4} />;
      case 3: return <Microchip className="text-neuraxGreen" size={dimensions * 0.4} />;
      case 4: return <MessageSquare className="text-neuraxGreen" size={dimensions * 0.4} />;
      default: return <Star className="text-neuraxGreen" size={dimensions * 0.4} />;
    }
  };

  return (
    <div className="relative" style={{ width: dimensions, height: dimensions }}>
      {/* Canvas layer for neural patterns */}
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: dimensions, 
          height: dimensions,
          borderRadius: '50%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
      
      {/* Animated pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-neuraxGreen"
        initial={{ opacity: 0.3, scale: 0.8 }}
        animate={{ 
          opacity: [0.2, 0.5, 0.2], 
          scale: [0.85, 1.05, 0.85] 
        }}
        transition={{ 
          duration: 3 / speedMultiplier, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      
      {/* Centered icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        {getAgentIcon()}
      </div>
    </div>
  );
};

export default DynamicAgentAvatar;
