import { quotes } from "../assets";
import { useNavigate } from "react-router-dom";



const ProductCard = ({ _id, company, name, description, category,demographic, tag_line, url, picture }) => {
  
  const navigate = useNavigate();
  
  return (


  <div className="flex justify-between flex-col px-10 py-12 rounded-[20px]  ml-11 max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card"  onClick={() => navigate('/advertiserMarketplace?prod='+ _id)} >
    <img src={picture} alt={name} className="w-[60px] h-[60px] rounded-full" />
    <p className="font-poppins font-bold text-[18px] leading-[32.4px] text-white my-2 text-gradient" >
      {name}
    </p>

    <p className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-2">
      {description}
    </p>

    
    <div className="flex flex-row">
      
      <div className="flex flex-col">
        <h4 className="font-poppins font-semibold text-[20px] leading-[32px] text-white">
          {company}
        </h4>
        <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite">
          {tag_line}
        </p>
      </div>
    </div>
  </div>
);
}

export default ProductCard;
