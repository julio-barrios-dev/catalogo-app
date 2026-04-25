export default function CatalogoSkeleton() {
  return (
    <div className="min-h-dvh bg-white animate-pulse">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-5 space-y-2">
        <div className="h-7 w-32 bg-gray-200 rounded-lg" />
        <div className="h-4 w-56 bg-gray-100 rounded-lg" />
      </div>

      {/* Filter bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm px-4 py-3 space-y-2">
        <div className="flex gap-2">
          {[80, 100, 90].map((w, i) => (
            <div key={i} className="h-11 rounded-full bg-gray-100" style={{ width: w }} />
          ))}
        </div>
        <div className="flex gap-2">
          {[70, 90, 80].map((w, i) => (
            <div key={i} className="h-9 rounded-full bg-gray-100" style={{ width: w }} />
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-4 max-w-6xl mx-auto">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden border-2 border-transparent shadow">
            <div className="aspect-square bg-gray-100" />
            <div className="p-2 space-y-1.5">
              <div className="h-3 w-20 bg-gray-100 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
