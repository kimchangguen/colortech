'use client';

export default function BlogDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="pt-32 pb-20 bg-white min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-[#111111] mb-4">상세 페이지를 불러오는 중 오류가 발생했습니다.</h2>
      <p className="text-[#555555] mb-8">{error.message || "잠시 후 다시 시도해주세요."}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-[#111111] text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
      >
        다시 시도
      </button>
    </div>
  );
}
