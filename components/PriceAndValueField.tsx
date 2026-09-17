import { getPrices } from "@/app/page";
import { currency, Holding } from "./HoldingsTable";

const PriceAndValueField = async ({
  holding,
  assets,
}: {
  holding: Holding;
  assets: Holding[];
}) => {
  const prices = await getPrices(
    assets.map((asset) => asset.name.toLowerCase()),
  );
  const priceDisp = prices[holding.name.toLowerCase()]?.usd || 0;
  const value = holding.quantity * priceDisp;

  return (
    <>
      <td className="py-3 text-right text-sm text-neutral-300">
        {currency.format(priceDisp)}
      </td>
      <td className="py-3 text-right text-sm font-medium text-neutral-100">
        {currency.format(value)}
      </td>
    </>
  );
};

export default PriceAndValueField;
