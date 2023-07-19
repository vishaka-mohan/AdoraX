import React from 'react'
import {useEffect, useState} from 'react'
import AdSlotCard from './AdSlotCard';
import styles from "../style";
import { Web3Storage } from 'web3.storage'
import {ethers} from "ethers"
import yuuAuctionABI from "../contracts/AdAuctionABI.json"

export default function Marketplace() {

  const [data, setData] = useState([{}])
  const [ipfsData, setIpfsData] = useState([])
  const [walletAddress, setWalletAddress] = useState('')
  const [demos, setDemos] = useState('')
  const [count, setCount] = useState('')
  const [basicTag, setBasicTag] = useState('')
  const client = new Web3Storage({ token: process.env.REACT_APP_API_TOKEN })
  var a = []
  const demo = ['all age groups', 'adults only(above 18)', 'adult females', 'adult males', 'teenagers(13-19)', 'young adults(20s)', 'senior citizens', 'kids'];
  const country = ['india', 'pakistan', 'sri lanka', 'us', 'canada', 'australia', 'uk', 'france', 'russia', 'japan']
  const basic_tags = ['beauty', 'sports', 'automobile', 'technology', 'education', 'programming', 'footwear', 'hair-care', 'groceries', 'phenyls']
  const sort_opt = ['Low to high', 'High to low']
  var c = 0
  var updateData = []
  const [contractInfo, setContractInfo] = useState({
    address: "0x868f9FB60Be2d1DaC11f842970afBA8E4ebb03A5"
  });

  const [owner, setOwner] = useState('')

  const provider = new ethers.providers.Web3Provider(window.ethereum);



  function handleAdd(d) {

    
   
    // updateData = ipfsData
    // updateData.push(d)
    var updated = [...ipfsData, d];
    // update the state to the updatedUsers
    setIpfsData(updated);
    console.log(ipfsData)
  }

  const onOptionChangeHandler1 = (event) => {
    
    console.log("User Selected Value - ", event.target.value)
    setDemos(event.target.value)
  }


const onOptionChangeHandler2 = (event) => {
  console.log("User Selected Value - ", event.target.value)
  setCount(event.target.value)
}


const onOptionChangeHandler3 = (event) => {
  console.log("User Selected Value - ", event.target.value)
  setBasicTag(event.target.value)
}

  function handleSubmit(e){
    e.preventDefault()
    console.log(demos)
    console.log(basicTag)
    console.log(count)
    fetch('http://localhost:5000/advertiser/applyFilter?demographic='+demos+'&country='+count+'&basicTag='+basicTag, {
                credentials : 'include'
            }).then(
            response => {return response.json()}
            //console.log(response)}
            ).then(
            data => {
                console.log(data)
                setData(data)
                setIpfsData([])
                data.data.map(async d => {
                  console.log("scor")
                  console.log(d.score)
                  
                  Object.assign(d, {company: data.name});
                  
                  console.log(d.tags)
                  console.log(d.adSlots)
                  
                  if(d.hasOwnProperty("adSlots") && d.adSlots.length > 0){
                    d.adSlots.map(async i => {
                      //Object.assign(d, {ipfs_url : "https://"+i+".ipfs.w3s.link/file2.json"})
                      console.log(i)
                      var response = await fetch(i.ipfsHash);
                      
                      await provider.send("eth_requestAccounts", []);
                      var _signer = await provider.getSigner();
                      var contract = new ethers.Contract(contractInfo.address, yuuAuctionABI, _signer);
                      var c = await contract.adSlots(i.ipfsHash)
                      console.log(c)
                      Object.assign(d, {ipfsHash : i.ipfsHash})

                      if(c.started === true){
                        console.log(c.started)
                        if(!response.ok)
                          throw new Error(response.statusText);
                        //console.log(response)
                        

                        var json = await response.json();
                        Object.assign(d, json)
                        
                        
                        Object.assign(d, {started : true})
                        Object.assign(d, {currentBid : parseInt(c.highestBid._hex, 16)})
                        
                        console.log(ipfsData)
                        setIpfsData(prevState => [...prevState, d])
                      } 

                      
                      //console.log("printing adslots")
                      //handleAdd(d)

                      
                    })
                   

                  }
 
                 })
                
                
            }
            )
  }


  async function retrieveFiles (cid) {
    
    const res = await client.get(cid)
    console.log(`Got a response! [${res.status}] ${res.statusText}`)
    if (!res.ok) {
      throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
    }
  
    // unpack File objects from the response
    const files = await res.files()
    for (const file of files) {
      console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
    }
  }

  async function retrieve(url){
    //using fetch https://bafybeihiffqihez3djrocxnerx2h4dsaqqqxok6glt5rs5earuxfba42cq.ipfs.w3s.link/
    const response = await fetch(url);

    if(!response.ok)
      throw new Error(response.statusText);
    console.log(response)

    const json = await response.json();
    console.log(json)
    return json
  }



  useEffect(() => {

    console.log('reloaded')
    updateData = []

    const urlParams = new URLSearchParams(window.location.search);
    const prod = urlParams.get('prod');
    console.log("prod")
    console.log(prod)

    async function connect(){
      if(window.ethereum) {
        console.log('detected');
    
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setWalletAddress(accounts[0]);
          var advertiser = {
            address :accounts[0]
          }
          fetch('http://localhost:5000/advertiser/viewMarketplace?prod='+prod, {
                credentials : 'include'
            }).then(
            response => {return response.json()}
            //console.log(response)}
            ).then(
            async data => {
                console.log(data)
                setData(data)
                data.data.map(async d => {
                  
                  Object.assign(d, {company: data.name});
                  
                  console.log(d.tags)
                  console.log(d.score)
                  
                  
                  if(d.hasOwnProperty("adSlots") && d.adSlots.length > 0){
                    //var ipfsArr=[];
                    d.adSlots.map(async i => {
                      //Object.assign(d, {ipfs_url : "https://"+i+".ipfs.w3s.link/file2.json"})
                      console.log(i)
                      var response = await fetch(i.ipfsHash);

                      await provider.send("eth_requestAccounts", []);
                      var _signer = await provider.getSigner();
                      var contract = new ethers.Contract(contractInfo.address, yuuAuctionABI, _signer);
                      var c = await contract.adSlots(i.ipfsHash)
                      Object.assign(d, {ipfsHash : i.ipfsHash})
                      console.log(c)
                      
                      if(c.started === true){
                        if(!response.ok)
                          throw new Error(response.statusText);
                        //console.log(response)
                       
                        console.log(parseInt(c.highestBid._hex, 16))
                        

                        var json = await response.json();
                        Object.assign(d, json)
                        Object.assign(d, {started : true})
                        Object.assign(d, {currentBid1 : parseInt(c.highestBid._hex, 16)})
                        
                        console.log(ipfsData)
                        setIpfsData(prevState => [...prevState, d])
                      } 

                      
                    })
                    //setIpfsData(ipfsArr)

                  }
                  
 
                 })
            }
            )

        } catch (error) {
          console.log('Error connecting...');
        }
    
      } else {
        alert('Meta Mask not detected');
      }
    }
    connect();
    
  }, []);
  
  return (
    <div>
        <div className={`bg-primary ${styles.flexStart}`}>


        

        <form onSubmit={handleSubmit}>
        
        <section id="clients" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}>

    
        <div className="flex flex-wrap w-full fixed ml-50 top-20">

        <select onChange={onOptionChangeHandler1} className='appearance-none rounded-none  mt-10  w-80 inline
                   px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm' style={{position : 'absolute',left : '10%'}} >
  
              <option>What is your target demographic</option>
              {demo.map((option, index) => {
                  return <option key={index} >
                      {option}
                  </option>
              })}
            </select>


            <select onChange={onOptionChangeHandler2} className='appearance-none rounded-none absolute mt-10 left-100 w-80 inline
                   px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm' style={{position : 'absolute', left : '35%'}}>
  
              <option>What is your target country</option>
              {country.map((option, index) => {
                  return <option key={index} >
                      {option}
                  </option>
              })}
            </select>



            <select onChange={onOptionChangeHandler3}  className='appearance-none rounded-none absolute ml-80 mt-10 w-80 inline
                   px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm' style={{position : 'absolute', left : '40%'}}>
  
              <option>Basic tag</option>
              {basic_tags.map((option, index) => {
                  return <option key={index} >
                      {option}
                  </option>
              })}
            </select>

            

        <button
                    type="submit"
                    className={` 
                    py-2 px-4 border border-transparent mt-10 text-sm font-medium
                    rounded-md text-white bg-green hover:bg-blue-gradient
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    focus:ring-indigo-500`} style={{position : 'absolute', left : '90%'}}
                    
                >
                    
                    Apply filter
                </button>
           </div>
          


        
          
       
           <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container ">
           {
                   (ipfsData.length === 0) ? ( <p className='text-gradient'>Loading...</p>) : 
                       (   
                           <>

                                {
                                   
                               }
                               
                                  
                               
                                {
                                  
                                   ipfsData.map(d => {
                                    
                                      return(

                                        <AdSlotCard key={d.adSlots[c++]} {...d} />
                                     )

                                    })

                                    
                                       
                                       
                                   }
                               
                               
                               
                           </>
                       )
                }
                 
           </div>
           <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
               <br /><br /><br /><br /><br /><br /><br />
           </div>
           <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
               <br /><br /><br /><br /><br /><br /><br />
           </div>
           <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
               <br /><br /><br /><br /><br /><br />
           </div>
       
       </section>
       </form>
      

   </div>
    </div>
  )
}
