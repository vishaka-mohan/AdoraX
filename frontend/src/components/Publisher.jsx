import React from 'react';
import { discount, robot, galaxy } from "../assets";
import {useState, useEffect} from 'react'
import styles from "../style";
import {  Business, Billing, CardDeal, Testimonials, Footer, Navbar,  Hero } from "./";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
//import * as PushAPI from "@pushprotocol/restapi";
import {ethers} from 'ethers'
function Publisher () {

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner()
    const [walletAddress, setWalletAddress] = useState("Get Started");
    const [name, setName] = useState("");
    const [landingUrl, setlandingUrl] = useState("")
    const [additionalUrl, setAdditionalUrl] = useState("")
    const [error, setError] = useState("")
    const [demographic, setDemographic] = useState('')
    const [country,setCountry] = useState('');
    const [tags,setTags] = useState('')
    const demo = ['all age groups', 'adults only(above 18)', 'adult females', 'adult males', 'teenagers(13-19)', 'young adults(20s)', 'senior citizens', 'kids'];
    const countries = ['india', 'pakistan', 'sri lanka', 'us', 'canada', 'australia', 'uk', 'france', 'russia', 'japan']
    const basic_tags = ['beauty', 'sports', 'automobile', 'technology', 'education', 'programming', 'footwear', 'hair-care', 'groceries', 'phenyls']
    const onOptionChangeHandler = (event) => {
        console.log("User Selected Value - ", event.target.value)
        setDemographic(event.target.value)
    }

    const onCountryChangeHandler = (event) => {
      console.log("User Selected Value - ", event.target.value)
      setCountry(event.target.value)
  }

  const onTagChangeHandler = (event) => {
    console.log("User Selected Value - ", event.target.value)
    setTags(event.target.value)
}

    
  
    useEffect(() => {
    
      async function connect(){
        if(window.ethereum) {
          console.log('detected');
      
          try {
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            setWalletAddress(accounts[0]);
            var publisher = {
                address :accounts[0]
              }
            const res = await axios.post('http://localhost:5000/publisher/publisherLogin', publisher, {
              withCredentials: true
            })
            if(res.data.status==='error'){
                console.log("not exists");
            }
            else if(res.data.status==='authenticated'){
                console.log('exists')
               RedirectToDashboard();
            }
        
          
          


          } catch (error) {
            console.log(error)
            console.log('Error connecting...');
          }
      
        } else {
          alert('Meta Mask not detected');
        }
      }
      connect();
      
    }, []);
  
    const RedirectToDashboard = ()=>{
        const navigate = useNavigate();
        navigate(`/publisherDashboard`);
    }
      
    
  //   const subscribe = async(req,res)=>{
  //     await PushAPI.channels.subscribe({
  //     signer: signer,
  //     channelAddress: 'eip155:5:0x24F64cdc93003787a23AEcaCd0482B89A9E645a1', // channel address in CAIP
  //     userAddress: `eip155:5:${walletAddress}`, // user address in CAIP
  //     onSuccess: () => {
  //     console.log('opt in success');
  //     },
  //     onError: (err) => {
  //       console.log(err)
  //       console.error('opt in error');
  //     },
  //     env: 'staging'
  //   })
  // }
  
  
    const handleSubmitRegister = async (e) => {
      e.preventDefault();
      
      var publisher = {} 
      publisher.name = name
      publisher.landingUrl = landingUrl
      publisher.address = walletAddress
      publisher.additionalUrl = additionalUrl
      publisher.target_demographic = demographic
      publisher.target_country = country;
      publisher.basic_tags = tags;
     // console.log(domain)
  
      console.log(publisher)
      axios.post('http://localhost:5000/publisher/publisherRegister', publisher, {
          withCredentials: true
      })
      .then(async res=> {console.log(res.data)
          if(res.data.status === 'error'){
              console.log('here')
              setError('')
              
              if(res.data.error === "address already exists")
              setError(res.data.error)
              
          }
          else{
              //await subscribe();
              setError('Congratulations! you are successfully registered')
              setName('')
              setlandingUrl('')
              setAdditionalUrl('')
              

              
             
          }
      
      
      })
      .catch(err=>console.log(err.response.data));
      
  
  
  }
     
  
  
  
      return (
          <>
          <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                  <div className={`${styles.boxWidth}`}>
                      <Navbar />
                  </div>
           </div>
           <div className={`bg-primary ${styles.flexStart}`}>
               <section id="home" className={`flex md:flex-row flex-col `}>
        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
          
          <div className="flex flex-row justify-between items-center w-full">
            <h1 className="flex-1 font-poppins font-semibold ss:text-[40px] text-[20px] text-white ss:leading-[100.8px] leading-[75px]">
              Directly connect with advertisiers and eliminate all
                  <span className='text-gradient'> middlemen</span>
            </h1>
            
          </div>
  
          
        </div>
  
        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <form  className='mt-8 space-y-6' onSubmit={handleSubmitRegister}>
          <br /><br />
          {
              (error !== '') ? (<p style={{fontSize : 12, color: 'white'}}>{error}</p>) : (<p></p>)
          }
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gradient">Sign up today to try it out</h2>
        <br />
             
              <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    className="appearance-none rounded-none relative block
                    w-full px-3 py-2 border border-gray-300
                    placeholder-gray-500 text-gray-900 rounded-t-md
                    focus:outline-none focus:ring-indigo-500
                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
              </div>
  
              <div>
                  <label htmlFor="description" className="sr-only">
                    Landing URL
                  </label>
                  <input
                    id="landingUrl"
                    name="landingUrl"
                    type="text"
                    required
                    value={landingUrl}
                    className="appearance-none rounded-none relative block
                    w-full px-3 py-2 border border-gray-300
                    placeholder-gray-500 text-gray-900 rounded-t-md
                    focus:outline-none focus:ring-indigo-500
                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder=" Landing URL"
                    onChange={(e) => setlandingUrl(e.target.value)}
                  />
              </div>
  
              <div>
                  <label htmlFor="domain" className="sr-only">
                    Additional URL
                  </label>
                  <input
                    id="additionalUrl"
                    name="additionalUrl"
                    type="text"
                    value={additionalUrl}
                    required
                    className="appearance-none rounded-none relative block
                    w-full px-3 py-2 border border-gray-300
                    placeholder-gray-500 text-gray-900 rounded-t-md
                    focus:outline-none focus:ring-indigo-500
                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Additional URL (Space separated)"
                    onChange={(e) => setAdditionalUrl(e.target.value)}
                  />
              </div>   
              <div>
                 
              <select onChange={onOptionChangeHandler}  className="appearance-none rounded-none relative block
                    w-full px-3 py-2 border border-gray-300
                    placeholder-gray-500 text-gray-900 rounded-t-md
                    focus:outline-none focus:ring-indigo-500
                    focus:border-indigo-500 focus:z-10 sm:text-sm">
  
              <option>What is your target demographic</option>
              {demo.map((option, index) => {
                  return <option key={index} >
                      {option}
                  </option>
              })}
            </select>

              </div>  

              <div>
                 
                 <select onChange={onCountryChangeHandler}  className="appearance-none rounded-none relative block
                       w-full px-3 py-2 border border-gray-300
                       placeholder-gray-500 text-gray-900 rounded-t-md
                       focus:outline-none focus:ring-indigo-500
                       focus:border-indigo-500 focus:z-10 sm:text-sm">
     
                 <option>What is your target country</option>
                 {countries.map((option, index) => {
                     return <option key={index} >
                         {option}
                     </option>
                 })}
               </select>
   
                 </div> 

                 <div>
                 
                 <select onChange={onTagChangeHandler}  className="appearance-none rounded-none relative block
                       w-full px-3 py-2 border border-gray-300
                       placeholder-gray-500 text-gray-900 rounded-t-md
                       focus:outline-none focus:ring-indigo-500
                       focus:border-indigo-500 focus:z-10 sm:text-sm">
     
                 <option>Select some basic tags to get started</option>
                 {basic_tags.map((option, index) => {
                     return <option key={index} >
                         {option}
                     </option>
                 })}
               </select>
   
                 </div> 
  
              <div hidden>
                  <label htmlFor="address" className="sr-only">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value = {walletAddress}
                    className="appearance-none rounded-none relative block
                    w-full px-3 py-2 border border-gray-300
                    placeholder-gray-500 text-gray-900 rounded-t-md
                    focus:outline-none focus:ring-indigo-500
                    focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="address"
                    onChange={(e) => setWalletAddress(e.target.value)}
                  />
              </div>      
  
              
              <br /><br />
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
                  Sign up
                </button>
              </div>  
         
                      
  
  
          <br /><br /><br /><br /><br /><br />
          
       </form>
         
        </div>
  
        
      </section>
      </div>
      
          </>
      );
  
  }
  
  
  export default Publisher;