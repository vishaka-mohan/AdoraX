import React from 'react';
import { discount, robot, galaxy } from "../assets";
import {useState, useEffect} from 'react'
import styles from "../style";
import {  Business, Billing, CardDeal, Testimonials, Footer, Navbar,  Hero, Advertiser, AdSlotCard, ProductCard, AdSlotCardPub } from ".";
import {people01, people02, people03, verge} from "../assets"

import {ethers} from "ethers"
import yuuAuctionABI from "../contracts/YuuAuctionABI.json"
import Modal from 'react-modal';
import axios from 'axios'
import { Web3Storage } from 'web3.storage'
// const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFBOEQ0QzMwNmI4ZjhjNjZCMTQyN2Y3NEIzZjlDNTI2YzE0RTFDRWEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjkwOTc5NDk3MjksIm5hbWUiOiJ5dXUifQ.t8HIerpToxPT9zgQzsZlAJeCWIBnZqlAaSOoZVkVUnw" })
// const customStyles = {
//     content: {
//       top: '50%',
//       left: '50%',
//       right: 'auto',
//       bottom: 'auto',
//       marginRight: '-50%',
//       transform: 'translate(-50%, -50%)',
//       minWidth: '25%',
//       minHeight: '55%',
      
//       position: 'absolute',
//       overflowX : 'hidden',
//       overflowY : 'hidden',
      
      
      
//     },
//   };

    
// Modal.setAppElement('#root');
// function PublisherSlots () {
//     const [data, setData] = useState([{}])
//     const [walletAddress, setWalletAddress] = useState('')
//     const [state, setState] = useState(true)
//     const [success, setSuccess] = useState('')
//     const [location, setLocation] = useState('')
//     const [ht, setHt] = useState('')
//     const [width, setWidth] = useState('')
//     const [startTime, setStartTime] = useState('')
//     const [endDate, setEndDate] = useState('')
//     const [startDate, setStartDate] = useState('')
//     const [endTime, setEndTime] = useState('')
//     const [modalOneIsOpen, setOneIsOpen] = React.useState(false);
//     const [ipfsData, setIpfsData] = useState([])
//     let subtitle;
    // useEffect(() => {
    
    //     async function connect(){
    //       if(window.ethereum) {
    //         console.log('detected');
        
    //         try {
    //           const accounts =await window.ethereum.request({
    //             method: "eth_requestAccounts",
    //           });
    //           console.log(accounts[0])
    //           setWalletAddress(accounts[0]);
    //           console.log("set",accounts[0])
    //           axios.post("http://localhost:5000/publisher/allSlots", {address:accounts[0]},{
    //           withCredentials:true
    //         }).then(async adSlots=>{

    //           console.log(adSlots)

    //           console.log(adSlots.data)
    //           console.log("ipfs",ipfsData)
    //           const url_arr = (adSlots.data.adSlots)
    //           const ipfsArr=[];
    //           //console.log(url_arr)
    //          for(var currentAdUrl of url_arr) {
    //            // console.log(currentAdUrl
    //             var response = await fetch(currentAdUrl.ipfsHash);
    //             if(response.ok){
    //               const responseData = await response.json();
    //               //  console.log(responseData)
    //               console.log("data",responseData)
    //               setIpfsData([...ipfsData,responseData])
    //               ipfsArr.push(responseData);
    //               //console.log("inter",ipfsArr)

               
    //             }

    //           }
    //           setIpfsData(ipfsArr)
    //           //console.log(ipfsArr)
          
    //         })
    //         } catch (error) {
    //           console.log(error)
    //           console.log('Error connecting...');
    //         }
        
    //       } else {
    //         alert('Meta Mask not detected');
    //       }
    //     }

    //     connect();
    //    // fetchAdSlots();
        
        
    // },[])
   

    // function makeFileObjects (obj, name) {
    
    //   const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
    
    //   const files = [
       
    //     new File([blob], name)
    //   ]
    //   return files
    // }
  
    // async function storeFiles (files) {
      
    //   const cid = await client.put(files)
    //   console.log('stored files with cid:', cid)
    //   return cid
    // }
    // function openModalOne() {
    //     setOneIsOpen(true);
    // }
    // function afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     subtitle.style.color = '#f00';
    // }

    // function closeModalOne() {
    //     setOneIsOpen(false);
    // }

    


const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFBOEQ0QzMwNmI4ZjhjNjZCMTQyN2Y3NEIzZjlDNTI2YzE0RTFDRWEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjkwOTc5NDk3MjksIm5hbWUiOiJ5dXUifQ.t8HIerpToxPT9zgQzsZlAJeCWIBnZqlAaSOoZVkVUnw" })
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
function PublisherSlots () {
    const [data, setData] = useState([{}])
    const [walletAddress, setWalletAddress] = useState('')
    const [state, setState] = useState(true)
    const [success, setSuccess] = useState('')
    const [location, setLocation] = useState('')
    const [ht, setHt] = useState('')
    const [width, setWidth] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endDate, setEndDate] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endTime, setEndTime] = useState('')
    const [modalOneIsOpen, setOneIsOpen] = React.useState(false);
    const [ipfsData, setIpfsData] = useState([])
    //const [contract, setContract] = useState(null)
    const [signer, setSigner] = useState('')
    let subtitle;


    const [contractInfo, setContractInfo] = useState({
      address: "0x868f9FB60Be2d1DaC11f842970afBA8E4ebb03A5"
    });
  
    const [owner, setOwner] = useState('')
  
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



      addMantleToMetamask()


    
        async function connect(){
          if(window.ethereum) {
            console.log('detected');
        
            try {
              const accounts =await window.ethereum.request({
                method: "eth_requestAccounts",
              });
              console.log(accounts[0])
              setWalletAddress(accounts[0]);
              console.log("set",accounts[0])
              axios.post("http://localhost:5000/publisher/allSlots", {address:accounts[0]},{
              withCredentials:true
            }).then(async adSlots=>{



              console.log(adSlots)
              console.log("ipfs",ipfsData)
              const url_arr = (adSlots.data.adSlots)
              const ipfsArr=[];
              //console.log(url_arr)
             for(var currentAdUrl of url_arr) {
                console.log(currentAdUrl.ipfsHash)
                var response = await fetch(currentAdUrl.ipfsHash);
                if(response.ok){
                  const responseData = await response.json();
                  //  console.log(responseData)
                  console.log("data",responseData)
                  setIpfsData([...ipfsData,responseData])
                  //await provider.send("eth_requestAccounts", []);
                  var _signer = await provider.getSigner();
                  var contract = new ethers.Contract(contractInfo.address, yuuAuctionABI, _signer);
                  console.log(currentAdUrl.ipfsHash)
                  var d = await contract.adSlots(currentAdUrl.ipfsHash)
                  console.log(d.started)
                  Object.assign(responseData, {started : d.started})
                  Object.assign(responseData, {ipfsHash : currentAdUrl.ipfsHash})
                  ipfsArr.push(responseData);
                  //console.log("inter",ipfsArr)

               
                }

              }
              setIpfsData(ipfsArr)
              //console.log(ipfsArr)
          
            })
            } catch (error) {
              console.log(error)
              console.log('Error connecting...');
            }
        
          } else {
            alert('Meta Mask not detected');
          }
        }

        async function fetchAdSlots(){

          //  axios.post("http://localhost:5000/publisher/allSlots", {address:walletAddress},{
          //     withCredentials:true
          //   }).then(async adSlots=>{
          //     console.log(ipfsData)
          //     const url_arr = (adSlots.data.adSlots)
          //     console.log(url_arr)
          //     url_arr.map(async currentAdUrl => {
          //      // console.log(currentAdUrl
          //       var response = await fetch(currentAdUrl);
          //       if(response.ok){
          //         const responseData = await response.json();
          //         //  console.log(responseData)
          //          console.log(responseData)

          //         setIpfsData([...ipfsData,responseData]);
          //       }
               
                
               
  


          //     })
          
          //   })
          
        }
        connect();
       

       async function get() {
  
 
      
       
        //setContract(_contract)
        //var c = await _contract.owner()
        // setOwner(c)
        
        //var a = await contract.bid("bafybeiabj3jpa2ymsduynrcimtxucvbw5gc5zabqhfp6rvegki6jwllnra", {value: ethers.utils.parseEther("0.0000002")})
        
        //console.log(a)
    
        
    
    
    
    
      }
    
      get()
        
        
    },[])
   

    function makeFileObjects (obj, name) {
    
      const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
    
      const files = [
       
        new File([blob], name)
      ]
      return files
    }
  
    async function storeFiles (files) {
      
      const cid = await client.put(files)
      console.log('stored files with cid:', cid)
      return cid
    }
    function openModalOne() {
        setOneIsOpen(true);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
    }

    function closeModalOne() {
        setOneIsOpen(false);
    }

    

   
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProd = new FormData();

        const body = {
            "location":location,
            "ht":ht,
            "address":walletAddress,
            "startDate":startDate,
            "startTime":startTime,
            "width":width,
            "endDate":endDate,
            "endTime":endTime
        }
       console.log(body)
      var files = makeFileObjects(body, "data.json")
      console.log(files)
      var cid = await storeFiles(files)
      const ipfs_url = `https://${cid}.ipfs.w3s.link/data.json`
      console.log("content saved on: ", cid)
      console.log(walletAddress)
        axios.post('http://localhost:5000/publisher/adSlot', {address:walletAddress,ipfs_url:ipfs_url}, {
            withCredentials: true
        })
        .then(res=> {console.log(res.data)
           
        if(res.data.message === "succesfully posted"){
          
            const body = `
            <script>
            async function fetchAdDetails(){
                var res = await fetch("http://localhost:5000/publisher/renderAd",{ method:"POST", body:JSON.stringify({ hashId:"bafybeidqvnqtwmqmqrmmeh6ywi3mqp3dcwaylntnet3as3zdyicruo6ymu"}),headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                } } 
                );
                console.log("RENDERING");
                res = await res.json();
                console.log(res);
               
  
                document.getElementById("adTitle${cid}").innerHTML=res.name;
                document.getElementById("adImage${cid}").src=res.pictureUrl;
                document.getElementById("adImage${cid}").style.width=res.width;
                document.getElementById("adImage${cid}").style.height=res.height;
                document.getElementById("adDesc${cid}").innerHTML=res.description;
            }
            fetchAdDetails();
        </script>
        <div id = "adSlot">
            <div>
                <div id="adTitle${cid}"></div>
                <img id="adImage${cid}" src = "#"/>
                <div id="adDesc${cid}"></div>
        
            </div>
        
        </div>`

        setSuccess(`Please paste the following code to the adslot \n ${body}`,)
        
            setData(res.data)
        }
        else{
            setSuccess('Oops! there was an error')
        }
        
        })
        .catch(err=>console.log(err.response.data));
        

    
    }
   

   
    return (
        <>
        

        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <div className='w-full flex py-6 justify-between items-center navbar'>
                    <button
                    type="submit"
                    className={`absolute left-8 mt-5
                    py-2 px-4 border border-transparent text-sm font-medium
                    rounded-md text-white bg-green hover:bg-blue-gradient
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    focus:ring-indigo-500`}
                    onClick={openModalOne}
                >
                    
                    Add new Ad Slot
                </button >
                <Modal
                        isOpen={modalOneIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModalOne}
                        style={customStyles}
                        contentLabel="Example Modal"
                        className={'bg-discount-gradient'}
                    >
    
                        {
                        
                        (state === true) ? 
                        (<div className='circle' style={{width : '200px', height : '200px', position : 'absolute', left : '68%'}}></div>)
                         : (<div className='circle' style={{width : '200px', height : '200px', backgroundImage: 'linear-gradient(#4C00FF, #aa85ff', position : 'absolute', left : '68%'}}></div>)
                         
                         
                         }
                        
                            
                            
                            
    
    
                        
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gradient" style={{fontSize : 30}}>New Ad Slot</h2>
                                {
                                        (success !== '') ? (<p style={{fontSize : 12, color: 'green'}}>{success}</p>) : (<p></p>)
                                }
                            <form onSubmit={handleSubmit}>
                            <br /><br />
        
      
      <br />
           <div>
            <input id="address" name="address" value = {walletAddress} hidden></input>
           </div>
            <div>
                <label htmlFor="location" className="sr-only">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={location}
                  className="appearance-none rounded-none absolute ml-8 w-80 block
                   px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Screen Location "
                  onChange={(e) => setLocation(e.target.value)}
                />
            </div>

            <br /><br />

            <div>
                <label htmlFor="ht" className="sr-only">
                  Ad Length
                </label>
                <input
                  id="ht"
                  name="ht"
                  type="text"
                  required
                  value={ht}
                  className="appearance-none rounded-none absolute ml-8 w-80 block
                  px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Ad height"
                  onChange={(e) => setHt(e.target.value)}
                />
            </div>

            <br /><br />

            <div>
                <label htmlFor="width" className="sr-only">
                Ad Length
                </label>
                <input
                  id="width"
                  name="width"
                  type="text"
                  value={width}
                  required
                  className="appearance-none rounded-none absolute ml-8 w-80 block
                   px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Ad Width"
                  onChange={(e) => setWidth(e.target.value)}
                />
            </div>  

            <br /><br />


            <div>
                <span style={{color:"white",paddingLeft:"120px"}}>Ad Slot Start Date</span>
                <label htmlFor="startDate" className="sr-only">
                    Start Date
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={startDate}
                  required
                  className="appearance-none rounded-none absolute ml-8 w-80 block
                   px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Start Date"
                  onChange={(e) => setStartDate(e.target.value)}
                />
            </div>    

            <br /><br />

            <div>
            <span style={{color:"white",paddingLeft:"120px"}}>Ad Slot Start Time</span>
                <label htmlFor="startTime" className="sr-only">
                    Start Time
                </label>
                <input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={startTime}
                  required
                  className="appearance-none rounded-none absolute ml-8 w-80 block
                   px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="startTime"
                  onChange={(e) => setStartTime(e.target.value)}
                />
            </div>  

            <br /> <br />


            <div>
            <span style={{color:"white",paddingLeft:"120px"}}>Ad Slot End Date</span>
                <label htmlFor="endDate" className="sr-only">
                  End Date
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={endDate}
                  required
                  className="appearance-none rounded-none absolute ml-8 w-80 block
                   px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Demographic"
                  onChange={(e) => setEndDate(e.target.value)}
                />
            </div>  

            <br /><br />
            <div>
            <span style={{color:"white",paddingLeft:"120px"}}>Ad Slot End Time</span>
                <label htmlFor="endTime" className="sr-only">
                  End Time
                </label>
                <input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={endTime}
                  required
                  className="appearance-none rounded-none absolute ml-8 w-80 block
                   px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Demographic"
                  onChange={(e) => setEndTime(e.target.value)}
                />
            </div>  
           

           
                                             

            
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
               Submit product
              </button>
            </div>  
       
                
                                
                                    
                                    
                            </form>
                        
                        
                    </Modal>
                    </div>
                
                </div>
         </div>
        
        
        
         <div className={`bg-primary ${styles.flexStart}`}>
        
             <section id="clients" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}>
              {/* {console.log("gr",ipfsData)} */}
              <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative">
              ({ipfsData.length === 0}) ? ( <p className='text-gradient'></p>) : (<>

               {
                                   ipfsData.map(d => {

                                      return(

                                        <AdSlotCardPub key={d._id} {...d} />
                                     )

                                    })




                                   }
                                   
              </>)
              </div>
            
                {/* <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative"> */}
                {/* <AdSlotCard key={"card1"} 
                    {...card}
                
                />
                <AdSlotCard key={"card1"} 
                    {...card}
                
                />
                <AdSlotCard key={"card1"} 
                    {...card}
                
                />
                <AdSlotCard key={"card1"} 
                    {...card}
                
                />
               <AdSlotCard key={"card1"} 
                    {...card}
                
                />
                <AdSlotCard key={"card1"} 
                    {...card}
                
                />
                </div> 
               <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
                    <br /><br /><br /><br /><br /><br /><br />
                </div>
                <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
                    <br /><br /><br /><br /><br /><br /><br />
                </div>
                <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
                    <br /><br /><br /><br />
                </div>
             */}
            </section>

        </div>
    </>
);

}



export default PublisherSlots;