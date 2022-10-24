// This file is to show what making a connect button looks like behind the scenes!

import { useEffect } from "react"
import { useMoralis } from "react-moralis"

// Top navbar
export default function ManualHeader() {
    // Hooks are a way to work with different state which allows different rendering.
    const { enableWeb3, isWeb3Enabled, isWeb3EnableLoading, account, Moralis, deactivateWeb3 } =
        useMoralis()
    // "useEffect(()=>{if(){}},[])" listen to a set array or dependecy. These are set in []. Every time it renders it will execute the effect ().
    // In this case it checks whether "connected key exists in local storage. If it does, enableWeb3() "
    // This effect will check upon every refresh in order to prevent it asking to connect all the time.
    useEffect(() => {
        if (
            !isWeb3Enabled &&
            // Next.js has a hard time knowing about the window variable thus needs to be checked if it is defined.
            typeof window !== "undefined" &&
            window.localStorage.getItem("connected")
        ) {
            enableWeb3()
            // enableWeb3({provider: window.localStorage.getItem("connected")}) // add walletconnect
        }
    }, [isWeb3Enabled])
    // If there isn't any array, run effect on every render.
    // An empty array will run once.
    // A dependency array will run when the dependency changes.

    // When account is changed or disconnected, the connected key will be removed from the local storage and web3 will be deactived.
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null Account found")
            }
        })
    }, [])

    return (
        <nav className="p-5 border-b-2">
            <ul className="">
                <li className="flex flex-row">
                    {account ? (
                        // "{account ? (A) :(B)" checks whether there is a connection with an account. If True execute A, if False execture B.
                        <div className="ml-auto py-2 px-4">
                            Connected to {account.slice(0, 6)}...
                            {account.slice(account.length - 4)}
                        </div>
                    ) : (
                        // Creating a button which allows for connection with a selected wallet.
                        // "async" makes it easy to handle asynchronous UI states, without assumptions about the shape of your data or the type of request. React Async consists of a React component and several hooks. 
                        <button
                            onClick={async () => {
                                // await walletModal.connect()
                                await enableWeb3()
                                // depends on what button they picked
                                // Next.js has a hard time knowing about the window variable thus needs to be checked if it is defined.
                                if (typeof window !== "undefined") {
                                    // Store in local storage if the account has been connected. This prevents continues connection requests.
                                    window.localStorage.setItem("connected", "injected")
                                    // window.localStorage.setItem("connected", "walletconnect")
                                }
                            }}
                            // If the wallet is loading to connect the button will be disabled
                            disabled={isWeb3EnableLoading}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        >
                            Connect
                        </button>
                    )}
                </li>
            </ul>
        </nav>
    )
}
