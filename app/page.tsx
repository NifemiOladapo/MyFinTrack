import { Holding } from "@/components/HoldingsTable";
import Home from "@/components/Home";
import { TOP_25_COINS } from "@/data/constants";
import { getCryptoPrices } from "@/lib";
import { cache } from "react";

export const STALE_HOLDINGS: Holding[] = [
  { id: "btc", symbol: "BTC", name: "Bitcoin", quantity: 5 },
  { id: "eth", symbol: "ETH", name: "Ethereum", quantity: 100 },
  // { id: "aapl", symbol: "AAPL", name: "Tether", quantity: 400000 },
];

export const getAssets = cache(async () => {
  await new Promise((res) => setTimeout(res, 3000));
  return STALE_HOLDINGS;
});

export const getPrices = cache(async () => {
  const bgCrypto = TOP_25_COINS.map((coin) => coin.name.toLowerCase());
  const prices = await getCryptoPrices(bgCrypto);
  // console.log(prices);
  return prices;
});

export default async function page() {
  return (
    <div className="flex">
      <Home />
    </div>
  );
}
