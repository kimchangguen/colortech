import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="company-footer" className="bg-[#111827] text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[220px_1fr] md:gap-16">
          <div>
            <Link href="/#company-info" className="text-2xl font-bold tracking-tight">COLORTEK</Link>
            <p className="mt-3 text-sm text-gray-400">기업 업무환경의 든든한 파트너</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-6">기업정보</h2>
            <div className="space-y-3 text-[14px] md:text-[15px] leading-relaxed text-gray-300">
              <p className="font-semibold text-white">(주)칼라테크오에이</p>
              <p>대표자 : 정진석</p>
              <p>사업자 등록번호 : 107-88-38218</p>
              <p>본사 : 서울시 영등포구 당산로 41길 11, SK V1 W동 219호</p>
              <p>서비스센터 : 서울시 영등포구 선유로 130 에이스하이테크시티3차 B101호</p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-gray-500">© {new Date().getFullYear()} COLORTEK OA. All rights reserved.</div>
      </div>
    </footer>
  );
}
