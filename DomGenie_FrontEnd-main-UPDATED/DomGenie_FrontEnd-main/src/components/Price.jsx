import {React, useEffect, useState} from "react";
import {  useNavigate } from 'react-router-dom';
import axios from "axios"

const Price = () => {

  const navigate = useNavigate();
  const [subscription,setSubscription] = useState(false)
  const [planCategory,setPlanCategory] = useState('Pro Plan')




useEffect(() => {
  getSubscription();
}, []);


  /* const handleSubscribeBtn = ()=>{

    navigate('/login')
  } */


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
  console.log('subscription ',response);
    
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




  const getAccessToken = async ()=>{

    const apiUrl = "/payment";
   // const apiUrl = "/https://api-gateway.sandbox.ngenius-payments.com/identity/auth/access-token";
    const requestData = {}
    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/vnd.ni-identity.v1+json",
          "Authorization":`Basic NTQ2NmRlYTYtNDFlZi00NTI3LWI0ZGUtMjNlNzA0NDRiNWYxOjU5OTMyM2ZiLTkwMGUtNDQ5Yi05NTcwLWU4ODdkM2ZjYzE1MQ==`,
         
        },
      });
      console.log('access toekn==>',response)
      if (
         response.status === 200 &&
        response.data &&
        response.data.access_token 

      ) {
       
        console.log('success')

       const accessToken = response.data.access_token 

       createOrder(accessToken)
       ///
       /// navigate('/chat');
      } else {
        console.log('fail')
       //
      }
    } catch (error) {

      console.error("Error occurred:", error);
    
    }

  }




  const createOrder = async (accessToken)=>{
//https://api-gateway.sandbox.ngenius-payments.com/transactions/outlets/[your-outlet-reference]/orders
    const apiUrl = "/createOrder";
    const requestData = {  
      "action": "SALE",   
      "amount" : { "currencyCode" : "AED", "value" : 1 } 
    }
    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/vnd.ni-payment.v2+json",
          "Accept": "application/vnd.ni-payment.v2+json",
          "Authorization":`Bearer ${accessToken}`
        },
      });
      console.log('order detail==>',response)
      if (response.status === 201) {
       
        console.log('success')

        const payment_url = response.data._links.payment.href+'&slim=true'
        const order_reference = response.data.reference
        localStorage.setItem("order_reference", order_reference);
        console.log('payment url ',payment_url)
        window.location.href = payment_url;


       // navigate('/chat');
      // const accessToken = response.data.access_token 

      // createOrder()
       ///
       /// navigate('/chat');
      } else {
        console.log('fail')
       //
      }
    } catch (error) {

      console.error("Error occurred:", error);
    
    }

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

    return (
      <>
     
     <section className="text-gray-600 body-font overflow-hidden"  style={{
    background: "linear-gradient(to bottom, #111827 10%, #6f551e 100%, #111827 80%)",
    height: "auto",
    
  }}>
  <div className=" px-5 py-24 mx-auto ">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-200">Pricing</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-300">Choose your favourite plan.</p>
      {/* <div className="flex mx-auto border-2 border-[#6f551e] rounded overflow-hidden mt-6">
        <button className="py-1 px-4 bg-[#6f551e] text-white focus:outline-none">Monthly</button>
        <button className="py-1 px-4 focus:outline-none text-gray-300">Annually</button>
      </div> */}

<div className="flex mx-auto border-2 border-[#6f551e] rounded overflow-hidden mt-6 overflow-x-auto whitespace-nowrap scrollbar-hide w-[340px] sm:w-auto">
  {subscriptionName.map((type, index) => (
    <button
      key={index}
      className={`py-1 px-4 ${
        planCategory === type ? 'bg-[#6f551e] text-white' : ''
      } focus:outline-none border-r-2 border-[#6f551e]`}
      onClick={() => setPlanCategory(type)}
    >
      {type.toUpperCase()}
    </button>
  ))}
</div>




    </div>
    <div className="flex flex-wrap -m-4 justify-center">


 
        {subscription.length > 0 &&
      subscription.map((plan, index) => (
        subscriptionName.includes(planCategory) && planCategory==plan.subscription_name?
           
      <div key={index} className="p-4 xl:w-1/4 md:w-1/2 w-full">
        <div className="h-full p-6 rounded-lg border-2 border-[#6f551e] flex flex-col relative overflow-hidden">
          <h2 className=" tracking-widest title-font mb-1 font-medium text-2xl text-gray-200">{plan.subscription_type}</h2>
          
          <h1 className="text-3xl text-gray-300 pb-4 mb-4 border-b border-gray-200 leading-none">
             <div>
              {plan.subscription_type.includes('Enterprise Plan')?'':  ' AED '+ plan.amount.toFixed(2)}
            
              {plan.subscription_type.includes('Monthly')?' /month':plan.subscription_type.includes('Quaterly')?' for 3 months':''}
              </div>
           </h1>
          {index==0?
          <p className="mb-2 text-gray-400">Get a taste of DomGenie's expertise in card payments – no cost, no commitment!</p>
        :index==1?
        <p className="mb-2 text-gray-400"></p>
      :index==2?
      <p className="mb-2 text-gray-400">Your daily AI-powered payment expert – ideal for professionals and SMEs!</p>
      
      :index==3?
      <p className="mb-2 text-gray-400">Your daily AI-powered payment expert – ideal for professionals and SMEs!
</p>
      :index==4?
      <p className="mb-2 text-gray-400">For fintechs, banks, and enterprises needing AI-powered expertise at scale
</p>
      :''
    }
          
            {index==0?
            (
              
              free_plan_content.map((price_text,i)=>(

                  <p  key={i} className="flex items-center text-gray-200 mb-2">
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

                <p  key={i} className="flex items-center text-gray-200 mb-2">
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

              <p  key={i} className="flex items-center text-gray-200 mb-2">
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

              <p  key={i} className="flex items-center text-gray-200 mb-2">
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

              <p  key={i} className="flex items-center text-gray-200 mb-2">
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

              <p  key={i} className="flex items-center text-gray-200 mb-2">
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

              <p  key={i} className="flex items-center text-gray-200 mb-2">
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
          
         
          
          {index==0?
            <a /* onClick={getAccessToken} */ href="register" className={`flex items-center mt-auto text-white ${index==0?'bg-gray-800':'bg-gray-400'}  border-0 py-2 px-4 w-full focus:outline-none ${index==0?'hover:bg-gray-500':''}  rounded`}>Subscribe
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
          :
            <a /* onClick={getAccessToken} */ href="register"  className={`flex items-center mt-auto text-white bg-gray-400}  border-0 py-2 px-4 w-full focus:outline-none  bg-gray-400 rounded`}>Subscribe
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          
          }
          
         
        </div>
      </div>
          :''))}
      
      
      
    </div>
  </div>
</section>
      </>
    );
  };
  
  export default Price;
  