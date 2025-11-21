import { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Header from "./includes/Header";



export default function Coupon() {


const navigate = useNavigate();
const location = useLocation();

const [loading, setLoading] = useState(false);
const [loading2, setLoading2] = useState(false);
const [couponCode, setCouponCode] = useState('');
const [couponError, setCouponError] = useState('');
const [couponData, setCouponData] = useState('');
const [couponType, setCouponType] = useState('');
const [finalAmount, setFinalAmount] = useState('');
const [couponAmount, setCouponAmount] = useState('');
const [isChecked, setIsChecked] = useState(false);

const { planId, planName, planAmount } = location.state || {};



const getAccessToken = () => {
    //return localStorage.getItem('accessToken');
    let access_token = localStorage.getItem("access_token");
  
    // let access_token = getAccessToken();
    if (isTokenExpired(access_token)) {
      access_token = localStorage.getItem("refresh_token");
      refreshAccessToken();
    }
  
    return access_token;
  };
  
  
  
  const isTokenExpired = (token) => {
    // if (!token) return true;
    if (!token) {
      navigate("/login");
    }
  
    try {
      const decoded = jwtDecode(token);
      console.log("decoded token: ", decoded);
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Invalid token:", error);
      return true;
    }
  };


  const refreshAccessToken = async () => {
  
    let refresh_token = localStorage.getItem("refresh_token");
  
    const apiUrl = "/api/auth/refresh";
    const requestData = { refresh_token };
  
    console.log("request access token: ", requestData);
  
    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          Token: `Bearer ${refresh_token}`,
        },
      });
      if (response.status === 200) {
        console.log("API response new token:", response);
        localStorage.setItem("access_token", response.data.access_token);
      } else {
        console.error("error111 ", response);
      }
    } catch (error) {
     // setLoader("Response Loading...");
      console.error("Error calling API:", error);
    }
  };


const handleMyProfileClick = (userName,userEmail,userPhone)=>{

    navigate('/chat')
  }
  

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked); // true if checked, false if unchecked
  };


  const checkCoupon = async ()=>{

    
   
     try {
          
 
            if (couponCode!='') {
                setLoading(true);
         let access_token = getAccessToken();
         if (isTokenExpired(access_token)) {
           access_token = await refreshAccessToken();
         }
         if (!access_token) {
           console.error("Access token not found in session storage");
           return;
         }
     
          
          const apiUrl = "/api/check_coupon"; // Using Vite proxy
         // const apiUrl = "http://3.108.57.25:3300/get_last_chat_id"; 
         const requestData = {
             coupon_code: couponCode,
             subscription_id: planId,
            };
 
           
             console.log('request data ',requestData); 
            const response = await axios.post(apiUrl, requestData, {
             headers: {
                 "Content-Type": "application/json",
                 Token: `Bearer ${access_token}`,
               },
            });
      console.log('coupon response ',response);
        
          if (response.status === 200 ) {
           //
           console.log('coupon detail msg ',response.data.detail);
           setCouponError(response.data.detail)
           //setCouponError('')
           setLoading(false)
           setCouponData(response.data);
           setCouponType(response.data.coupons_type);
           if(response.data.detail=='' || response.data.detail==undefined){
            if(response.data.coupons_type=='flat'){
                setFinalAmount((planAmount-response.data.coupon_amount).toFixed(2))
                
               }
               else if(response.data.coupons_type=='percent'){
                setFinalAmount((planAmount-(planAmount*response.data.coupon_amount)/100).toFixed(2))
                
               }  
               setCouponAmount(response.data.coupon_amount.toFixed(2))
           }else{
            setFinalAmount(planAmount.toFixed(2));
           }
             
          } else {
          //
          }
        }else{
            setCouponError('Please enter coupon code');
        }
        } catch (error) {
          console.error("API Error new:", error);
        } finally {
        //  setLoading(false);
        }
 
 }



 const upgradePlan = async (planId,status)=>{


   
     try {
          setLoading2(true);
          if(status=='nothanks'){
            setCouponCode('');
          }
 
         let access_token = getAccessToken();
         if (isTokenExpired(access_token)) {
           access_token = await refreshAccessToken();
         }
         if (!access_token) {
           console.error("Access token not found in session storage");
           return;
         }

         let is_accept = '';
          if(isChecked==true){
             is_accept = 1
          }else{
             is_accept = 0
          }
          const apiUrl = "/api/add_subscription"; // Using Vite proxy
         // const apiUrl = "http://3.108.57.25:3300/get_last_chat_id"; 
         const requestData = {
             subscription_id: planId,
             coupon_code: couponCode,
             is_accept: is_accept,
            };
 
           /// console.log('request data add_subs ',requestData);
            const response = await axios.post(apiUrl, requestData, {
             headers: {
                 "Content-Type": "application/json",
                 Token: `Bearer ${access_token}`,
               },
            });
   /// console.log('subscription response ',response);
        
          if (response.status === 200 ) {
            
           
           // navigate(response.data.payment_page_url)

           localStorage.setItem('outlet_id',response.data.outlet_id)
           window.location.href = response.data.payment_page_url
           setLoading2(false)
          } else {
           // chatHistory("");
          }
        } catch (error) {
          console.error("API Error new:", error);
        } finally {
        //  setLoading(false);
        }
 
 }


  return (
    <div>
      
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
   

<Header handleMyProfileClick={handleMyProfileClick}></Header>
   


  


<main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
 



<div className="max-w-xl mx-auto mt-10 p-6 border  shadow-md bg-white">
      
<h3 className="text-center mb-2 mt-4 text-2xl font-medium text-gray-600 dark:text-gray-400 border-b pb-4">Apply Coupon</h3>
<div className="p-4 md:p-5 text-center mt-4">
                {/* <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg> */}
               {/*  <img src="special-offer.jpg"></img> */}
                {/* <h3 className="mb-2 mt-4 text-2xl font-medium text-gray-600 dark:text-gray-400 italic">{planName}</h3>
                <h3 className={`mb-2 mt-2 text-xl font-medium text-gray-500 dark:text-gray-400 italic ${couponType=='percent' || couponType=='flat'?'line-through':''}`}>AED {planAmount.toFixed(2)}</h3>
                
                <h3 className="mb-5 text-normal font-normal text-gray-500 dark:text-gray-400">
                Enter your coupon code to get more discount.
                </h3> */}
                 <label className="flex text-gray-600  items-start">Coupon Code</label> 

                 <div className="flex w-full gap-0">
                <input type="text" className="flex-1 p-2 border border-r-0 dark:bg-gray-700 dark:text-white" placeholder="Enter coupon code" 
                
                value={couponCode}
                onChange={(e => setCouponCode(e.target.value))}
                />
                <button data-modal-hide="popup-modal" type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium  text-sm px-5 py-2.5"
                onClick={()=>checkCoupon()}
                >
                   {loading?'...':'Apply'}
                </button>
                </div>

               


                <p className="text-left mb-6 -mt-0 text-red-500">{couponError}</p>
                {/* <span className="text-left justify-left text-green-700">
                    {couponData.coupons_type=='flat'?
                                    'Coupon Applied @ flat AED '+ couponData.coupon_amount
                                :couponData.coupons_type=='percent'?
                                'Coupon Applied @ '+ couponData.coupon_amount +'%' 
                                :''
                                }
                   </span> */}
                
                  {/*  {finalAmount!=''?
                  <h3 className="line-through mb-2 mt-8 text-2xl font-medium text-gray-500 dark:text-gray-400 italic">Total Amount AED {finalAmount}</h3>
                  :''}  */}
                   

                

                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
                            
                            <tbody>
                                <tr className="border border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                                    Total Amount
                                    </th>
                                    
                                    <td className="px-6 py-4 text-right">
                                      AED {planAmount.toFixed(2)}
                                    </td>
                                </tr>
                                   {couponType=='percent' || couponType=='flat'?
                                   <>
                                  <tr className="border dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        Discount
                                    </th>
                                
                                    
                                    <td className="px-6 py-4 text-right">
                                      {couponType=='flat'?'AED':''}   {couponAmount} {couponType=='percent'?'%':''}
                                    </td>

                                </tr>

                                <tr className="border dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        Amount Payable
                                    </th>
                                
                                    
                                    <td className="px-6 py-4 text-right">
                                        AED {finalAmount!=''?finalAmount:planAmount.toFixed(2)}
                                    </td>
                                </tr>  
                                
                                </>
                                :''}
                                
                            </tbody>
                        </table>
                    </div>




                {/*  <h3 className={`mb-2 mt-8 text-2xl font-medium text-gray-500 dark:text-gray-400 ${couponType=='percent' || couponType=='flat'?'':''}`}>Total Amount AED {finalAmount!=''?finalAmount:planAmount.toFixed(2)}</h3>  */}

                  <div className="flex mt-4 border p-4 my-4 ">
                    <label>
                    <span className="text-gray-500 text-sm  items-start ">
                      
                      <span className="mt-4">

                      <input type="checkbox" 
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                     className="checkbox-large"
                      />
                        </span>
                        &nbsp; 
                        <span className="text-base">
                        Securely save my card for auto-renewal of my subscription 
                        </span>
                        
                      </span>
                      </label>
                  </div>

                    <div className="flex gap-4">
                    <a data-modal-hide="popup-modal" type="button" className="mt-2 text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium  text-sm inline-flex items-center justify-center px-5 py-2.5 text-center w-full"
                 href="/subscription"
                  >
                  Choose different plan
                </a> 

                
                  <button data-modal-hide="popup-modal" type="button" className="mt-2 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium  text-sm inline-flex items-center justify-center px-5 py-2.5 text-center w-full"
                  onClick={()=>upgradePlan(planId,'ok')}
                  >
                  {/* {loading?'Please wait...':'Proceed to pay AED '+finalAmount}  */}
                  {loading2?'Please wait...':finalAmount!=''?'Proceed to pay AED '+finalAmount:'Proceed to pay AED '+planAmount.toFixed(2)}
                </button>

                    </div>
                  
                    {finalAmount?
                    <p className="mt-8 text-gray-500 ">When plan renew, normal rate will be applied</p>
                    :''}
              {/*  <a className="cursor-pointer underline" onClick={()=>upgradePlan(planId,'nothanks')}><h3 className="mt-4 text-normal font-normal text-gray-500 dark:text-gray-400">{loading?'Please wait...':'No Thanks'}</h3></a> */}
               
            </div>

     
    </div>
  




</main>







  </div>


</div>
  
  );


}

