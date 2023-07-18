import React from 'react';
import { discount, robot, galaxy } from "../assets";
import {useState, useEffect} from 'react'
import styles from "../style";
import {  Business, Billing, CardDeal, Testimonials, Footer, Navbar,  Hero } from "./";
import axios from 'axios';


function Advertiser () {

  
  const [walletAddress, setWalletAddress] = useState("Get Started");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("")
  const [domain, setDomain] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {

    async function connect(){
      if(window.ethereum) {
        console.log('detected');
    
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setWalletAddress(accounts[0]);
        } catch (error) {
          console.log('Error connecting...');
        }
    
      } else {
        alert('Meta Mask not detected');
      }
    }
    connect();
    
  }, []);





  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    
    var advertiser = {} 
    advertiser.name = name
    advertiser.description = description
    advertiser.address = walletAddress
    advertiser.domain = domain
    console.log(domain)

    
    axios.post('http://localhost:5000/advertiser/advertiserRegister', advertiser, {
        withCredentials: true
    })
    .then(res=> {console.log(res.data)
        if(res.data.status === 'error'){
            console.log('here')
            setError('')
            
            if(res.data.error === "address already exists")
            setError(res.data.error)
            
        }
        else{
            setError('Congratulations! you are successfully registered')
            setName('')
            setDomain('')
            setDescription('')
            
           
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
            Directly transact with publishers and advertise your products with 
                <span className='text-gradient'> maximum transparency</span>
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
                  Company description
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  required
                  value={description}
                  className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Company description"
                  onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="domain" className="sr-only">
                  Domain
                </label>
                <input
                  id="domain"
                  name="domain"
                  type="text"
                  value={domain}
                  required
                  className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Domain"
                  onChange={(e) => setDomain(e.target.value)}
                />
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


export default Advertiser;