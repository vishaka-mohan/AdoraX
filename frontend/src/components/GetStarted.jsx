import styles from "../style";
import { arrowUp } from "../assets";
import { useState } from 'react';
import { ethers } from 'ethers';


const GetStarted = () => {
  const [walletAddress, setWalletAddress] = useState("");

  // Helper Functions

  // Requests access to the user's META MASK WALLET
  // https://metamask.io
  // async function requestAccount() {
  //   console.log('Requesting account...');

  //   // ❌ Check if Meta Mask Extension exists 
  //   if(window.ethereum) {
  //     console.log('detected');

  //     try {
  //       const accounts = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       setWalletAddress(accounts[0]);
  //     } catch (error) {
  //       console.log('Error connecting...');
  //     }

  //   } else {
  //     alert('Meta Mask not detected');
  //   }
  // }

  // // Create a provider to interact with a smart contract
  // async function connectWallet() {
  //   if(typeof window.ethereum !== 'undefined') {
  //     await requestAccount();

  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   }
  // }

  return(
  <div className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}>
    <div className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`} >
      <div className={`${styles.flexStart} flex-row`}>
        <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
          <span className="text-gradient">Connect</span>
        </p>
        <img src={arrowUp} alt="arrow-up" className="w-[23px] h-[23px] object-contain" />
      </div>
      
      <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
        <span className="text-gradient">Wallet</span>
      </p>
    </div>
  </div>
  )
  };

export default GetStarted;
