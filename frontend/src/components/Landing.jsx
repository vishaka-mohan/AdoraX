import React from 'react';

import { useEffect} from 'react'
//import * as PushAPI from "@pushprotocol/restapi";
import {ethers} from 'ethers'
import styles from "../style";
import { Web3Storage } from 'web3.storage'

import { Business, Footer, Navbar,  Hero, } from "./";




function Landing () {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    console.log(signer)

    const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFBOEQ0QzMwNmI4ZjhjNjZCMTQyN2Y3NEIzZjlDNTI2YzE0RTFDRWEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjkwOTc5NDk3MjksIm5hbWUiOiJ5dXUifQ.t8HIerpToxPT9zgQzsZlAJeCWIBnZqlAaSOoZVkVUnw" })

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
  
    useEffect(() => {
      //console.log(window.location.pathname)
    //   const fetchNotifs = async() => {
    //     console.log("fetching")
    //     const notifications = await PushAPI.user.getFeeds({
    //         user: 'eip155:5:0x2c7AC7B82798C25E2f985318F8E8dF2ef96d5c7B', // user address in CAIP
    //         env: 'staging'
    //     });
    
    //     console.log('Notifications: \n\n', notifications);
    // }

    // const subscribe = async(req,res)=>{
    //     await PushAPI.channels.subscribe({
    //     signer: signer,
    //     channelAddress: 'eip155:5:0x24F64cdc93003787a23AEcaCd0482B89A9E645a1', // channel address in CAIP
    //     userAddress: 'eip155:5:0x2c7AC7B82798C25E2f985318F8E8dF2ef96d5c7B', // user address in CAIP
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

    // const unsubscribe = async()=>{
    //   await PushAPI.channels.unsubscribe({
    //     signer: signer,
    //     channelAddress: 'eip155:5:0x24F64cdc93003787a23AEcaCd0482B89A9E645a1', // channel address in CAIP
    //     userAddress: 'eip155:5:0x2c7AC7B82798C25E2f985318F8E8dF2ef96d5c7B', // user address in CAIP
    //     onSuccess: () => {
    //      console.log('opt out success');
    //     },
    //     onError: (err) => {
    //       console.log(err)
    //       console.error('opt out error');
    //     },
    //     env: 'staging'
    //   })
    // }
   // subscribe();
   // unsubscribe();
    //fetchNotifs();
    
  }, []);
    

    return (
        <div className="Landing">
            <div className="bg-primary w-full overflow-hidden">
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar />
                </div>
                </div>

                <div className={`bg-gray-gradient ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Hero />
                </div>
                </div>
                
                <div className={`bg-gray-gradient ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    
                    <Business />
                    
                    <Footer />
                </div>
                </div>
            </div>
          </div> 
    );

}


export default Landing;