"use client";

import { useState } from "react";
import { AddHoldingModal } from "./AddHoldingModal";
import { createHolding } from "@/actions/holding";

const AddHolding = ({ prices }: { prices: any }) => {
  const [showAddHolding, setShowAddHolding] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowAddHolding(true)}
        className="rounded-lg cursor-pointer border border-neutral-700 px-3 py-1.5 text-sm text-neutral-200 transition-colors hover:bg-neutral-800"
      >
        + Add holding
      </button>
      {showAddHolding && (
        <AddHoldingModal
          prices={prices}
          onClose={() => setShowAddHolding(false)}
        />
      )}
    </>
  );
};

export default AddHolding;
