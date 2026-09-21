import { getAssets, getPrices } from "@/app/page";
import { currency } from "./HoldingsTable";

export default async function HoldingsHeader() {
  const holdings = await getAssets();

  const prices = await getPrices();

  const totalValue = holdings.reduce((total, holding) => {
    const price = prices[holding.name.toLowerCase()]?.usd ?? 0;

    return total + holding.quantity * price;
  }, 0);

  return (
    <div className="bg-neutral-950  py-6">
      <div className="flex gap-16 justify-between">
        <div>
          <p className="text-sm text-neutral-400">Total value</p>
          <p className="mt-1 text-xl sm:text-3xl font-semibold text-white">
            {currency.format(totalValue)}
          </p>
        </div>
        <div>
          <p className="text-sm text-neutral-400">Today</p>
          <p className="mt-1 text-xl sm:text-3xl font-semibold text-green-500">
            +$582
          </p>
        </div>
        <div>
          <p className="text-sm text-neutral-400">Holdings</p>
          <p className="mt-1 text-xl sm:text-3xl font-semibold text-white">
            {holdings.length}
          </p>
        </div>
      </div>
    </div>
  );
}
