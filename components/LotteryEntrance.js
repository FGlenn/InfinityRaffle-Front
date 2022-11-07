import { contractAddresses, abi } from "../constants"
// dont export from moralis when using react
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

    // State hooks
    // The reason to use useState is it rerenders the view. Variables by themselves only change bits in memory
    // and the state of your app can get out of sync with the view.
    // https://stackoverflow.com/questions/58252454/react-hooks-using-usestate-vs-just-variables
    // const [variable updated by state, function sets variable ] = useState("starting value variable")
    const [hasIndex, setHasIndex] = useState()
    const [yieldBalance, setYieldBalance] = useState("0")
    const [entranceFee, setEntranceFee] = useState("0")
    const [numberOfPlayers, setNumberOfPlayers] = useState("0")
    const [raffleState, setRaffleState] = useState("0")


    // Countdown timer
    const [days, setDays] = useState("0")
    const [hours, setHours] = useState("0")
    const [minutes, setMinutes] = useState("0")
    const [seconds, setSeconds] = useState("0")
    const [raffleTime, setRaffleTime] = useState(false)
    const [intervalRaffle, setIntervalRaffle] = useState("0")
    const [lastTime, setLastTimeStamp] = useState("0")
    const [countDownState ,setStateCountdown] = useState(true)
    
    function addLeadingZeros(num, totalLength) {
        return String(num).padStart(totalLength, '0');
      }  

    // useNotification() returns dispatch which gives a pop up.
    const dispatch = useNotification()

    const {
        runContractFunction: enterRaffle,
        data: enterTxResponse,
        isLoading: loadingEnter,
        isFetching: fetchingEnter,
    } = useWeb3Contract({
        abi: abi["abi"],
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        msgValue: entranceFee,
        params: {},
    })

    const {
        runContractFunction: togglePause,
        data: togglePausexResponse,
        isLoading: loadingPause,
        isFetching: fetchingPause,
    } = useWeb3Contract({
        abi: abi["abi"],
        contractAddress: raffleAddress,
        functionName: "togglePause",
        params: {},
    })

    //////// View Functions ////////

    const { runContractFunction: i_interval } = useWeb3Contract({
        abi: abi["abi"],
        contractAddress: raffleAddress,
        functionName: "i_interval",
        params: {},
    })

    const { runContractFunction: s_lastTimeStamp } = useWeb3Contract({
        abi: abi["abi"],
        contractAddress: raffleAddress,
        functionName: "s_lastTimeStamp",
        params: {},
    })


    const { runContractFunction: getYieldBalance } = useWeb3Contract({
        abi: abi["abi"],
        contractAddress: raffleAddress,
        functionName: "getYieldBalance",
        params: {},
    })

    const { runContractFunction: getHasIndex } = useWeb3Contract({
        abi: abi["abi"],
        contractAddress: raffleAddress,
        functionName: "getHasIndex",
        params: { _address: playerAddress },
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi["abi"],
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getPlayersNumber } = useWeb3Contract({
        abi: abi["abi"],
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRaffleState } = useWeb3Contract({
        abi: abi["abi"],
        contractAddress: raffleAddress,
        functionName: "getRaffleState",
        params: {},
    })

    //////// Countdown timer ////////

    useEffect(() => {
        if (countDownState) {
            updateCountdownValues()
        }
    }, [countDownState])
    
    async function updateCountdownValues() {
        const intervalFromCall = (await i_interval()).toLocaleString()
        const lastTimeStampFromCall = (await s_lastTimeStamp()).toLocaleString()
        const stateCountDownFromCall = (await getRaffleState()).toString()
        const statesCountdown = [true, false, false]
        const stateCountdown = statesCountdown[stateCountDownFromCall]

        setIntervalRaffle(intervalFromCall)
        setLastTimeStamp(lastTimeStampFromCall)
        setStateCountdown(stateCountdown)
    }

    useEffect(() => {

            const frequency = setInterval(() => {
                const target =  (intervalRaffle*1000  + lastTime*1000)                  
                const difference = target - ((new Date()).getTime());

                if(difference >= 0){
                    let d = Math.floor(difference / (1000 * 60 * 60 * 24));
                    setDays(addLeadingZeros(d, 2))
                    let h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    setHours(addLeadingZeros(h, 2))
                    let m = Math.floor((difference % (1000 * 60 * 60 )) / (1000 * 60));
                    setMinutes(addLeadingZeros(m, 2))
                    let s = Math.floor((difference % (1000 * 60 )) / (1000));
                    setSeconds(addLeadingZeros(s, 2))
                    setRaffleTime(false)
                }
                else {
                    setRaffleTime(true)
                }
            }, 1000);

            return () => clearInterval(frequency);

    }, [raffleState])


    //////// UI values ////////

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    async function updateUIValues() {
        const hasIndexFromCall = (await getHasIndex()).valueOf()
        const yieldBalanceFromCall = (await getYieldBalance()).toString()
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numPlayersFromCall = (await getPlayersNumber()).toString()
        const raffleStateFromCall = (await getRaffleState()).toString()
        const states = [true, true, false]
        const state = states[raffleStateFromCall]

        setHasIndex(hasIndexFromCall)
        setYieldBalance(yieldBalanceFromCall)
        setEntranceFee(entranceFeeFromCall)
        setNumberOfPlayers(numPlayersFromCall)
        setRaffleState(state)
    }

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
                            <div className="py-1 px-4 font-bold  text-l">Next Round&apos;s Prize</div>
                            <div className="pt-1 px-4 font-extrabold text-6xl text-black">{ethers.utils.formatUnits(yieldBalance, "ether")} ETH</div>
                            <div className="mb-12 text-xs">*{numberOfPlayers} participating players </div>
                            <div className="flex justify-center my-8 mx-auto"> 
                            {raffleTime ? <div>Calculating winner. Waiting for next raffle.</div> : 
                            <div className="flex my-auto text-center">
                                <div className="flex flex-col border-white border-2 rounded-[6px] px-1">
                                    <span className="flex front-bold text-3xl pt-1">{days}</span>
                                    <span className="label font-extralight text-xs pb-1">D</span>
                                </div>
                                <span className="flex front-bold text-3xl  mx-1 mt-1">:</span>
                                <div className="flex flex-col border-white border-2 rounded-[6px] px-1">
                                    <span className="flex front-bold text-3xl pt-1">{hours}</span>
                                    <span className="label font-extralight text-xs pb-1">H</span>
                                </div>
                                <span className="flex front-bold text-3xl  mx-1 mt-1">:</span>
                                <div className="flex flex-col border-white border-2 rounded-[6px] px-1">
                                    <span className="flex front-bold text-3xl pt-1">{minutes}</span>
                                    <span className="label font-extralight text-xs pb-1">M</span>
                                </div>
                                <span className="flex front-bold text-3xl mx-1 mt-1">:</span>
                                <div className="flex flex-col border-white border-2 rounded-[6px] px-1">
                                    <span className="flex front-bold text-3xl pt-1">{seconds}</span>
                                    <span className="label font-extralight text-xs pb-1">S</span>
                                </div>
                            </div>}
                            </div>
                            {raffleState ? (<button
                                className="mb-10 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded ml-auto"
                                onClick={async () =>
                                    await togglePause({
                                        onSuccess: handleSuccess,
                                        onError: (error) => console.log(error),
                                    })
                                }
                                disabled={loadingPause || fetchingPause}
                            >
                                {loadingPause || fetchingPause ? (
                                    <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                                ) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                                    </svg> 
                                )}
                            </button>) : (<button
                                className="mb-10 bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-2 rounded ml-auto"
                                onClick={async () =>
                                    await togglePause({
                                        onSuccess: handleSuccess,
                                        onError: (error) => console.log(error),
                                    })
                                }
                                disabled={loadingPause || fetchingPause}
                            >
                                {loadingPause || fetchingPause ? (
                                    <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                                ) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                    </svg>
                                )}
                            </button>)}
                            <div>Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH</div>
                            <button
                                className="grow min-w-full bg-indigo-300 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded mx-auto"
                                onClick={async () =>
                                    await enterRaffle({
                                        onSuccess: handleSuccess,
                                        onError: (error) => console.log(error),
                                    })
                                }
                                disabled={loadingEnter || fetchingEnter}
                            >
                                {loadingEnter || fetchingEnter ? (
                                    <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                                ) : (
                                    "Enter Raffle"
                                )}
                            </button>
                            <div>{hasIndex}</div>
                            {hasIndex ? (<div className="text-xs font-extralight">Player already entered!</div>) : ("")}
                        </div>
                    </>
                ) : (
                    <div>Please connect to a supported chain </div>
                )}
            </div>
        </div >
    )
}
