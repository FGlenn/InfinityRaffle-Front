import { ConnectButton } from "web3uikit"
import Link from 'next/link'

export default function Header() {
    return (
        <nav className="p-6 border-b-2 flex flex-row">
            <ul className="flex flex-auto flex-nowrap">
                <li className="self-end pb-1">
                    <Link href="/">
                    <a className="font-extrabold text-transparent text-lg sm:text-3xl bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 inline-block" >InfinityRaffle</a>
                    </Link>
                </li>
                <li className="self-end  ml-8 px-2 pb-1">
                    <Link href="/deposit">
                        <a className="text-gray-500 hover:text-gray-700 text-sm sm:text-lg font-semibold">Deposit</a>
                    </Link>
                </li>
                <li  className="self-end  px-2 pb-1">
                    <Link href="/withdraw">
                        <a className="text-gray-500 hover:text-gray-700 text-sm sm:text-lg font-semibold">Withdraw</a>
                    </Link>
                </li>
                <li  className="self-end  px-2 pb-1">
                    <Link href="/instructions">
                        <a className="text-gray-500 hover:text-gray-700 text-sm sm:text-lg font-semibold">Instructions</a>
                    </Link>
                </li>
                <div className="self-end ml-auto px-4 ">
                    <ConnectButton moralisAuth={false} />
                </div>
            </ul>
        </nav>
    )
}