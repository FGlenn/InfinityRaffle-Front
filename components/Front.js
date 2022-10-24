import Image from 'next/image';

export default function Front() {
    return (
        <>
            <div className="flex flex-wrap justify-center px-2 my-4 ">
                <div className="box-border border-2 border-indigo-200 rounded-[12px] bg-gradient-to-br from-purple-200 via-violet-100 to-white drop-shadow-2xl h-72 w-72 p-4  mx-4 my-4">
                    <h1 className="font-bold text-2xl border-b border-indigo-300">Next gen raffle</h1>
                    <p className="text-sm pt-2 ">Infinity Raffle provides the opportunity to win big prizes just like a traditional raffle, without the downside of losses.
                        Participating players are eglible for each draw for an unlimited amount of times.
                        Deposited funds can be withdrawn back at any time. </p>
                        
                </div>
                <gif src="https://cdn-icons-mp4.flaticon.com/512/6172/6172512.mp4" alt="party" class="-scale-x-1" width="20" height="20"></gif>
                <div className="box-border border-2 border-indigo-200 rounded-[12px] bg-gradient-to-br from-purple-200 via-violet-100 to-white drop-shadow-2xl h-72 w-72 p-4 mx-4 my-4">
                <h1 className="font-bold text-2xl border-b border-indigo-300">Aave yield generation</h1>
                    <p className="text-sm pt-2">Deposited funds are deposited in an Aave lending pool to generate yield. 
                        The winner of each draw will have balances updated with the total yield earned during that round. 
                        More participating players results in bigger prizes for each draw. 
                        When exiting the raffle, the total balance of the player will be withdrawn from Aave and sent to the player's wallet.</p>
                </div>
                <div className="box-border border-2  border-indigo-200 rounded-[12px] bg-gradient-to-br from-purple-200 via-violet-100 to-white drop-shadow-2xl h-72 w-72 p-4 mx-4 my-4">
                <h1 className="font-bold text-2xl border-b border-indigo-300">Chainlink Keepers</h1>
                    <p className="text-sm pt-2">The contract's function to pick winners is automatically executed by Chainlink Keepers.
                        Chainlink Keepers's contract gets triggered to call the function when specific conditions are met. 
                        One of the conditions in this contract is that a set amount of time has to be passed, creating an interval to trigger the drawings automatically. </p>
                </div>
                <div className="box-border border-2  border-indigo-200 rounded-[12px] bg-gradient-to-br from-purple-200 via-violet-100 to-white drop-shadow-2xl h-72 w-72 p-4 mx-4 my-4">
                <h1 className="font-bold text-2xl border-b border-indigo-300">Chainlink VRF</h1>
                    <p className="text-sm pt-2">This contract guarantees fair drawings which can't be manipulated by using Chainlink VRF.
                        Chainlink VRF is a verifiable random number generator which sends random numbers to this contract without compromising security.
                        These random numbers are used to pick random winners among all players. </p>
                </div>
            </div>
        </>

    )
}