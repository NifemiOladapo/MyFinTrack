interface HoldingsTableSkeletonProps {
  rows?: number;
}

function ColumnHeader({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`pb-3 text-xs font-normal text-neutral-500 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function HoldingRowSkeleton() {
  return (
    <tr className="border-t border-neutral-800">
      <td className="py-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="h-6 w-6 shrink-0 animate-pulse rounded-full bg-neutral-800"
          />
          <span className="h-4 w-28 animate-pulse rounded bg-neutral-800" />
        </div>
      </td>
      <td className="py-3 text-right">
        <span className="inline-block h-4 w-8 animate-pulse rounded bg-neutral-800" />
      </td>
      <td className="py-3 text-right">
        <span className="inline-block h-4 w-16 animate-pulse rounded bg-neutral-800" />
      </td>
      <td className="py-3 text-right">
        <span className="inline-block h-4 w-20 animate-pulse rounded bg-neutral-800" />
      </td>
    </tr>
  );
}

function HoldingCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-between gap-3 border-t border-neutral-800 py-3.5 first:border-t-0"
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-neutral-800" />
        <div className="flex flex-col gap-1.5">
          <span className="h-4 w-24 animate-pulse rounded bg-neutral-800" />
          <span className="h-3 w-14 animate-pulse rounded bg-neutral-800" />
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <span className="h-4 w-16 animate-pulse rounded bg-neutral-800" />
        <span className="h-3 w-12 animate-pulse rounded bg-neutral-800" />
      </div>
    </div>
  );
}

export default function HoldingsTableSkeleton({
  rows = 2,
}: HoldingsTableSkeletonProps) {
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-neutral-300">Holdings</h2>
        <button
          type="button"
          disabled
          className="rounded-lg border border-neutral-700 px-3 py-1.5 text-sm text-neutral-200 opacity-50"
        >
          <span className="hidden sm:inline">+ Add holding</span>
          <span className="sm:hidden">+ Add holding</span>
        </button>
      </div>

      {/* Table — sm and up */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <ColumnHeader>Asset</ColumnHeader>
              <ColumnHeader align="right">Qty</ColumnHeader>
              <ColumnHeader align="right">Price</ColumnHeader>
              <ColumnHeader align="right">Value</ColumnHeader>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, i) => (
              <HoldingRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Stacked cards — below sm */}
      <div className="sm:hidden">
        {Array.from({ length: rows }).map((_, i) => (
          <HoldingCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}