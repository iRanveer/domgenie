
import axios from "axios";
import { useState, useEffect } from "react";
import {  useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

const Otp = () => {

  
  const [otp, setOtp] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");




  const navigate = useNavigate();

useEffect(() => {
  
    setUserId(localStorage.getItem("userId"));
  setMessage(localStorage.getItem("otpMsg"));
  
  }, []);





  

  const submitOTP = async (e) => {
    e.preventDefault();
    if (otp != "") {
      setLoader(true);
      // Handle form submission here
   
      try {
        const response = await axios.post("/api/auth/verify-otp", {
          otp: otp,
          user_id: userId,
        });
         console.log('otp response==>',response)
        if (
          response.status === 200
        ) {
          console.log('otp data', response)
          /* setSuccessMessage('Login successful');
          setErrorMessage("");
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          localStorage.setItem("name", response.data.name); */
         
          // console.log('access_token',localStorage);
          // localStorage.setItem('user_id', response.data.user_id);
          setMessage(response.data.message)
          setLoader(false);
          setOtp("")
         
         navigate('/login?msg='+response.data.message);
        } else {

          setLoader();
          setErrorMessage("Wrong OTP");
          setLoader(false);
          setSuccessMessage('');
        }
      } catch (error) {

        console.error("Error occurred:", error);
        setErrorMessage("Wrong OTP");
        setLoader(false);
      }
    } else {
      setErrorMessage("Please enter OTP");
      setLoader(false);
    }
  };
  



    return (
      <>
     <section className="bg-gray-700">
      <div className="p-4 text-gray-200">
       
       <div className="flex flex-row fixed">
        <a className="flex flex-row text-2xl font-normal" href="/">
         {/*  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
        Go to Home */}
        DomGenie
        </a>
          </div>
        </div>
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-200 ">
          
          DomGenie    
      </a>
      <div className="w-full bg-gray-800 rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-300 md:text-2xl dark:text-white">
                  Enter the OTP
              </h1>

                      
                   {message && (
                      <div
                        className={`${setMessage==''?'bg-green-100 border-green-400':'bg-green-100 border-green-400'} border  text-green-700 px-4 py-1 rounded relative text-sm`}
                        role="alert"
                      >
                        <p>{message}</p>
                      </div>
                    )}

                    

                    {successMessage ? (
                      <div
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-1 rounded relative text-sm"
                        role="alert"
                      >
                        <p>Loading...</p>
                      </div>
                    ) : (
                      ""
                    )}


              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="otp" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">OTP *</label>
                      <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter otp" required
                      
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      />
                  </div>
                  
                  
                  
                 
                  <button  onClick={submitOTP} type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">

                    <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                      {loader ? 'Signing In...' : 'Submit'}
                    </span>

                  </button>


                  

                  
                  <p className="text-sm font-light text-gray-300 dark:text-gray-400 ">
                      Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                      <br/>
                  
                      Already have account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</a>
                      
                  </p>
              </form>
          </div>
      </div>
  </div>








{/* loader  */}
<div
  id="default-modal"
  tabIndex="-1"
  aria-hidden="true"
  className={`${loader ? "" : "hidden"} fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
>
  <div className="relative h-24 w-24 bg-white rounded-lg shadow-sm dark:bg-gray-700 flex items-center justify-center">
    <ClipLoader
      color={"#20ADE6"}
      loading={true}
      size={40}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
</div>



</section>




    
      </>
    );
  };
  
  export default Otp;
  