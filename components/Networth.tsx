const Networth = async () => {
  await new Promise((res) => setTimeout(res, 3000));

  return <div className="flex-1 p-5">Net worth, last 30 days</div>;
};

export default Networth;
