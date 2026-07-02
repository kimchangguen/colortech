import React from 'react';

interface SlideIndicatorProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

const SlideIndicator: React.FC<SlideIndicatorProps> = ({ total, current, onChange }) => {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            current === index 
              ? 'bg-[#111111] w-6' 
              : 'bg-[#cccccc] hover:bg-gray-400'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default SlideIndicator;
