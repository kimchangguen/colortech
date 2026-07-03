'use client';

import React, { useState, useEffect } from 'react';
import HeroSlide from './HeroSlide';
import SlideIndicator from './SlideIndicator';

const slideData = [
  {
    id: "01",
    title: "칼라테크OA\n사무기기 렌탈\n복합기·프린터\n전문기업",
    description: "칼라테크OA에는 복합기, 프린터 등\n업무의 흐름을 지키는 신뢰 파트너입니다.\n스타트업부터 대기업까지 파트너사의\n업무환경을 최우선으로 생각합니다.",
    buttonText: "자세히보기",
    image: "/images/slide_01.png"
  },
  {
    id: "02",
    title: "캐논코리아,\n후지필름\n협력파트너\n고객맞춤컨설팅",
    description: "최신복합기 장비 대량보유\n당일설치 / AS\n소모품 무상 제공\n실시간 1:1 원격지원 서비스",
    buttonText: "자세히보기",
    image: "/images/slide_02.png"
  },
  {
    id: "03",
    title: "재계약률 1위\n긴급출동\n전국전문팀",
    description: "다년간 축적된 현장 경험과 전문 기술을 보유\n신속한 문제해결로 전문팀 긴급관리\n분야별 10년이상의 전문가 보유\n파트너사 장기점검 프로세스",
    buttonText: "자세히보기",
    image: "/images/slide_03.png"
  },
  {
    id: "04",
    title: "최신 새장비\n기업맞춤제안\n1:1무료상담",
    description: "칼라테크OA만의 상생철학\n신제품뿐만 아니라 중고부터 리퍼까지\n고객상황에 맞는 맞춤 솔루션\n고객만족 최우선",
    buttonText: "자세히보기",
    image: "/images/slide_04.png"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideData.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      className="relative w-full bg-white pt-20 overflow-hidden" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[1440px] mx-auto w-full h-[auto] md:h-[760px] relative px-4 sm:px-6 lg:px-8 py-10 md:py-0 flex flex-col md:flex-row items-center">
        
        {slideData.map((slide, index) => (
          <HeroSlide 
            key={slide.id} 
            slide={slide} 
            isActive={index === currentSlide} 
          />
        ))}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-12 md:left-8 md:translate-x-0 z-20">
          <SlideIndicator 
            total={slideData.length} 
            current={currentSlide} 
            onChange={setCurrentSlide} 
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
