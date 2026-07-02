export default function BlogLoading() {
  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="h-12 w-48 bg-gray-200 rounded-md animate-pulse mb-4"></div>
          <div className="h-6 w-96 bg-gray-100 rounded-md animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-[24px] border border-gray-100 overflow-hidden h-[450px] animate-pulse">
              <div className="w-full h-56 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-6 w-2/3 bg-gray-200 rounded mb-6"></div>
                <div className="h-4 w-full bg-gray-100 rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-100 rounded mb-2"></div>
                <div className="h-4 w-4/5 bg-gray-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
