"use client";

import { useState } from "react";
import { AddHoldingModal } from "./AddHoldingModal";

const AddHolding = ({ prices }: { prices: any }) => {
  const [showAddHolding, setShowAddHolding] = useState(false);

  const handleAddHolding = (data: any) => {
    console.log(data);
  };

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
          onSubmit={handleAddHolding}
        />
      )}
    </>
  );
};

export default AddHolding;
