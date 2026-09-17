const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

export async function getCryptoPrices(ids: string[]) {
  const url = new URL(`${COINGECKO_BASE_URL}/simple/price`);

  url.searchParams.set("ids", ids.join(","));
  url.searchParams.set("vs_currencies", "usd");

  const response = await fetch(url, {
    headers: {
      "x-cg-demo-api-key": process.env.COINGECKO_API_KEY!,
    },
  });
  if (!response.ok) {
    throw new Error(`CoinGecko request failed: ${response.status}`);
  }
  // await new Promise((res) => setTimeout(res, 5000));

  return response.json();
}
