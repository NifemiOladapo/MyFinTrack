import HoldingsTable from "./HoldingsTable";
import HoldingsHeader from "./HoldingsHeader";

const Home = () => {
  return (
    <div className="w-full max-w-250 mx-auto p-3">
      <HoldingsHeader />
      <HoldingsTable />
    </div>
  );
};

export default Home;
