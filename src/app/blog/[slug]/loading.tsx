export default function BlogDetailLoading() {
  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center flex flex-col items-center">
          <div className="h-4 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="h-12 w-full max-w-xl bg-gray-200 rounded mb-8 animate-pulse"></div>
          <div className="w-full aspect-[16/9] bg-gray-200 rounded-[24px] animate-pulse mb-12"></div>
        </div>
        
        <div className="space-y-4 animate-pulse">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded mt-8"></div>
          <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
