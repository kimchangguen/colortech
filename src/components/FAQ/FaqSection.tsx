'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { faqData } from '@/data/faq';
import { Plus, Minus } from 'lucide-react';

const FaqSection = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    },
  };

  return (
    <section className="py-[160px] bg-[#F8F9FB]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-[80px]">
          <span className="block text-[#4F7EFF] text-[14px] font-semibold tracking-[2px] uppercase mb-4">
            FAQ
          </span>
          <h2 className="text-[32px] md:text-[48px] font-[800] text-[#111111] leading-[1.2] mb-6">
            자주 묻는 질문
          </h2>
          <p className="text-[16px] md:text-[18px] font-normal text-[#666666] leading-[1.8]">
            칼라테크OA 복합기·프린터 렌탈 서비스에 대해<br className="hidden md:block" />
            가장 많이 문의하시는 내용을 정리했습니다.
          </p>
        </div>

        {/* FAQ Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-[32px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div 
                key={faq.id} 
                variants={itemVariants}
                className="bg-white border border-[#ECECEC] rounded-[20px] p-[28px_30px] h-fit transition-all duration-[350ms] ease-out hover:-translate-y-[5px] hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)] cursor-pointer flex flex-col"
                onClick={() => toggleFaq(faq.id)}
              >
                {/* Question */}
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-[18px] md:text-[20px] font-bold leading-[1.5] text-[#111111]">
                    <span className="text-[#4F7EFF] mr-2">Q.</span>
                    {faq.question}
                  </h3>
                  <div className="shrink-0 text-[#111111] mt-1">
                    {isOpen ? <Minus size={24} /> : <Plus size={24} />}
                  </div>
                </div>

                {/* Answer Accordion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-[20px]">
                        <p className="text-[15px] md:text-[16px] font-normal leading-[1.9] text-[#666666] border-t border-[#ECECEC] pt-[20px]">
                          <span className="font-bold text-[#111111] mr-2">A.</span>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
