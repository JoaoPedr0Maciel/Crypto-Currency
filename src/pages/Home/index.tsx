import { FormEvent, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

interface CoinsProps {
  name: string;
  image: string;
  marketCapUsd: string;
  priceUsd: string;
  changePercent24Hr: string;
  symbol: string;
  id: string;
}

interface DataProps {
  data: CoinsProps[];
}

export function Home() {
  const [coins, setCoins] = useState<CoinsProps[]>([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (input === "") return;
    const inputLowerCase = input.toLowerCase();
    navigate(`/detail/${inputLowerCase}`);
  };

  useEffect(() => {
    function getData() {
      try {
        const apiUrl = `https://api.coincap.io/v2/assets`;

        fetch(apiUrl)
          .then((res) => res.json())
          .then((data: DataProps) => {
            setCoins(data.data);
          })
          .catch((error) => {
            console.error("Ocorreu um erro ao obter os dados:", error);
          });
      } catch (error) {
        console.error("Ocorreu um erro:", error);
      }
    }
    getData();
  }, []);

  return (
    <main className="h-full flex flex-col justify-center items-center">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          className="w-[550px] h-[2.5rem] max-sm:w-[300px] pl-2 rounded-md outline-none border-none text-black"
          type="text"
          placeholder="Enter the name of the cryptocurrency"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="gap-3  font-bold ">
          <CiSearch className="text-4xl" />
        </button>
      </form>

      <table className="w-[90%] mt-[3rem] border-separate border-spacing-y-[1rem]">
        <thead className="uppercase">
          <tr>
            <th scope="col" className="w-[100px] h-[100px]">
              coin
            </th>
            <th scope="col" className="w-[100px] h-[100px]">
              price
            </th>
            <th scope="col" className="w-[100px] h-[100px]">
              market value
            </th>
            <th scope="col" className="w-[100px] h-[100px]">
              Volume
            </th>
          </tr>
        </thead>
        <tbody className="w-[70%]">
          {coins?.map((coin) => (
            <tr key={coin.name} className="bg-[#1d1c20] mb-4 h-[4rem]">
              <td className="text-center rounded-l-xl font-bold ">
                <Link
                  className="transition duration-[.5s] hover:text-[#3098FF]"
                  to={`/detail/${coin.id}`}
                >
                  {coin.name} | {coin.symbol}
                </Link>
              </td>
              <td className="text-center text-[#BBB] font-bold">
                {parseFloat(coin.priceUsd).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </td>
              <td className="text-center text-[#BBB] font-bold">
                {parseFloat(coin.marketCapUsd).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </td>
              <td
                className={`text-center rounded-r-xl font-bold ${
                  parseFloat(coin.changePercent24Hr) >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {parseFloat(coin.changePercent24Hr).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
