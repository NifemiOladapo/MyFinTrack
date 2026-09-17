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

export default function HoldingsTableSkeleton({
  rows = 2,
}: HoldingsTableSkeletonProps) {
  return (
    <section className="rounded-xl bg-neutral-950 p-5 border border-neutral-800">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-neutral-300">Holdings</h2>
        <button
          type="button"
          disabled
          className="rounded-lg border border-neutral-700 px-3 py-1.5 text-sm text-neutral-200 opacity-50"
        >
          + Add holding
        </button>
      </div>

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
    </section>
  );
}
