import React from 'react';
import {useState, useEffect} from 'react'
//import * as PushAPI from "@pushprotocol/restapi";
import Notifications from './Notifications';
import axios from 'axios';
function PublisherAdBids () {
    const [notifications,setNotifications] = useState([])
    const [walletAddress,setWalletAddress] = useState([])
    useEffect(() => {
        //console.log(window.location.pathname)
      //   const fetchNotifs = async() => {
      //     console.log("fetching")
      //     const notifications = await PushAPI.user.getFeeds({
      //         user: `eip155:5:${walletAddress}`, // user address in CAIP
      //         env: 'staging'
      //     });
      //     setNotifications(notifications)
      //     console.log('Notifications: \n\n', notifications);
          
      // }
      async function connect(){
        if(window.ethereum) {
          console.log('detected');
      
          try {
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            setWalletAddress(accounts[0]);
          } catch (error) {
            console.log(error)
            console.log('Error connecting...');
          }
      
        } else {
          alert('Meta Mask not detected');
        }
      }

     
      connect();
      //fetchNotifs();
      
      
    }, [walletAddress]);

    return (
        <div>
            {/* {notifications && (
                <Notifications notifications = {notifications}></Notifications>
            )} */}
        </div>
    )
}



export default PublisherAdBids;