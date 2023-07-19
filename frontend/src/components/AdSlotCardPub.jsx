import { useEffect, useState } from "react";
import { quotes } from "../assets";
import React from 'react';

import {Web3}  from "web3";
import {ethers} from "ethers"
import yuuAuctionABI from "../contracts/AdAuctionABI.json"

import { solidityCompiler, getCompilerVersions } from "@agnostico/browser-solidity-compiler";
import Modal from 'react-modal';

//CONTRACT ADDRESS - 0xDd7958f9c91368f042CB347fBa82053A3f33E787

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '25%',
    minHeight: '55%',
    
    position: 'absolute',
    overflowX : 'hidden',
    overflowY : 'hidden',
    
    
    
  },
};







Modal.setAppElement('#root');

const AdSlotCardPub = ({ name, tags, location, ht, startDate, startTime, width, endDate, endTime, score, started, ipfsHash}) => {

  //getContractData()
  const [modalOneIsOpen, setOneIsOpen] = React.useState(false);
  let subtitle;

  const [contractInfo, setContractInfo] = useState({
    address: "0x868f9FB60Be2d1DaC11f842970afBA8E4ebb03A5"
  });

  const [owner, setOwner] = useState('')
  const [startingBid, setStartingBid] = useState(0)

  const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const contract = new ethers.Contract(
      //   contractInfo.address,
      //   yuuAuctionABI,
      //   provider
      // );



      var MANTLE_TESTNET_PARAMS = {
        chainId: "0x1389",
        chainName: "Mantle Testnet",
        nativeCurrency: {
            name: "MNT",
            symbol: "MNT",
            decimals: 18,
        },
        rpcUrls: ["https://rpc.testnet.mantle.xyz"],
        blockExplorerUrls: ["https://explorer.testnet.mantle.xyz/"],
    }

var addMantleToMetamask = function() {
    window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [MANTLE_TESTNET_PARAMS],
    })
    .catch((error) => {
        console.log(error);
    });
    console.log("done")
};

    
    



  
  addMantleToMetamask()

 









  function openModalOne() {
    console.log("hello")
      setOneIsOpen(true);
  }
  function afterOpenModal() {
      // references are now sync'd and can be accessed.
      //subtitle.style.color = '#f00';
  }

  function closeModalOne() {
      setOneIsOpen(false);
  }


  async function handleStart(e){


    e.preventDefault()

    //await provider.send("eth_requestAccounts", []);
    var _signer = await provider.getSigner();
    var contract = new ethers.Contract(contractInfo.address, yuuAuctionABI, _signer);
    //console.log(ethers.utils.parseUnits(startingBid, 'wei'))
    var a = await contract.start(ipfsHash, ethers.utils.parseEther(startingBid))

    console.log(a)

  }

  async function handleEnd(e){


    e.preventDefault()

    await provider.send("eth_requestAccounts", []);
    var _signer = await provider.getSigner();
    var contract = new ethers.Contract(contractInfo.address, yuuAuctionABI, _signer);
    var a = await contract.end(ipfsHash)

    console.log(a)

  }

  


  return (



      <div className="flex justify-between flex-col px-10 py-12 rounded-[20px]  ml-5 max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">

    <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-2">
      Height : {ht}  Width : {width}
    </p>

    <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-2">
      Location : {location}
    </p>

    <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-2">
      Startdate : {startDate}   Time : {startTime}
    </p>

    <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-2">
      Enddate : {endDate}   Time : {endTime}
    </p>

    <div className="flex flex-row">

      <div className="flex flex-col">
        <h4 className="font-poppins font-semibold text-[20px] leading-[32px] text-gradient">
          {name}
        </h4>

      </div>

      <div className="flex flex-col">
        
          {started === false ? ( <><button
                
                className="group relative w-full flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-green hover:bg-blue-gradient
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500" 
                onClick={openModalOne}
              >
                
               Start bid
              </button>
              
               <Modal
               isOpen={modalOneIsOpen}
               onAfterOpen={afterOpenModal}
               onRequestClose={closeModalOne}
               style={customStyles}
               contentLabel="Example Modal"
               className={'bg-discount-gradient'}
           >

               
                   
                   
                   


               
               <h2 className="mt-6 text-center text-3xl font-extrabold text-gradient" style={{fontSize : 30}}>Start bid</h2>
                       
                   <form onSubmit={handleStart}>
                   <br /><br />


<br />
 
   <div>
       <label htmlFor="startBid" className="sr-only">
         Starting bid
       </label>
       <input
         id="startBid"
         name="startBid"
         type="text"
         required
         value={startingBid}
         className="appearance-none rounded-none absolute ml-8 w-80 block
          px-3 py-2 border border-gray-300
         placeholder-gray-500 text-gray-900 rounded-t-md
         focus:outline-none focus:ring-indigo-500
         focus:border-indigo-500 focus:z-10 sm:text-sm"
         placeholder="Starting bid"
         onChange={(e) => setStartingBid(e.target.value)}
       />
   </div>

   <br /><br />

  
                                    

   
   <br /><br /><br />
   <div>
     <button
       type="submit"
       className="group relative w-full flex justify-center
       py-2 px-4 border border-transparent text-sm font-medium
       rounded-md text-white bg-green hover:bg-blue-gradient
       focus:outline-none focus:ring-2 focus:ring-offset-2
       focus:ring-indigo-500"
   
     >
       <span className="absolute left-0 inset-y-0 flex items-center pl-3">
         
       </span>
      Start bid
     </button>
   </div>  

       
                       
                           
                           
                   </form>
               
               
           </Modal>
           </>
       ) : (<><p className="text-gradient">Started</p><button
                
       className="group relative w-full flex justify-center
       py-2 px-4 border border-transparent text-sm font-medium
       rounded-md text-white bg-green hover:bg-blue-gradient
       focus:outline-none focus:ring-2 focus:ring-offset-2
       focus:ring-indigo-500" 
       onClick={handleEnd}
     >
       
      End bid
     </button></> )}
      

      </div>
      <br/>

    </div>
  </div>

    )






};


export default AdSlotCardPub;
