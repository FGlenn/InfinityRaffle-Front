import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import RecentWinner from "../components/RecentWinner";
import InstructionManual from "../components/InstructionManual";
import { useMoralis } from "react-moralis";

const supportedChains = ["5"];


export default function Instructions() {
  const { isWeb3Enabled, chainId } = useMoralis();

  return (
    <div class= "bg-gradient-to-b from-indigo-50">
      <div className={styles.container}>
        <div>
            <Head>
              <title>Infinity Raffle</title>
              <meta name="Infinity Raffle" content="A decentralized autonomous raffle into infintity" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
             <Header />
            <InstructionManual/>
        </div>
      </div>
    </div>
  );
}
