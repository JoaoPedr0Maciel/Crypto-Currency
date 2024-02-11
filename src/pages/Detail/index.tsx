import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface CoinData {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
}

interface ApiResponse {
  data: CoinData;
  timestamp: number;
}

export const Detail = () => {
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const { crypto } = useParams();
  useEffect(() => {
    fetch(`https://api.coincap.io/v2/assets/${crypto}`)
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        setCoinData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching coin data:", error);
      });
  }, []);

  return (
    <div className="h-[30rem] flex justify-center items-center">
      {coinData ? (
        <div className="bg-[#5f5f5f] rounded-lg h-[250px] pl-5 pt-5 w-[350px]">
          <h2>Name: {coinData.name}</h2>
          <p>Rank: {coinData.rank} st</p>
          <p>Symbol: {coinData.symbol}</p>
          <p>
            Price (USD):{" "}
            {parseFloat(coinData.priceUsd).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p>
            Market Cap (USD):{" "}
            {parseFloat(coinData.marketCapUsd).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
