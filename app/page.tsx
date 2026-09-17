import { Holding } from "@/components/HoldingsTable";
import Home from "@/components/Home";
import { getCryptoPrices } from "@/lib";
import { cache } from "react";

export const STALE_HOLDINGS: Holding[] = [
  { id: "btc", symbol: "BTC", name: "Bitcoin", quantity: 5 },
  { id: "eth", symbol: "ETH", name: "Ethereum", quantity: 100 },
  // { id: "aapl", symbol: "AAPL", name: "Apple", quantity: 32 },
];

export const getAssets = cache(async () => {
  await new Promise((res) => setTimeout(res, 3000));
  return STALE_HOLDINGS;
});

export const getPrices = cache(async (assets: string[]) => {
  const prices = await getCryptoPrices(assets);
  return prices;
});

export default async function page() {
  return (
    <div className="flex">
      <Home />
    </div>
  );
}
