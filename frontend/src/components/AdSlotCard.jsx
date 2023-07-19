import { useEffect, useState } from "react";
import { quotes } from "../assets";
import React from 'react';

import {ethers} from "ethers"
import yuuAuctionABI from "../contracts/AdAuctionABI.json"
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



const AdSlotCard = ({ name, tags, location, ht, startDate, startTime, width, endDate, endTime, score, ipfsHash, currentBid1}) => {




  const [modalIsOpen, setIsOpen] = React.useState(false);
  let subtitle;

  const [contractInfo, setContractInfo] = useState({
    address: "0x868f9FB60Be2d1DaC11f842970afBA8E4ebb03A5"
  });

  const [owner, setOwner] = useState('')
  const [currentBid, setCurrentBid] = useState(0)

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

    

useEffect(() => {
  // Update the document title using the browser API
  addMantleToMetamask();
});
    



  
  

 









  function openModal(e) {
    e.preventDefault()
    console.log("hello")
      setIsOpen(true);
  }
  function afterOpenModal1() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
  }

  function closeModal() {

      setIsOpen(false);
  }


  async function handleBid(e){

    e.preventDefault()
    console.log('hii')
    console.log(provider)

    //await provider.send("eth_requestAccounts", []);
    var _signer = await provider.getSigner();
    console.log(_signer)
    var contract = new ethers.Contract(contractInfo.address, yuuAuctionABI, _signer);
    console.log(contract)
    console.log(currentBid)
    //console.log(ethers.utils.parseUnits(currentBid, 'wei'))
    var a = await contract.bid(ipfsHash, {value: ethers.utils.parseEther(currentBid)})
    //var a = await contract.start(ipfsHash, ethers.utils.parseEther(currentBid))

    console.log(a)

  }
  
  
 
  
  
  return (

<>

  <div className="flex justify-between flex-col px-10 py-12 rounded-[20px]  ml-5 max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">
    {/* <img src={img} alt={name} className="w-[60px] h-[60px] rounded-full" /> */}
    <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-2">
      Height : {ht}
    </p>

    <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-2">
      Width : {width}
    </p>
    <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-2">
      Position : {location}
    </p>

    <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-2">
      Start Date : {startDate}
    </p>
    <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-2">
      End Date : {endDate}
    </p>
    <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-2">
      Start Time : {startTime}
    </p>
    <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-2">
     End Time : {endTime}
    </p>
   

    <div className="flex flex-row">
      
      <div className="flex flex-col">
        <h4 className="font-poppins font-semibold text-[20px] leading-[32px] text-gradient">
          {/* {name} */}
        </h4>
        
      </div>
      <br/>
      <div className="flex flex-col">
        <h4 className="font-poppins font-semibold text-[20px] leading-[32px] text-gradient">
          {score}
        </h4>



        <div className="flex flex-col">


        <div className='login-modal'>

        <button
                
                className="group relative w-full flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-green hover:bg-blue-gradient
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500" 
                onClick={openModal}
              >
                
               Place bid
              </button>

              <Modal
               isOpen={modalIsOpen}
               
               onRequestClose={closeModal}
               style={customStyles}
               contentLabel="Example Modal"
               className={'bg-discount-gradient'}
           >

               
                   
                   
                   


               
               <h2 className="mt-6 text-center text-3xl font-extrabold text-gradient" style={{fontSize : 30}}>Place bid</h2>
                       
                   <form onSubmit={handleBid}>
                   <br /><br />


<br />
 
   <div>
       <label htmlFor="startBid" className="sr-only">
         Your bid
       </label>
       <input
         id="currentBid"
         name="currentBid"
         type="text"
         required
         value={currentBid}
         className="appearance-none rounded-none absolute ml-8 w-80 block
          px-3 py-2 border border-gray-300
         placeholder-gray-500 text-gray-900 rounded-t-md
         focus:outline-none focus:ring-indigo-500
         focus:border-indigo-500 focus:z-10 sm:text-sm"
         placeholder="Your bid"
         onChange={(e) => setCurrentBid(e.target.value)}
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
      Submit bid
     </button>
   </div>  

       
                       
                           
                           
                   </form>
               
               
           </Modal>
           </div>
           </div>
        
      </div>
    </div>
    <div className="flex flex-row">
    <div className="flex flex-col">
        <h4 className="font-poppins font-semibold text-[20px] leading-[32px] text-gradient">
          {currentBid1}
        </h4>
        
      </div>
      </div>
  </div>
  </>

    )


  }
  
  

;


export default AdSlotCard;
