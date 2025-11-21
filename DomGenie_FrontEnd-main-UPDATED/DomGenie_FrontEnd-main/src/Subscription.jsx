import { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Header from "./includes/Header";

export default function Subscription() {

const [showThreeDot,setShowThreeDot] = useState(false)
const [showApps,setShowApps] = useState(false)
const [showProfile,setShowProfile] = useState(false)
const [subscription,setSubscription] = useState(false)
const [message,setMessage] = useState('')
const [userSubscriptionId,setUserSubscriptionId] = useState('')
const [showModal,setShowModal] = useState(false)
const [upgradePlanText,setUpgradePlanText] = useState('Upgrade Plan')
const [loading,setLoading] = useState(false)
const [clckedPlan,setClickedPlan] = useState('')
const [planCategory,setPlanCategory] = useState('Pro Plan')
const [couponModal,setCouponModal] = useState(false)
const [planName,setPlanName] = useState(false)
const [planAmount,setPlanAmount] = useState(false)

const navigate = useNavigate();



const storedSubscriptionId = localStorage.getItem("userSubscriptionId");
//const subscriptionEndDate = localStorage.getItem("subscriptionEndDate");
//const subscriptionEndDate = new Date('10-05-2025')

const subscriptionEndDateStr = localStorage.getItem("subscriptionEndDate");
const subscriptionEndDate = new Date(subscriptionEndDateStr);
const currentDate = new Date();


const is_subscription = localStorage.getItem("is_subscription");
const coupon_percent = localStorage.getItem("coupon_percent");
const coupon_amount = localStorage.getItem("coupon_amount");
  const isSequence = localStorage.getItem('is_sequence') 

  // Initialize selectedPlan: Use stored value OR default to the first plan
  const [selectedPlan, setSelectPlan] = useState(
    storedSubscriptionId ? Number(storedSubscriptionId) : subscription.length > 0 ? subscription[0].plan_id : null
  );




useEffect(() => {
    getSubscription();
  
   // setUserSubscriptionId(localStorage.getItem("userSubscriptionId"))
  if (selectedPlan !== null) {
      localStorage.setItem("userSubscriptionId", selectedPlan);
    }
  }, [selectedPlan]);

/*   useEffect(() => {
    getSubscription();
  
  },[]); */



const closeSubscriptionScreen = ()=>{

  navigate('/chat')

}



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
  
    const apiUrl = "/api/refreshToken";
    const requestData = { refresh_token };
  
    console.log("request access token: ", requestData);
  
    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          Authorization: `Bearer ${refresh_token}`,
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
  
  

const applyCoupon = async (planId,planName,planAmount)=>{

  //setCouponModal(true)
  //setPlanName(planName);
  //setPlanAmount(planAmount);
  navigate('/coupon',{state:{planId:planId,planName:planName,planAmount:planAmount}})
  
}




const getSubscription = async () => {
    try {
     // setLoading(true);
      
      const apiUrl = "/api/get_subscription"; // Using Vite proxy
     // const apiUrl = "http://3.108.57.25:3300/get_last_chat_id"; 
  
        const response = await axios.post(apiUrl, {}, {
          headers: {
            "Content-Type": "application/json",
          
          },
        });
  console.log('subscription test ',response);
    
      if (response.status === 200 ) {
        setSubscription(response.data.subscriptions)
      } else {
       // chatHistory("");
      }
    } catch (error) {
      console.error("API Error new:", error);
    } finally {
    //  setLoading(false);
    }
  };



  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };

  function parseDMY(dateStr) {
    const [day, month, year] = dateStr.split("-");
    return new Date(`${year}-${month}-${day}`); // now in YYYY-MM-DD
  }

 

  // Free plan array
  const free_plan_content = [

    
    "10-Day Free Trial – Unlock the power of DomGenie",
    "Ask up to 5 questions per day",
    "Best-Structured Answers in the Card Payments Domain – Clear, expert-level insights",
    "Limited Topics in Free Plan – Access only a subset of DomGenie’s expertise.",
    "No Credit Card Required – Just sign up and start learning",
    "After 10 days, shift to DomGenie Pro for continued access",
    "Start Your Free Trial Today!"
  ]

  
  const interview_plan_content = [

    
    "Master the Core of Card Payments in Just 5 Days",
    "100 Questions Per Day – Power through 500 expert-level questions",
    "Focused Prep for Interviews – Sharpen your understanding of card and payment systems quickly",
    "Best-Structured Answers in the Card Payments Domain – Clear, concise, and interview-ready insights",
    "Affordable, high-impact preparation for your interview",
    "Full Access to All Topics – Includes questions from all existing and upcoming DomGenie modules"
   
  ]

  
  const prop_plan_monthly_content = [

   
    "20 Questions Per Day – Get expert insights into payment systems",
    "Full Monthly Access – Stay informed with structured answers every day",
    "Best-Structured Answers in the Card Payments Domain – Clear, research-backed insights",
    "Perfect for continuous support in your day-to-day work or learning journey",
    "Full Access to All Topics – Get insights on all current and future topics supported by DomGenie.",
    "Stay ahead in the payments industry – Subscribe Now!"
   
  ]


  const prop_plan_quaterly_content = [

   
    "20 Questions Per Day – Get expert insights into payment systems",
    "Full Monthly Access – Stay informed with structured answers every day",
    "Best-Structured Answers in the Card Payments Domain – Clear, research-backed insights",
    "A cost-effective solution for ongoing learning",
    "Full Access to All Topics – Get insights on all current and future topics supported by DomGenie.",
    "Stay ahead in the payments industry – Subscribe Now!"
   
  ]


 
  const pro_max_plan_monthly_content = [

   
    "Unlock the Full Potential of DomGenie with the Pro Max Plan",
    "Get 89 well-structured questions every day – designed to build real knowledge, not just surface answers.",
    "Just started working in the Card Payments domain? This plan is made for you.",
    "Gain clarity on complex concepts with expert-backed, easy-to-understand explanations.",
    "Covers every topic supported by DomGenie, including new additions each month.",
    "All this at just 70 AED/month – the smartest investment in your career foundation."
   
  ]



  const pro_max_plan_quaterly_content = [

   
    "Unlock the Full Potential of DomGenie with the Pro Max Plan",
    "Get 89 well-structured questions every day – designed to build real knowledge, not just surface answers.",
    "Just started working in the Card Payments domain? This plan is made for you.",
    "Gain clarity on complex concepts with expert-backed, easy-to-understand explanations.",
    "Covers every topic supported by DomGenie, including new additions each month.",
    "All this at just 171 AED/3 months – the smartest investment in your career foundation."
   
  ]

  
  const enterprise_plan_content = [

   
    "Unlimited Questions – No daily limits, unlimited AI interactions",
    "Custom RAG Model – AI fine-tuned to your business needs",
    "Exclusive Enterprise Enhancements – Deeper insights & advanced retrieval",
    "API & Business Support – Seamless integration for large-scale usage",
    "Customizable Topic Access – Get insights on all current and future topics, plus the ability to add custom topics tailored to your business needs.",
    "Contact Us for a Custom Solution at enterprise@domgenie.ai"
   
  ]
  
  


  const subscriptionName = [
      "Free Plan",
      "Interview Plan",
      "Pro Plan",
      "Enterprise Plan"
  ]


  

  const handleMyProfileClick = (userName,userEmail,userPhone)=>{

    navigate('/chat')
  }


  return (
    <div>
      
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
   

<Header handleMyProfileClick={handleMyProfileClick}></Header>
   


  


<main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
 


<section className="text-gray-600 body-font overflow-hidden">

<button
     onClick={closeSubscriptionScreen}  // Function to handle close
    className="absolute top-24 right-12 text-gray-500 hover:text-gray-700 hidden md:block"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-10 h-10"

    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <div className=" px-5 py-8 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Pricing </h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">Choose the best plan for your requirement</p>

      {subscriptionEndDate < currentDate ? (
        <p className="lg:w-2/3 mx-auto leading-relaxed text-sm text-gray-500 mt-4">
         {/*  Your current plan expired on {subscriptionEndDateStr} */}
         Your current plan expires on {subscriptionEndDateStr}
        </p>
      ) : (
        <p className="lg:w-2/3 mx-auto leading-relaxed text-sm text-gray-500 mt-4">
         Your current plan expires on {subscriptionEndDateStr}
        </p>
      )}

      {console.log(localStorage.getItem("coupon_data"))}
      
       {/* <div className="flex mx-auto border-2 border-[#6f551e] rounded overflow-hidden mt-6">
          <button className={`py-1 px-4 ${planCategory=='monthly'?'bg-[#6f551e] text-white':''} focus:outline-none border-r-2 border-[#6f551e]`} onClick={()=>setPlanCategory('monthly')}>Monthly</button>
          <button className={`py-1 px-4 ${planCategory=='quaterly'?'bg-[#6f551e] text-white':''} focus:outline-none border-r-2 border-yellow-800`} onClick={()=>setPlanCategory('quaterly')}> Quaterly</button>
          <button className={`py-1 px-4 ${planCategory=='yearly'?'bg-[#6f551e] text-white':''} focus:outline-none `} onClick={()=>setPlanCategory('yearly')}>Yearly</button>
      </div>  */}

<div className="flex mx-auto border-2 border-[#6f551e] rounded overflow-hidden mt-6">
          {
          subscriptionName.map((type, index) => (
            <button key={index} className={`py-1 px-4 ${planCategory==type?'bg-[#6f551e] text-white':''} focus:outline-none border-r-2 border-[#6f551e]`} onClick={()=>setPlanCategory(type)}>{type.toUpperCase()}</button>
          ))}
          
         
      </div> 


    </div>
    <div className="flex flex-wrap -m-4  justify-center ">

    {subscription.length > 0 &&
          subscription.map((plan, index) => (
            subscriptionName.includes(planCategory) && planCategory==plan.subscription_name?
      <div key={index} className="p-4 xl:w-1/4 md:w-1/2 w-full ">
        
        {/* <div className={`h-full p-6 rounded-lg border-2 ${storedSubscriptionId == plan.plan_id?'border-yellow-700':'border-gray-300'} flex flex-col relative overflow-hidden`}
        onClick={()=>setSelectPlan(plan.plan_id)}
        > */}
       
      <div className={`h-full p-6 rounded-lg border-2 ${plan.plan_id==storedSubscriptionId && getCurrentDate()<=subscriptionEndDateStr?'border-yellow-700':'border-gray-300'} flex flex-col relative overflow-hidden ${plan.plan_id==storedSubscriptionId?'bg-yellow-50':''} `}
       /*  onClick={()=>setSelectPlan(plan.plan_id)} */
        >
          
          {/* <h2 className="text-sm tracking-widest title-font mb-1 font-medium">{plan.subscription_name}</h2> */}
          <h2 className=" tracking-widest title-font mb-1 font-medium text-2xl text-gray-800">{plan.subscription_type}
            {/* {plan.subscription_name.includes('Interview Plan')?' 5 Days Validity':''} */}
          </h2>
         {/*  <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">AED {plan.amount}</h1> */}
         
          <h1 className="text-3xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
           
            <div>
              {plan.subscription_type.includes('Enterprise Plan')?'':  ' AED '+ plan.amount.toFixed(2)}
            
              {plan.subscription_type.includes('Monthly')?' /month':plan.subscription_type.includes('Quaterly')?' for 3 months':''}
              </div> 
           </h1>

          {index==0?
            (
              
              free_plan_content.map((price_text,i)=>(

                  <p  key={i} className="flex items-center text-gray-800 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>{price_text}
                  </p>
            )))

            :index==1?
            (
            interview_plan_content.map((price_text,i)=>(

                <p  key={i} className="flex items-center text-gray-800 mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>{price_text}
                </p>
          )))

          :index==2?
            (
          prop_plan_monthly_content.map((price_text,i)=>(

              <p  key={i} className="flex items-center text-gray-800 mb-2">
              <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>{price_text}
              </p>
            ))  
          )
          :index==3?
            (
          prop_plan_quaterly_content.map((price_text,i)=>(

              <p  key={i} className="flex items-center text-gray-800 mb-2">
              <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>{price_text}
              </p>
            ))  
          )
          /* :index==4?
            (
          pro_max_plan_monthly_content.map((price_text,i)=>(

              <p  key={i} className="flex items-center text-gray-800 mb-2">
              <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>{price_text}
              </p>
            ))  
          )
          :index==5?
            (
          pro_max_plan_quaterly_content.map((price_text,i)=>(

              <p  key={i} className="flex items-center text-gray-800 mb-2">
              <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>{price_text}
              </p>
            ))  
          ) */
          :index==4?
            (
          enterprise_plan_content.map((price_text,i)=>(

              <p  key={i} className="flex items-center text-gray-800 mb-2">
              <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>{price_text} 
              </p>
            ))  
          )
          :''
            }
          {/* if (new Date("2025-05-30").getTime() < new Date("2025-06-18").getTime()) { */}
         
         {/*  { plan.is_sequence<=isSequence  ? */}
    
          <button  className={`flex items-center mt-auto text-white 
             border-0 py-2 px-4 w-full focus:outline-none  rounded  
             ${plan.subscription_name=='Free Plan' || plan.subscription_name=='Enterprise Plan'?'hidden':''}

            ${
              parseDMY(subscriptionEndDateStr) <= parseDMY(getCurrentDate()) && plan.is_sequence <= isSequence
                ? 'bg-gray-500 cursor-pointer'
                : parseDMY(subscriptionEndDateStr) >= parseDMY(getCurrentDate()) && plan.is_sequence <= isSequence
                  ? 'bg-gray-400 opacity-50 cursor-not-allowed'
                  : 'bg-gray-500 cursor-pointer'
            }
            `}
          
          /* onClick={()=>applyCoupon(plan.plan_id,plan.subscription_name,plan.amount)}  */

          /* onClick={() => {
          const isDisabled =
            plan.subscription_name === 'Free Plan' ||
            plan.subscription_name === 'Enterprise Plan' ||
            (
              (parseDMY(subscriptionEndDateStr) <= parseDMY(getCurrentDate()) && plan.is_sequence <= isSequence) ||
              (parseDMY(subscriptionEndDateStr) >= parseDMY(getCurrentDate()) && plan.is_sequence <= isSequence)
            );

          if (isDisabled) return; // Do nothing if disabled

          applyCoupon(plan.plan_id, plan.subscription_name, plan.amount);
        }} */


          onClick={() => {
            parseDMY(subscriptionEndDateStr) <= parseDMY(getCurrentDate()) && plan.is_sequence <= isSequence?
             applyCoupon(plan.plan_id, plan.subscription_name, plan.amount)
            : parseDMY(subscriptionEndDateStr) >= parseDMY(getCurrentDate()) && plan.is_sequence <= isSequence
            ? {}
            : applyCoupon(plan.plan_id, plan.subscription_name, plan.amount)
          }}

      
         > {loading && clckedPlan==plan.plan_id?'Loading...':'Get  '+plan.subscription_name} {/* {parseDMY("30-05-2025").toDateString()} */}
           <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
             <path d="M5 12h14M12 5l7 7-7 7"></path>
           </svg>
         </button>
        {/*  :

         ''
         
         } */}
        {/*   <p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p> */}
        </div>

      </div>
      :''
        ))}


      
    </div>
    <p className="text-sm mt-4 text-center font-bold">Secure, tokenized checkout experience via our PCI DSS compliant payment provider. You can manage or cancel your subscription anytime from your profile.</p>
  </div>
</section>




<div id="popup-modal" tabindex="-1" className={`${showModal?'':'hidden'} bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full flex md:inset-0  max-h-full`}>
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <button onClick={()=>setShowModal(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
               {/*  <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Yes, I'm sure
                </button>
                <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button> */}
            </div>
        </div>
    </div>
</div>





</main>







  </div>


</div>
  
  );


}

