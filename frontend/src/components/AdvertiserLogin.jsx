import React from 'react';
import { discount, robot, galaxy } from "../assets";
import {useState, useEffect} from 'react'
import styles from "../style";
import { Business, Footer, Navbar,  Hero } from "./";


function AdvertiserLogin () {


   



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
      <form  className='mt-8 space-y-6'>
        <br /><br />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gradient">Sign in to your account now</h2>
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
                  className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                />
            </div>

            

                

            <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
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
                Sign in
              </button>
            </div>  
        <br />
            <div className="flex items-center justify-between">
              
              <div className="text-sm">
                <a href="/advertiser" className="font-medium text-gradient hover:text-indigo-500">
                  Don't have an account? Sign up
                </a>
              </div>
            </div>

            <br /><br /><br /><br /><br /><br />        



        
     </form>
       
      </div>

      
    </section>
    </div>
        </>
    );

}


export default AdvertiserLogin;