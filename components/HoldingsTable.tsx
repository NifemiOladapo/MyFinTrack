import { type ReactNode } from "react";
import PriceAndValueField from "./PriceAndValueField";
import { getAssets, getPrices, STALE_HOLDINGS } from "@/app/page";
import AddHolding from "./AddHolding";

type AssetSymbol = "BTC" | "ETH" | "AAPL";

export interface Holding {
  id: string;
  symbol: AssetSymbol;
  name: string;
  quantity: number;
  /** Current price of one unit, in USD. Comes from a cached price lookup. */
  //   price: number;
}

export interface HoldingsProps {
  onAddHolding?: () => void;
}

export const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const quantity = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 4,
});

const ASSET_ICON_STYLES: Record<AssetSymbol, string> = {
  BTC: "bg-blue-500/10 text-blue-400",
  ETH: "bg-orange-500/10 text-orange-400",
  AAPL: "bg-emerald-500/10 text-emerald-400",
};

function AssetIcon({ symbol }: { symbol: AssetSymbol }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${ASSET_ICON_STYLES[symbol]}`}
    >
      {symbol.charAt(0)}
    </span>
  );
}

function ColumnHeader({
  children,
  align = "left",
}: {
  children: ReactNode;
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

function HoldingRow({
  holding,
  assets,
}: {
  holding: Holding;
  assets: Holding[];
}) {
  const showTicker = holding.symbol !== holding.name.toUpperCase();

  return (
    <tr className="border-t border-neutral-800">
      <td className="py-3">
        <div className="flex items-center gap-2.5">
          <AssetIcon symbol={holding.symbol} />
          <span className="text-sm text-neutral-100">
            {holding.name}
            {showTicker && (
              <span className="text-neutral-500"> ({holding.symbol})</span>
            )}
          </span>
        </div>
      </td>
      <td className="py-3 text-right text-sm text-neutral-300">
        {quantity.format(holding.quantity)}
      </td>
      <PriceAndValueField holding={holding} assets={assets} />
    </tr>
  );
}

export default async function HoldingsTable() {
  const holdings = await getAssets();
  const prices = await getPrices();

  return (
    <section className="rounded-xl bg-neutral-950 p-5 border border-neutral-800">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-neutral-300">Holdings</h2>
        <AddHolding prices={prices} />
      </div>

      {holdings.length === 0 ? (
        <p className="py-6 text-center text-sm text-neutral-500">
          No holdings yet. Add one to see it here.
        </p>
      ) : (
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
            {holdings.map((holding) => (
              <HoldingRow
                key={holding.id}
                holding={holding}
                assets={holdings}
              />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
