import { FileText, MessageCircle, Phone } from 'lucide-react';

const itemClass = 'flex h-14 w-14 items-center justify-center rounded-full border border-[#D5D9E2] bg-white text-[#15213A] shadow-[0_6px_20px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5 hover:bg-[#15213A] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#315EFB]';

export default function FloatingContact() {
  return (
    <aside aria-label="빠른 문의" className="fixed left-4 right-auto bottom-5 z-40 flex flex-col gap-3 md:left-7 md:right-auto md:bottom-8">
      <a href="tel:027191644" aria-label="전화 문의 02-719-1644" title="전화 문의" className={itemClass}><Phone size={24} aria-hidden="true" /></a>
      <button type="button" aria-label="카카오톡 문의" title="카카오톡 문의" className={itemClass}><MessageCircle size={25} aria-hidden="true" /></button>
      <a href="/#company-footer" aria-label="제안서 및 기업정보" title="제안서 및 기업정보" className={itemClass}><FileText size={24} aria-hidden="true" /></a>
    </aside>
  );
}
