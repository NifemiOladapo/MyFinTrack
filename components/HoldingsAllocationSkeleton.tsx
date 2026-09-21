interface HoldingsAllocationSkeletonProps {
  count?: number;
}

export default function HoldingsAllocationSkeleton({
  count = 3,
}: HoldingsAllocationSkeletonProps) {
  return (
    <div className="flex-1 bg-neutral-950 py-5">
      <h2 className="mb-6 text-sm font-medium text-neutral-300">Allocation</h2>

      <div className="flex flex-col items-center gap-6">
        <div className="h-40 w-40 animate-pulse rounded-full border-14 border-neutral-800" />

        <ul className="w-full space-y-2">
          {Array.from({ length: count }).map((_, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-sm bg-neutral-800" />
              <span className="h-4 w-24 animate-pulse rounded bg-neutral-800" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
