export default function HoldingsHeaderSkeleton() {
  return (
    <div className="bg-neutral-950  py-6">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-neutral-400">Total value</p>
          <div className="mt-1 h-9 w-25 sm:w-32 animate-pulse rounded bg-neutral-800" />
        </div>
        <div>
          <p className="text-sm text-neutral-400">Today</p>
          <div className="mt-1 h-9 w-20 animate-pulse rounded bg-neutral-800" />
        </div>
        <div>
          <p className="text-sm text-neutral-400">Holdings</p>
          <div className="mt-1 h-9 w-6 animate-pulse rounded bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}
