import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface CoinData {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
}

interface ApiResponse {
  data: CoinData;
  timestamp: number;
}

export const Detail = () => {
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const { crypto } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`https://api.coincap.io/v2/assets/${crypto}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch coin data");
        }
        return response.json();
      })
      .then((data: ApiResponse) => {
        setCoinData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching coin data:", error);
        navigate("/");
      });
  }, []);

  return (
    <div className="h-[30rem] flex justify-center items-center">
      {coinData ? (
        <div className="">
          <h1 className="text-center text-4xl font-extrabold">
            {coinData.name}
          </h1>
          <p className="text-center mb-[3rem] font-bold">{coinData.symbol}</p>

          <div className="bg-[#100F10] flex flex-col justify-center  gap-1 rounded-lg h-[170px]  w-[400px] font-bold">
            <p className="flex justify-between mx-5">
              <span className="italic">Rank:</span> {coinData.rank}º
            </p>

            <p className="flex justify-between mx-5">
              <span>Price (USD):</span>{" "}
              {parseFloat(coinData.priceUsd).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <p className="flex justify-between mx-5">
              <span>Market Cap (USD):</span>{" "}
              {parseFloat(coinData.marketCapUsd).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>

            <p className="flex justify-between mx-5">
              <span>Volume (24h):</span>{" "}
              {parseFloat(coinData.volumeUsd24Hr).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
