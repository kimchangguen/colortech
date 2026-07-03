import React from 'react';
import { motion, type Variants, type Easing } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface SlideProps {
  slide: {
    id: string;
    title: string;
    description: string;
    buttonText: string;
    image: string;
  };
  isActive: boolean;
}

const HeroSlide: React.FC<SlideProps> = ({ slide, isActive }) => {
  // Animation settings based on user request
  const easing: Easing = [0.4, 0, 0.2, 1];
  const transitionDuration = 0.5;

  const contentVariants: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: transitionDuration, 
        ease: easing,
        staggerChildren: 0.1,
        delayChildren: 0.15
      } 
    },
    exit: { opacity: 0, x: -40, transition: { duration: transitionDuration, ease: easing } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 1.02, x: 40 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: transitionDuration, ease: easing } },
    exit: { opacity: 0, scale: 1.02, x: -40, transition: { duration: transitionDuration, ease: easing } }
  };

  return (
    <div
      className={`absolute inset-0 flex flex-col md:flex-row px-4 sm:px-6 lg:px-8 py-10 md:py-0 w-full h-full max-w-[1440px] mx-auto items-center ${
        isActive ? 'z-10' : 'z-0 pointer-events-none'
      }`}
    >
      {/* Text Area (35% on Desktop, adjusted for tablet/mobile) */}
      <motion.div 
        className="w-full md:w-[35%] lg:w-[35%] flex flex-col justify-center h-full order-2 md:order-1 pt-8 md:pt-0"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={contentVariants}
      >
        <div className="flex items-start">
          <motion.div variants={itemVariants} className="hidden md:flex flex-col items-center mr-8 h-full min-h-[200px]">
            <span className="text-[32px] font-light text-[#111111] leading-none mb-4">{slide.id}</span>
            <div className="w-[1px] h-32 bg-[#111111]/20"></div>
          </motion.div>
          
          <div className="flex-1">
            <motion.div variants={itemVariants} className="md:hidden mb-4">
               <span className="text-xl font-medium text-[#111111]">{slide.id}</span>
            </motion.div>
            <motion.h2 
              variants={itemVariants}
              className="text-[32px] md:text-[44px] lg:text-[56px] font-bold text-[#111111] leading-[1.2] mb-6 whitespace-pre-line tracking-tight"
            >
              {slide.title}
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-[15px] md:text-[16px] text-[#555555] leading-relaxed mb-10 whitespace-pre-line"
            >
              {slide.description}
            </motion.p>
            <motion.div variants={itemVariants}>
              <button className="flex items-center gap-2 bg-[#111111] text-white px-7 py-3.5 rounded-full text-[15px] font-medium hover:bg-gray-800 transition-colors group">
                {slide.buttonText}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Image Area (65% on Desktop) */}
      <motion.div 
        className="w-full md:w-[65%] lg:w-[65%] h-[300px] md:h-[calc(100%-80px)] order-1 md:order-2 flex items-center justify-end"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={imageVariants}
      >
        <div className="relative w-full h-full md:pl-8 rounded-[24px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={slide.image} 
            alt={slide.title.replace(/\n/g, ' ')}
            className="w-full h-full object-cover rounded-[24px]"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSlide;
