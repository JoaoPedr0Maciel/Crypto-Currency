import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

interface CoinsProps {
  name: string;
  image: string;
  marketCapUsd: string;
  priceUsd: string;
  vwap24Hr: string;
}

interface DataProps {
  data: CoinsProps[];
}

export function Home() {
  const [coins, setCoins] = useState<CoinsProps[]>([]);

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
      <form action="" className="flex gap-2">
        <input
          className="w-[550px] h-[2rem] max-sm:w-[300px] pl-2 rounded-md outline-none border-none text-black"
          type="text"
          placeholder="Digite a sigla da Crypto-Moeda"
        />
        <button className="gap-3  font-bold ">
          <CiSearch className="text-3xl" />
        </button>
      </form>

      <table className="w-[90%] mt-[3rem]">
        <thead className="uppercase">
          <tr>
            <th scope="col" className="w-[100px] h-[100px]">
              Moeda
            </th>
            <th scope="col" className="w-[100px] h-[100px]">
              Valor de Mercado
            </th>
            <th scope="col" className="w-[100px] h-[100px]">
              Preço
            </th>
            <th scope="col" className="w-[100px] h-[100px]">
              Volume
            </th>
          </tr>
        </thead>
        <tbody className="w-[70%]">
          {coins?.map((coin) => (
            <tr
              key={coin.name}
              className="bg-[#1d1c20]  h-[4rem] border-collapse border-spacing-y-4"
            >
              <td className="text-center rounded-l-xl ">
                <Link to="">{coin.name}</Link>
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
              <td className="text-center rounded-r-xl text-[#12f98a] font-bold">
                {parseFloat(coin.vwap24Hr).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
