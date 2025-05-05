
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, CircleUserRound, Smile, Star } from 'lucide-react';

interface InteractiveAvatarProps {
  imageSrc?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const InteractiveAvatar = ({ imageSrc, size = "md", className = "" }: InteractiveAvatarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeIcon, setActiveIcon] = useState<'bot' | 'user' | 'smile' | 'star'>('bot');
  const [pulseColor, setPulseColor] = useState<string>('#39FF6C');

  // Determine avatar size
  const avatarSize = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16"
  }[size];

  // Cycle through icons and colors for visual interest
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon(prev => {
        if (prev === 'bot') return 'user';
        if (prev === 'user') return 'smile';
        if (prev === 'smile') return 'star';
        return 'bot';
      });
      
      // Cycle through brand colors
      setPulseColor(prev => {
        if (prev === '#39FF6C') return '#64B5F6';
        if (prev === '#64B5F6') return '#39FF6C';
        return '#39FF6C';
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const renderIcon = () => {
    const iconSize = size === "lg" ? 32 : size === "md" ? 24 : 16;
    
    switch(activeIcon) {
      case 'bot':
        return <Bot size={iconSize} className="text-neuraxGreen" />;
      case 'user':
        return <CircleUserRound size={iconSize} className="text-neuraxGreen" />;
      case 'smile':
        return <Smile size={iconSize} className="text-neuraxGreen" />;
      case 'star':
        return <Star size={iconSize} className="text-neuraxGreen" />;
    }
  };

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Neural network background */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        style={{
          width: '140%',
          height: '140%',
          top: '-20%',
          left: '-20%',
          background: `radial-gradient(circle at center, rgba(57, 255, 108, 0.2) 0%, rgba(0, 0, 0, 0) 70%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Animated neural connections */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-neuraxGreen"
          style={{
            top: `${30 + Math.random() * 40}%`,
            left: `${30 + Math.random() * 40}%`,
          }}
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.3, 0.8, 0.3],
            x: [0, Math.random() * 10 - 5, 0],
            y: [0, Math.random() * 10 - 5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      <Avatar className={`${avatarSize} border-2 border-neuraxGreen relative overflow-visible ${isHovered ? 'shadow-lg shadow-neuraxGreen/50' : ''} bg-neuraxDark z-10`}>
        {imageSrc ? (
          <AvatarImage src={imageSrc} alt="Profile" className="object-cover" />
        ) : (
          <AvatarImage 
            src="/lovable-uploads/0cb7aa7a-1399-4292-a5d2-38a26a42dd3f.png" 
            alt="NeuraX AI" 
            className="object-contain bg-neuraxDark p-1"
          />
        )}
        <AvatarFallback className="bg-neuraxBlue text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIcon}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {renderIcon()}
            </motion.div>
          </AnimatePresence>
        </AvatarFallback>
      </Avatar>
      
      {/* Pulsing ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: pulseColor }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.8, 0, 0.8],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Hover effects */}
      {isHovered && (
        <>
          <motion.div 
            className="absolute -inset-2 rounded-full border border-neuraxGreen opacity-70"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at center, ${pulseColor}50 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}
    </motion.div>
  );
};

export default InteractiveAvatar;
