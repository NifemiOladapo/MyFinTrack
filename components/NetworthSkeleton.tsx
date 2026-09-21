export default function NetWorthSkeleton() {
  return (
    <div className="flex-1 py-5 ">
      <div className="mb-6 text-sm">Net worth, last 30 days</div>

      <div className="flex gap-2">
        {/* Y axis */}
        <div className="flex h-42.5 flex-col justify-between">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="h-3 w-8 animate-pulse rounded bg-gray-700"
            />
          ))}
        </div>

        {/* Chart */}
        <div className="relative h-[170px] flex-1">
          {/* Grid */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="h-px w-full bg-gray-700" />
            ))}
          </div>

          {/* Fake line */}
          <svg
            className="absolute inset-0 h-full w-full animate-pulse"
            viewBox="0 0 500 170"
            preserveAspectRatio="none"
          >
            <path
              d="M0 140
                 C20 130, 30 150, 50 125
                 C70 105, 80 130, 100 110
                 C120 90, 130 115, 150 95
                 C170 75, 185 100, 205 80
                 C225 60, 240 85, 260 65
                 C280 45, 300 70, 320 50
                 C340 30, 360 55, 380 35
                 C400 20, 420 40, 440 25
                 C460 15, 480 30, 500 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-gray-700"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
