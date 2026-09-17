import { getAssets, getPrices } from "@/app/page";

const ASSET_COLORS: Record<string, string> = {
  BTC: "#3b82f6", // blue-500
  ETH: "#f97316", // orange-500
  AAPL: "#10b981", // emerald-500
};

const HoldingsAllocation = async () => {
  const holdings = await getAssets();

  const prices = await getPrices(
    holdings.map((holding) => holding.name.toLowerCase()),
  );

  const totalValue = holdings.reduce((total, holding) => {
    const price = prices[holding.name.toLowerCase()]?.usd ?? 0;

    return total + holding.quantity * price;
  }, 0);

  const allocations = holdings.map((holding) => {
    const price = prices[holding.name.toLowerCase()]?.usd ?? 0;
    const value = holding.quantity * price;
    const percentage = totalValue === 0 ? 0 : (value / totalValue) * 100;

    return {
      symbol: holding.symbol,
      name: holding.name,
      percentage,
      color: ASSET_COLORS[holding.symbol],
    };
  });

  let cumulative = 0;
  const gradientStops = allocations
    .map(({ color, percentage }) => {
      const start = cumulative;
      cumulative += percentage;
      return `${color} ${start}% ${cumulative}%`;
    })
    .join(", ");

  return (
    <div className=" bg-neutral-950 p-5 flex-1">
      <h2 className="mb-6 text-sm font-medium text-neutral-300">Allocation</h2>

      <div className="flex flex-col items-center gap-6">
        <div
          className="h-40 w-40 rounded-full"
          style={{
            background: `conic-gradient(${gradientStops})`,
            WebkitMask:
              "radial-gradient(farthest-side, transparent 60%, black 61%)",
            mask: "radial-gradient(farthest-side, transparent 60%, black 61%)",
          }}
        />

        <ul className="w-full space-y-2">
          {allocations.map((allocation) => (
            <li
              key={allocation.symbol}
              className="flex items-center gap-2 text-sm text-neutral-300"
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: allocation.color }}
              />
              {allocation.name} {Math.round(allocation.percentage)}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HoldingsAllocation;
