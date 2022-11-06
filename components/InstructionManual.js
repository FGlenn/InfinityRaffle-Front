import Image from 'next/image';
import Link from 'next/link'

export default function InstructionManual() {
    return (
        <>
            <div className="justify-center px-20 mt-10 ">
                <p className='font-extralight text-sm'>Follow the steps below to start using the contract deployed on the Goerli testnet.</p>
                <h3 className="font-semibold mt-4">Metamask</h3>
                <p className="text-gray-700">To be able to interact with the web3 app you&apos;ll need to have a browser extension wallet installed.
                    Go through the steps on <Link href="https://everyrealm.com/blog/education/set-up-metamask"><a className="underline text-black hover:text-gray-500 decoration-gray-600"> how to set up a Metamask wallet</a></Link>.
                    After setting up your wallet, connect by using the botton in the top right corner of this website and set network to <Link href="https://blog.cryptostars.is/goerli-g%C3%B6rli-testnet-network-to-metamask-and-receiving-test-ethereum-in-less-than-2-min-de13e6fe5677"><a className="underline text-black hover:text-gray-500 decoration-gray-600">Goerli</a></Link>.
                </p>
                <h3 className="font-semibold mt-4">Testnet faucet</h3>
                <p className="text-gray-700">This contract requires tesnet Ether. <Link href="https://goerlifaucet.com/"><a className="underline text-black hover:text-gray-500 decoration-gray-600">Get testnet Ether</a></Link>.</p>
                <h3 className="font-semibold mt-4">Play/Pause button</h3>
                <p className="text-gray-700"> This contract is made as an example and the time interval for drawings is set to only 10 minutes.
                        This way anybody interested in testing won&apos;t have to waste too much time to find out how it works.
                        However the Chainlink Keepers contract will continously call functions from this contract and will waste a lot of tokens by doing so.
                        Thus in this example contract an additional button is added on the <Link href="/deposit"><a className="underline text-black hover:text-gray-500 decoration-gray-600">deposit page</a></Link>. which allows pausing/starting the raffle.
                        When testing out this contract be sure to press the play button to start first, before depositing funds.
                        Pressing the play button will allow for a transaction to pop-up from Metamask which sets the right state in the contract. </p>
                        <h3 className="font-semibold mt-4">Deposit</h3>
                <p className="text-gray-700">To deposit, go to the <Link href="/deposit"><a className="underline text-black hover:text-gray-500 decoration-gray-600">deposit page</a></Link> and press the enter raffle button. A transaction will pop-up in Metamask. 
                        Be aware that the raffle can&apos;t be paused when entering and each address can only enter once.</p>
                <h3 className="font-semibold mt-4">Withdraw</h3>
                <p className="text-gray-700">Deposited funds, earned funds by won prizes and the total balance can be found on the <Link href="/withdraw"><a className="underline  text-black hover:text-gray-500 decoration-gray-600">withdraw page</a></Link>.
                        Simple press the Withdraw Raffle button to execute a withdraw of the player&apos;s total balance.
                        A transaction will pop-up from metamask to confirm withdrawl. After the player has succesfully withdrawn from the raffle the player will be excluded from future drawings.
                </p>
                <h3 className="font-semibold mt-4">Keep track</h3>
                <p className="text-gray-700 "> To keep track of drawings, VRF transactions and Keepers transactions, use these links;   
                <a> </a> <Link href="https://automation.chain.link/goerli/68328606004496682600227264526454981306311760518541330800113741926223432147486"><a className="underline text-black hover:text-gray-500 decoration-gray-600">Keepers upkeep</a></Link><a> </a> 
                <Link href="https://vrf.chain.link/goerli/486"><a className="underline text-black hover:text-gray-500 decoration-gray-600">VRF subscription.</a></Link>

                </p>
                
            </div>
        
        </>

    )
}