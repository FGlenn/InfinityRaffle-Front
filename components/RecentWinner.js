import { contractAddresses, abi } from "../constants"
// dont export from moralis when using react
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import Image from 'next/image';
import rocket from "../img/rocket.png";

export default function LotteryEntrance() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex} = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId]["RaffleV32"][0] : null
    
    const [recentWinner, setRecentWinner] = useState("0")

    /* View Functions */

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi["abi"],
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUIValues() {
        const recentWinnerFromCall = await getRecentWinner()

        setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    return (
        <div className="flex justify-center mt-6 mx-auto">
            <div className= 'border-2 border-indigo-300 rounded-[12px] p-1 bg-indigo-200 drop-shadow-xl'> 
                <div className="flex items-center">
                    <img src="https://openmoji.org/data/color/svg/1F389.svg" alt="party" className="-scale-x-1" width="20" height="20"></img>
                    <div className="text-sm font-extralight">Congratulations to the most recent winner... </div>
                    <div className="flex justify-center text-sm font-extralight ">{recentWinner.slice(0, 6)}...{recentWinner.slice(recentWinner.length - 4)}</div>
                    <img src="https://openmoji.org/data/color/svg/1F389.svg" alt="party" width="20" height="20"></img>
                </div>
            </div>
        </div >
    )
}


