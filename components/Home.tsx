import HoldingsTable from "./HoldingsTable";
import HoldingsHeader from "./HoldingsHeader";
import { Suspense } from "react";
import HoldingsTableSkeleton from "./HoldingsTableSkeleton";
import HoldingsHeaderSkeleton from "./HoldingsHeaderSkeleton";
import HoldingsAllocation from "./HoldingsAllocation";
import Networth from "./Networth";
import HoldingsAllocationSkeleton from "./HoldingsAllocationSkeleton";
import NetWorthSkeleton from "./NetworthSkeleton";

const Home = () => {
  return (
    <div className="w-full max-w-375 mx-auto p-3">
      <Suspense fallback={<HoldingsHeaderSkeleton />}>
        <HoldingsHeader />
      </Suspense>
      <div className="flex my-10">
        <Suspense fallback={<NetWorthSkeleton />}>
          <Networth />
        </Suspense>
        <Suspense fallback={<HoldingsAllocationSkeleton />}>
          <HoldingsAllocation />
        </Suspense>
      </div>
      <Suspense fallback={<HoldingsTableSkeleton />}>
        <HoldingsTable />
      </Suspense>
    </div>
  );
};

export default Home;
