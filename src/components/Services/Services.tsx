import React from 'react';
import Image from 'next/image';

const services = [
  {
    id: '01',
    title: '기업 맞춤 컨설팅',
    description: '기업 규모와 업무환경을 분석하여\n복합기, 프린터, 스캐너 등\n가장 효율적인 장비를 제안합니다.',
    image: '/images/service_01.png',
  },
  {
    id: '02',
    title: '신속한 설치·유지관리',
    description: '전문 엔지니어가\n설치부터 초기 세팅까지 진행하며\n\n정기점검과 유지보수로\n안정적인 업무환경을 제공합니다.',
    image: '/images/service_02.png',
  },
  {
    id: '03',
    title: '실시간 기술지원',
    description: '장비 장애 발생 시\n원격지원과 현장출동을 통해\n\n업무 중단 시간을\n최소화합니다.',
    image: '/images/service_03.png',
  },
];

const Services = () => {
  return (
    <section className="py-24 md:py-32 bg-[#F9FAFB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[#0056D2] font-semibold tracking-wider uppercase text-sm mb-4 block">
            What We Do
          </span>
          <h2 className="text-[32px] md:text-[44px] font-bold text-[#111111] leading-[1.3] mb-6 whitespace-pre-line">
            {'칼라테크OA만의\n기업 맞춤 솔루션'}
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#555555] leading-relaxed whitespace-pre-line">
            {'기업의 업무환경에 최적화된 복합기·프린터 솔루션부터\n설치, 유지관리, 기술지원까지 One-Stop 서비스를 제공합니다.'}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service) => (
            <div 
              key={service.id}
              className="group bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full h-[260px] md:h-[300px] overflow-hidden bg-gray-200">
                <Image 
                  src={service.image} 
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              
              {/* Content Container */}
              <div className="p-8 md:p-10 flex-grow flex flex-col relative bg-white">
                <span className="text-[#0056D2] font-bold text-lg mb-4 block">
                  {service.id}
                </span>
                <h3 className="text-[22px] md:text-2xl font-bold text-[#111111] mb-5">
                  {service.title}
                </h3>
                <p className="text-[15px] md:text-[16px] text-[#555555] leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
