import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./includes/Header";
import { jwtDecode } from "jwt-decode";

export default function Paymentredirect() {
  const [paymentStatus, setPaymentStatus] = useState("loading"); // initially loading
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  useEffect(() => {
    const ref = queryParams.get("ref");
    const outlet_id = localStorage.getItem('outlet_id')

    if (ref) {
      getPaymentResponse(ref,outlet_id);
    } else {
      setPaymentStatus("failed"); // if no ref, treat as failed
    }
  }, []);

  const getPaymentResponse = async (ref,outlet_id) => {
    try {
      console.log("order reference:", ref);

      const apiUrl = "/api/payment-status";
    //  console.log("api url ", `${apiUrl}?orderReference=${ref}`);
      
      const response = await axios.get(`${apiUrl}?outlet_id=${outlet_id}&orderReference=${ref}`);
      console.log("Payment Response", response);

      if (response.status === 200 && response.data.msg !== "") {
        setPaymentStatus("success");
        localStorage.removeItem('outlet_id');
      } else {
        setPaymentStatus("failed");
         localStorage.removeItem('outlet_id');
      }
    } catch (error) {
       localStorage.removeItem('outlet_id');
      console.error("Error in payment response:", error);
      setPaymentStatus("failed"); // very important to set failed if API call fails
    }
  };

const closeScreen = () => {
  navigate("/chat")
  }



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

  if(isTokenExpired(refresh_token)){
    navigate('/login')
  }

  const apiUrl = "/api/auth/refresh";
  const requestData = { refresh_token };

  console.log("request access token: ", requestData);

  try {
    const response = await axios.post(apiUrl, requestData, {
      headers: {
      /*   Authorization: `Bearer ${refresh_token}`, */
        Token:`Bearer ${refresh_token}`
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


  const getAccessToken = () => {
    //return localStorage.getItem('accessToken');
    let access_token = localStorage.getItem("access_token");
  
    // let access_token = getAccessToken();
    if (isTokenExpired(access_token)) {
     
      access_token = localStorage.getItem("refresh_token");
      /////access_token = localStorage.getItem("access_token");
      refreshAccessToken();
      
    }
  
    return access_token;
  };


const acceptAutoRenewal = async (is_accept) => {
  try {
   // setLoading(true);
    //console.log("accept auto renewal: ", is_accept);
    //return false;

    //  const access_token = localStorage.getItem("access_token");
    let access_token = getAccessToken();
    /* if (isTokenExpired(access_token)) {
      access_token = await refreshAccessToken();
    } */

    if (!access_token) {
      console.error("Access token not found in session storage");
      return;
    }


    const apiUrl = "/api/update_card_detail"; // Using Vite proxy
   // const apiUrl = "http://3.108.57.25:3300/get_last_chat_id"; 

      const response = await axios.post(apiUrl, {
        is_accept: is_accept,
      }, {
        headers: {
          "Content-Type": "application/json",
           Token:`Bearer ${access_token}`
        
        },
      });
console.log('subscription ',response);
  
    if (response.status === 200 ) {
     // setSubscription(response.data.subscriptions)
     navigate("/chat");
    } else {
     // chatHistory("");
    }
  } catch (error) {
    console.error("API Error new:", error);
  } finally {
  //  setLoading(false);
  }
};



  return (
    <div>
      
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
   

<Header></Header>
   


  


<main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
 






<section
      className="text-gray-600 body-font relative bg-white mt-8 py-24"
      
    >



<button
     onClick={closeScreen}  // Function to handle close
    className="absolute top-0 right-12 text-gray-500 hover:text-gray-700"
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
      <Header></Header>

      
      {paymentStatus === "loading" ? (
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-600">
              Processing your payment...
            </h1>
          </div>
        </div>
      ) : paymentStatus === "success" ? (
        


        <div className="container px-5 py-8 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-600">
          Payment successful!
          </h1>
          
          
          <div className="flex justify-center space-x-4 mt-8">
      <a className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" href="/chat">
      Chat with DomGenie
      </a>
     {/*  <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700" onClick={()=>acceptAutoRenewal(0)}>
      Maybe Later
      </button> */}
    </div>

        </div>
      </div>
      
      ) : (
        <div className="container px-5 py-8 mx-auto">
           <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-2xl text-xlfont-medium title-font mb-4 text-gray-600">
              Payment failed!
            </h1>
            <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-600">
              Please reach out to us at support@domgenie.ai
            </h1>
          </div> 


        

        </div>
      )}
    </section>


</main>







  </div>


</div>
  
  );


}


