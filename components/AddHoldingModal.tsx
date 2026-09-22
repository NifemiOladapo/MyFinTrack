import { TOP_25_COINS } from "@/data/constants";
import { Check, ChevronDown, Loader2, Search, X } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { currency } from "./HoldingsTable";
import { createHolding } from "@/actions/holding";

type AssetType = "crypto" | "stock";

type Asset = {
  id: string;
  symbol: string;
  name: string;
};

type AddHoldingModalProps = {
  onClose: () => void;
  prices: any;
};

const assets: Asset[] = TOP_25_COINS.map((coin) => ({
  id: coin.id,
  symbol: coin.symbol,
  name: coin.name,
}));

export function AddHoldingModal({ onClose, prices }: AddHoldingModalProps) {
  const [type, setType] = useState<AssetType>("crypto");
  const [selectedAsset, setSelectedAsset] = useState<Asset>(assets[0]);
  const [quantity, setQuantity] = useState("0.25");

  // --- asset combobox state ---
  const [isAssetOpen, setIsAssetOpen] = useState(false);
  const [assetSearch, setAssetSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const comboboxRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [isPending, startTransition] = useTransition();

  const filteredAssets = assets.filter((asset) =>
    `${asset.name} ${asset.symbol}`
      .toLowerCase()
      .includes(assetSearch.toLowerCase()),
  );

  const assetPrice = prices[selectedAsset.name.toLowerCase()]?.usd || 0;
  const estimatedValue = Number(quantity) * assetPrice;

  // close whole modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // close asset dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(e.target as Node)
      ) {
        setIsAssetOpen(false);
        setAssetSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // focus search input + reset highlight when dropdown opens
  useEffect(() => {
    if (isAssetOpen) {
      searchInputRef.current?.focus();
      setHighlightedIndex(0);
    }
  }, [isAssetOpen]);

  // reset highlight when the search query changes
  useEffect(() => {
    setHighlightedIndex(0);
  }, [assetSearch]);

  // keep highlighted item in view while navigating with arrow keys
  useEffect(() => {
    if (!isAssetOpen) return;
    const el = listRef.current?.querySelector(
      `[data-index="${highlightedIndex}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex, isAssetOpen]);

  const selectAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsAssetOpen(false);
    setAssetSearch("");
  };

  const handleAssetKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, filteredAssets.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const asset = filteredAssets[highlightedIndex];
      if (asset) selectAsset(asset);
    } else if (e.key === "Escape") {
      // stop this from bubbling up and closing the whole modal
      e.stopPropagation();
      setIsAssetOpen(false);
      setAssetSearch("");
    }
  };

  const handleAddHolding = async (data: any) => {
    startTransition(async () => {
      const holding = await createHolding(data);
      console.log(holding);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedQuantity = Number(quantity);

    if (!parsedQuantity || parsedQuantity <= 0) return;

    handleAddHolding({
      asset: selectedAsset,
      quantity: parsedQuantity,
      type,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-holding-title"
        className="w-full max-w-106.5 rounded-2xl border border-neutral-700 bg-neutral-900 p-6 shadow-2xl"
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2
            id="add-holding-title"
            className="text-2xl font-semibold text-white"
          >
            Add holding
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-600 text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Asset type */}
          <div className="mb-5 grid grid-cols-2 gap-2">
            {(["crypto", "stock"] as AssetType[]).map((item) => {
              const active = type === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setType(item)}
                  className={`h-11 rounded-xl border text-sm font-medium capitalize transition ${
                    active
                      ? "border-white bg-white text-black"
                      : "border-neutral-700 bg-transparent text-neutral-200 hover:bg-neutral-800"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Asset combobox */}
          <div className="mb-5" ref={comboboxRef}>
            <label
              htmlFor="asset-search"
              className="mb-2 block text-sm text-neutral-300"
            >
              Asset
            </label>

            <div className="relative">
              {isAssetOpen ? (
                <>
                  <Search
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
                  />

                  <input
                    ref={searchInputRef}
                    id="asset-search"
                    value={assetSearch}
                    onChange={(e) => setAssetSearch(e.target.value)}
                    onKeyDown={handleAssetKeyDown}
                    role="combobox"
                    aria-expanded={isAssetOpen}
                    aria-controls="asset-listbox"
                    autoComplete="off"
                    className="h-12 w-full rounded-lg border border-neutral-500 bg-transparent pl-10 pr-10 text-white outline-none placeholder:text-neutral-500"
                    placeholder="Search asset..."
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setIsAssetOpen(false);
                      setAssetSearch("");
                    }}
                    aria-label="Close asset search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 transition hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAssetOpen(true)}
                  aria-haspopup="listbox"
                  aria-expanded={isAssetOpen}
                  className="flex h-12 w-full items-center justify-between rounded-lg border border-neutral-700 bg-transparent px-4 text-left text-white outline-none transition hover:border-neutral-500 focus:border-neutral-500"
                >
                  <span className="text-sm capitalize">
                    {selectedAsset.name}{" "}
                    <span className="text-neutral-500">
                      ({selectedAsset.symbol})
                    </span>
                  </span>

                  <ChevronDown size={18} className="text-neutral-500" />
                </button>
              )}

              {isAssetOpen && (
                <div
                  id="asset-listbox"
                  role="listbox"
                  ref={listRef}
                  className="absolute z-10 mt-2 max-h-64 w-full overflow-y-auto rounded-lg border border-neutral-700 bg-neutral-900 shadow-2xl"
                >
                  {filteredAssets.length > 0 ? (
                    filteredAssets.map((asset, index) => {
                      const isSelected = asset.id === selectedAsset.id;
                      const isHighlighted = index === highlightedIndex;

                      return (
                        <button
                          key={asset.id}
                          type="button"
                          data-index={index}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => selectAsset(asset)}
                          onMouseEnter={() => setHighlightedIndex(index)}
                          className={`flex w-full items-center justify-between px-4 py-3 text-left transition ${
                            isHighlighted ? "bg-neutral-800" : ""
                          }`}
                        >
                          <span className="flex items-center gap-2 text-sm text-white capitalize">
                            <Check
                              size={14}
                              className={
                                isSelected ? "text-white" : "text-transparent"
                              }
                            />
                            {asset.name}
                          </span>

                          <span className="text-sm text-neutral-500">
                            {asset.symbol}
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    <div className="px-4 py-3 text-sm text-neutral-500">
                      No assets found.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-5">
            <label
              htmlFor="quantity"
              className="mb-2 block text-sm text-neutral-300"
            >
              Quantity
            </label>

            <input
              id="quantity"
              type="number"
              min="0"
              step="any"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="h-12 w-full rounded-lg border border-neutral-700 bg-transparent px-4 text-white outline-none transition focus:border-neutral-500"
              placeholder="0.00"
            />
          </div>

          {/* Estimated value */}
          <div className="mb-5 flex h-14 items-center justify-between rounded-xl bg-neutral-950 px-5">
            <span className="text-sm text-neutral-400">Estimated value</span>

            <span className="text-lg font-semibold text-white">
              {currency.format(estimatedValue)}
            </span>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-neutral-600 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="h-11 rounded-xl bg-white text-sm font-medium text-black transition hover:bg-neutral-200"
            >
              {isPending ? <Loader2 className="animate-spin  mx-auto"/> : "Add holding"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
