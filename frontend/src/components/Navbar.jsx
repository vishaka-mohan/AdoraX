import { useEffect, useState } from "react";

import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";
import { ethers } from 'ethers';
import axios from 'axios'

const Navbar =  () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [walletAddress, setWalletAddress] = useState("Get Started");
  const [advertiserStatus, setAdvertiserStatus] = useState('')
  const [publisherStatus, setPublisherStatus] = useState('')
  

  useEffect(() => {

    async function connect(){
      if(window.ethereum) {
        console.log('detected');
    
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          console.log(accounts[0])
          setWalletAddress(accounts[0]);
          var address = {
            address :accounts[0]
          }
          axios.post('http://localhost:5000/advertiser/advertiserLogin', address, {
              withCredentials: true
          })
          .then(res=> {console.log(res.data)
              if(res.data.status === 'error'){
                 console.log('not exists') 
                 setAdvertiserStatus('/advertiser')
              }
              else{
                  console.log('advertiser exists')
                  setAdvertiserStatus('/advertiserDashboard')
              }
              axios.post('http://localhost:5000/publisher/publisherLogin', address, {
            withCredentials: true
        })
        .then(res=> {console.log(res.data)
          console.log('publisher check')
            if(res.data.status === 'error'){
               console.log('not exists') 
               setPublisherStatus('/publisher')
            }
            else{
                console.log('publisher exists')
                setPublisherStatus('/publisherDashboard')
            }
        
        
        })
          .catch(err=>console.log(err.response.data));
          
          
          })
          

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
    <nav className="w-full flex py-6 justify-between items-center navbar">
      {/* <img src={logo} alt="hoobank" className="w-[100px] h-[100px]" style={{borderRadius: '50%'}} /> */}
      <i><h2 style={{color: 'yellow', fontSize: '30px', fontWeight: 'bold'}}>AdoraX</h2></i>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        
          <li
            key={"home"}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === "Home" ? "text-white" : "text-dimWhite"
            } mr-10`}
            onClick={() => setActive("Home")}
          >
            <a href={`/`}>{"Home"}</a>
          </li>


          <li
            key={"advertiser"}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === "Advertiser" ? "text-white" : "text-dimWhite"
            } mr-10`}
            onClick={() => setActive("Advertiser")}
          >
            <a href={advertiserStatus}>{"Advertiser"}</a>
          </li>

          <li
            key={"publisher"}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === "Publisher" ? "text-white" : "text-dimWhite"
            } mr-10`}
            onClick={() => setActive("Publisher")}
          >
            <a href={`${publisherStatus}`}>{"Publisher"}</a>
          </li>

          <li
            key={"getStarted"}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === "Get Started" ? "text-white" : "text-dimWhite"
            } mr-10`}
            onClick={() => setActive("Get Started")}
          >
            <a href={`#${"getStarted"}`}>{walletAddress}</a>
          </li>
            
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
