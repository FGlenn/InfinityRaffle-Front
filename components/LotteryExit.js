import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"

export default function LotteryEntrance() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex, account: address } = useMoralis()
    // These get re-rendered every time due to our connect button!
    const chainId = parseInt(chainIdHex)  // ---> parseInt gives the int version of the hex
    // console.log(`ChainId is ${chainId}`) ---> gives the hex version of the chain ID
    const playerAddress = address.toString()
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId]["RaffleV32"][0] : null
    // const dappTokenAddress = chainId ? (networkMapping as any)[stringChainId]["DappToken"][0] : constants.AddressZero

    // State hooks
    // The reasonto use useState is it rerenders the view. Variables by themselves only change bits in memory
    // and the state of your app can get out of sync with the view.
    // https://stackoverflow.com/questions/58252454/react-hooks-using-usestate-vs-just-variables
    // const [variable updated by state, function sets variable ] = useState("starting value variable")
    const [hasIndex, setHasIndex] = useState()
    const [playerBalance, setPlayerBalance] = useState("0")
    const [playerPrizes, setPlayerPrizes] = useState("0")
    const [playerDeposited, setPlayerDeposited] = useState("0")
    const [entranceFee, setEntranceFee] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    // useNotification() returns dispatch which gives a pop up.
    const dispatch = useNotification()


    const {
        runContractFunction: withdrawPlayer,
        data: withdrawTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi["abi"],
        contractAddress: raffleAddress,
        functionName: "withdrawPlayer",
        params: {},
    })

    /* View Functions */

    const { runContractFunction: getPlayerBalance } = useWeb3Contract({
        abi: abi["abi"],
        contractAddress: raffleAddress,
        functionName: "getPlayerBalance",
        params: { _playerAddress: playerAddress },
    })

    const { runContractFunction: getPlayerDeposited } = useWeb3Contract({
        abi: abi["abi"],
        contractAddress: raffleAddress,
        functionName: "getPlayerDeposited",
        params: { _address: playerAddress },
    })

    const { runContractFunction: getPlayerPrizes } = useWeb3Contract({
        abi: abi["abi"],
        contractAddress: raffleAddress,
        functionName: "getYieldBalance",
        params: { _playerAddress: playerAddress },
    })

    const { runContractFunction: getHasIndex } = useWeb3Contract({
        abi: abi["abi"],
        contractAddress: raffleAddress,
        functionName: "getHasIndex",
        params: { _address: playerAddress },
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi["abi"],
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUIValues() {
        const hasIndexFromCall = (await getHasIndex()).valueOf()
        const playerBalanceFromCall = (await getPlayerBalance()).toString()
        const playerDepositedFromCall = (await getPlayerDeposited()).toString()
        const playerPrizesFromCall = (await getPlayerPrizes()).toString()
        const recentWinnerFromCall = await getRecentWinner()

        setHasIndex(hasIndexFromCall)
        setPlayerBalance(playerBalanceFromCall)
        setPlayerDeposited(playerDepositedFromCall)
        setPlayerPrizes(playerPrizesFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
    }

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        updateUIValues()
        handleNewNotification(tx)
    }

    return (
        <div className="flex justify-center my-8 mx-auto">
            <div className= 'rounded-[12px] p-10 bg-gradient-to-b from-indigo-300 via-purple-200 to-pink-300 drop-shadow-2xl'> 
                {raffleAddress ? (
                    <>
                        <div className= 'text-center'>
                            <div className="flex flex-row justify-between mb-10">
                                <h2 className="font-bold text-2xl">Player </h2>
                                <div className="font-bold text-2xl">{playerAddress.slice(0, 6)}...{playerAddress.slice(playerAddress.length - 4)}</div>
                            </div>
                            <div className="flex flex-row justify-between ">
                                <div>Deposited </div>
                                <div className="mx-left">{ethers.utils.formatUnits(playerDeposited, "ether")} ETH</div>
                            </div>
                            <div className="flex flex-row justify-between">
                                <div>Won prizes </div>
                                <div>{ethers.utils.formatUnits(playerPrizes, "ether")} ETH</div>
                            </div>
                            <div className="flex flex-row justify-between border-t border-opacity-30 border-black">
                                <div>Total balance </div>
                                <div>{ethers.utils.formatUnits(playerBalance, "ether")} ETH</div>
                            </div>
                            <button
                                className="grow min-w-full bg-indigo-300 hover:bg-indigo-400 text-white font-bold py-2 px-16 rounded mx-auto mt-10"
                                onClick={async () =>
                                    await withdrawPlayer({
                                        // onComplete:
                                        // onError:
                                        onSuccess: handleSuccess,
                                        // In case any of the contractions break log it in console.
                                        onError: (error) => console.log(error),
                                    })
                                }
                                disabled={isLoading || isFetching}
                            >
                                {isLoading || isFetching ? (

                                    <div className="mx-auto animate-spin spinner-border h-6 w-6 border-b-2 rounded-full"></div>
                                ) : (
                                    "Withdraw Raffle"
                                )}
                            </button> 
                            <div>{hasIndex}</div>
                            {hasIndex ? ("") : (<div className="text-xs font-extralight">Player has zero balance!</div>)}
                        </div>
                    </>
                ) : (
                    <div>Please connect to a supported chain </div>
                )}
            </div>
        </div >
    )
}


