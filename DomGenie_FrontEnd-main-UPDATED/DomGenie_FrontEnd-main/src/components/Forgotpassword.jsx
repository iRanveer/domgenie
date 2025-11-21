
import axios from "axios";
import { useState } from "react";
import {  useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import ReCAPTCHA from "react-google-recaptcha";

const Forgotpassword = () => {

  
  const [email, setEmail] = useState("");
 
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loader, setLoader] = useState(false);
 
 
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
   /*  if (!captchaValue) {
      alert("Please verify the CAPTCHA");
      return;
    } */
    if (email != "" ) {
     // setLoader(true);
      // Handle form submission here
      try {
        const response = await axios.post("/api/auth/forgot-password", {
          email: email,
          
        });
         console.log('sfsafsd==>',response)
        if (
          response.status === 200 
        ) {
          console.log('login data', response)
          setSuccessMessage('Reset password link has been sent on your email.');
          setEmail("")

          navigate('/login?msg='+'Reset password link has been sent on your email.');
        
        } else {

        // setLoader();
          setErrorMessage("Email or Password is incorrect!");
       //   setLoader(false);
          setSuccessMessage('');
        }
      } catch (error) {

        console.error("Error occurred:", error);
        setErrorMessage("Email is incorrect!");
        setLoader(false);
      }
    } else {
      setErrorMessage("Please enter email ");
      setLoader(false);
    }
  };


/* const acceptTerms = ()=>{
  
  setShowTNC(!showTNC)
 
} */


  


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
                  Forgot Password
              </h1>

                  

                    {successMessage ? (
                      <div
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-1 rounded relative text-sm"
                        role="alert"
                      >
                        <p>{successMessage}</p>
                      </div>
                    ) : (
                      ""
                    )}


              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Email *</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter email" required=""
                      
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      />
                  </div>
                  
                  

                 
                  <button onClick={handleForgotPassword} type="button" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">

                  <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                      {loader ? 'Submit' : 'Submit'}
                    </span>

                  </button>


                 <div>

                 <a href="/login" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Back to Login</a>

                 </div>
                  
                 
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
  
  export default Forgotpassword;
  