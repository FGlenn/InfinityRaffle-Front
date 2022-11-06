import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import RecentWinner from "../components/RecentWinner";
import LotteryExit from "../components/LotteryExit";
import { useMoralis } from "react-moralis";

const supportedChains = ["5"];

export default function Withdraw() {
  const { isWeb3Enabled, chainId } = useMoralis();

  return (
    <div className= "bg-gradient-to-b from-indigo-50">
      <div className={styles.container}>
        <div>
            <Head>
              <title>Decentralized Raffle</title>
              <meta name="Decentralized Raffle" content="A decentralized autonomous raffle" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
             <Header />
             <RecentWinner/>
            {isWeb3Enabled ? (
              <div>
                {supportedChains.includes(parseInt(chainId).toString()) ? (
                  <div className="flex flex-row">
                    <LotteryExit className="p-8" />
                  </div>

                ) : (
                  <div>{`Please switch to a supported chainId. The supported Chain Id is: ${supportedChains}`}</div>
                )}
              </div>
            ) : (
              <div>Please connect to a Wallet</div>
            )}
        </div>
      </div>
    </div>
  );
}
