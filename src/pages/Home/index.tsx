import { FormEvent, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
  }, []);

  return (
    <main className="h-full flex flex-col justify-center items-center ">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          className="w-[550px] h-[2.5rem] max-custom-md:w-[250px] font-bold max-sm:w-[300px] pl-2 rounded-md outline-none border-none text-black"
          type="text"
          placeholder="Enter the name of the cryptocurrency"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="gap-3  font-bold ">
          <CiSearch className="text-4xl" />
        </button>
      </form>

      <table className="w-[80%] max-sm:border-0   mt-[3rem] border-separate border-spacing-y-[1rem]">
        <thead className="uppercase max-sm:text-sm  max-custom-md:">
          <tr>
            <th scope="col" className="w-[100px] h-[100px]">
              coin
            </th>
            <th scope="col" className="w-[100px] h-[100px]">
              price
            </th>
            <th scope="col" className="w-[100px] h-[100px]">
              <span
                className={
                  window.innerWidth < 448 ? "hidden sm:inline" : "inline"
                }
              >
                market value
              </span>
              <span
                className={
                  window.innerWidth < 448 ? "inline sm:hidden" : "hidden"
                }
              >
                market
              </span>
            </th>

            <th scope="col" className="w-[100px] h-[100px]">
              Volume
            </th>
          </tr>
        </thead>
        <tbody className="">
          {isLoading ? (
            coins?.map((coin) => (
              <tr
                key={coin.name}
                className="bg-[#1d1c20] max-sm:text-sm mb-4 h-[4rem]"
              >
                <td className="text-center max-custom-md:text-md rounded-l-xl font-bold ">
                  <Link
                    className="transition duration-[.5s] hover:text-[#3098FF]"
                    to={`/detail/${coin.id}`}
                  >
                    {coin.name} | {coin.symbol}
                  </Link>
                </td>
                <td className="text-center text-[#BBB] max-sm:text-sm font-bold">
                  {parseFloat(coin.priceUsd).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td className="text-center text-[#BBB] font-bold">
                  {window.innerWidth < 448
                    ? parseFloat(coin.marketCapUsd) >= 1000000000
                      ? `$${(
                          parseFloat(coin.marketCapUsd) / 1000000000
                        ).toFixed(2)}B`
                      : `$${(parseFloat(coin.marketCapUsd) / 1000000).toFixed(
                          2
                        )}M`
                    : parseFloat(coin.marketCapUsd).toLocaleString("en-US", {
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
            ))
          ) : (
            <tr className="flex justify-center items-center w-full">
              <AiOutlineLoading3Quarters className="text-3xl rotating text-center " />
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
