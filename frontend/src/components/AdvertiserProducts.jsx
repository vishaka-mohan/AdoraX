import React from 'react';
import {useState, useEffect} from 'react'
import styles from "../style";
import { ProductCard } from "./";
import {people01, people02, people03} from "../assets"
import axios from 'axios'
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";

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


function AdvertiserProducts () {
    
    let subtitle;
    const [data, setData] = useState([{}])
    const [modalOneIsOpen, setOneIsOpen] = React.useState(false);
    const [walletAddress, setWalletAddress] = useState('')
    const [state, setState] = useState(true)
    const [success, setSuccess] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [tag_line, setTagline] = useState('')
    const [demographic, setDemographic] = useState('')
    const [url, setURL] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const demo = ['all age groups', 'adults only(above 18)', 'adult females', 'adult males', 'teenagers(13-19)', 'young adults(20s)', 'senior citizens', 'kids'];
    const onOptionChangeHandler = (event) => {
        console.log("User Selected Value - ", event.target.value)
        setDemographic(event.target.value)
    }
    const navigate = useNavigate();


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


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProd = new FormData();
        newProd.append( "file" , selectedFile)
        newProd.append( "name" , name)

        
        newProd.append( "description" , description)
        newProd.append( "address", walletAddress)
        newProd.append( "url", url)
        newProd.append( "tag_line",tag_line)
        newProd.append( "category", category)
        newProd.append( "demographic", demographic)
        newProd.append( "address", walletAddress)
        console.log(newProd)
       
        axios.post('http://localhost:5000/advertiser/addNewProduct', newProd, {
            withCredentials: true
        })
        .then(res=> {console.log(res.data)
           
        if(res.data.message === "succesfully posted"){
            setSuccess('Succesfully posted')
            setData(res.data)
        }
        else{
            setSuccess('Oops! there was an error')
        }
        
        })
        .catch(err=>console.log(err.response.data));
        

    
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
          var advertiser = {
            address :accounts[0]
          }
          fetch('http://localhost:5000/advertiser/allProducts?address='+accounts[0], {
                credentials : 'include'
            }).then(
            response => {return response.json()}
            //console.log(response)}
            ).then(
            data => {
              console.log('data')
                console.log(data)
                setData(data)
                
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
  


   

    var card = {
        id : "card-1",
        name : "The Verge",
        size : "5x3",
        position : "left of the screen",
        date : "23/12/2022",
        category : 'technology news website',
        img : people01
    }

    var product_card = {
        id : "card-1",
        company : "Loreal",
        name : "Breakage control shampoo",
        description : "Hair-fall control shampoo with keratin goodness",
        category : "shampoo, hair-care, beauty, hair-fall",
        demographic : "all age groups",
        tag_line : "Simply beautiful",
        url: "www.loreal.com/breakage-control",
        img : people01
    }

    var product_card1 = {
        id : "card-2",
        company : "Loreal",
        name : "Matte lipstick",
        description : "Smudge-proof long-lasting matte lipstick",
        category : "beauty, make-up, lipstick",
        demographic : "all age groups",
        tag_line : "Simply beautiful",
        url: "www.loreal.com/matte-lipstick",
        img : people02
    }

    var product_card2 = {
        id : "card-3",
        company : "Loreal",
        name : "Ultra-precise Eye-liner",
        description : "Smudge-proof waterproof matte black eyeliner",
        category : "beauty, make-up, eyeliner",
        demographic : "all age groups",
        tag_line : "Simply beautiful",
        url: "www.loreal.com/matte-eyeliner",
        img : people03
    }

    return (
        <>

        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <div className='w-full flex py-6 justify-between items-center navbar'>
                    <div className='login-modal'>
                    <button
                    type="submit"
                    className={`absolute left-8 mt-5
                    py-2 px-4 border border-transparent text-sm font-medium
                    rounded-md text-white bg-green hover:bg-blue-gradient
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    focus:ring-indigo-500`}
                    onClick={openModalOne}
                    style={{pointer : 'cursor'}}
                >
                    
                    Add new product
                </button>
                    
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
                        
                            
                            
                            
    
    
                        
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gradient" style={{fontSize : 30}}>Add new product</h2>
                                {
                                        (success !== '') ? (<p style={{fontSize : 12, color: 'green'}}>{success}</p>) : (<p></p>)
                                }
                            <form onSubmit={handleSubmit}>
                            <br /><br />
        
      
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
                  className="appearance-none rounded-none absolute ml-8 w-80 block
                   px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
            </div>

            <br /><br />

            <div>
                <label htmlFor="description" className="sr-only">
                  Product description
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  required
                  value={description}
                  className="appearance-none rounded-none absolute ml-8 w-80 block
                  px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Company description"
                  onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <br /><br />

            <div>
                <label htmlFor="category" className="sr-only">
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={category}
                  required
                  className="appearance-none rounded-none absolute ml-8 w-80 block
                   px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Category"
                  onChange={(e) => setCategory(e.target.value)}
                />
            </div>  

            <br /><br />


            <div>
                <label htmlFor="url" className="sr-only">
                  URL
                </label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={url}
                  required
                  className="appearance-none rounded-none absolute ml-8 w-80 block
                   px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="URL"
                  onChange={(e) => setURL(e.target.value)}
                />
            </div>    

            <br /><br />

            <div>
                <label htmlFor="tag_line" className="sr-only">
                  Tag Line
                </label>
                <input
                  id="tag_line"
                  name="tag_line"
                  type="text"
                  value={tag_line}
                  required
                  className="appearance-none rounded-none absolute ml-8 w-80 block
                   px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Tag Line"
                  onChange={(e) => setTagline(e.target.value)}
                />
            </div>  

            <br /> <br />


            <select onChange={onOptionChangeHandler} className='appearance-none rounded-none absolute ml-8 w-80 block
                   px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm'>
  
              <option>What is your target demographic</option>
              {demo.map((option, index) => {
                  return <option key={index} >
                      {option}
                  </option>
              })}
            </select>


              

            <br /><br />


            <input type="file" id={"selectedFile"} className='absolute ml-8 text-white' name={"selectedFile"} onChange={(e) => setSelectedFile(e.target.files[0]) }/>
                                        

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
         </div>
        
        
        
         <div className={`bg-primary ${styles.flexStart}`}>
        
             <section id="clients" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}>
               
            
                <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative">
                {
                        (typeof data.allProds === 'undefined') ? ( <p className='text-gradient'>Loading...</p>) :
                            (   
                                <>
                                    {
                                        console.log(data.allProds)
                                    }
                                    {
                                        data.allProds.map(d => {
                                            Object.assign(d, {company: data.name});
                                            return(
                                                <ProductCard key={d._id} {...d}   />
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
                    <br /><br /><br /><br />
                </div>
            
            </section>
           

        </div>
       
       
    </>
);

}


export default AdvertiserProducts;