const Networth = async () => {
  await new Promise((res) => setTimeout(res, 3000));

  return (
    <div className="flex-1 p-5">
      <h2 className="mb-6 text-sm font-medium text-neutral-300">Net worth, last 30 days</h2>
    </div>
  );
};

export default Networth;
