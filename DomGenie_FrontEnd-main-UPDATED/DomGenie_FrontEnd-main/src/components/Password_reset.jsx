
import axios from "axios";
import { useState, useEffect } from "react";
import {  useNavigate, useLocation } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

const Password_reset = () => {

  

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loader, setLoader] = useState(false);

  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [token, setToken] = useState('');


  useEffect(() => {
      
      setToken(queryParams.get("token")); 
     

    }, []);
    

  const submitPassword = async (e) => {
    console.log('token',token)
    e.preventDefault();
    if (password == "") {
        setMessage("Please enter password");
        setLoader(false);
    } 
    else if(confirmPassword==''){
        setMessage("Please enter confirm password");
        setLoader(false);
    }
    else if(password!=confirmPassword){
        setMessage("Password mismatch!");
        setLoader(false);
    }
    else {

      setLoader(true);
      // Handle form submission here
   
      try {
      
        const response = await axios.post("/api/auth/password-reset?token="+token, {
          password: password,
          confirm_password: confirmPassword,
        });
         //console.log('password response==>',response)
        if (
          response.status === 200
        ) {
          //console.log('password data', response)
          setLoader(false);
          /* setSuccessMessage('Login successful');
          setErrorMessage("");
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          localStorage.setItem("name", response.data.name); */
         
          // console.log('access_token',localStorage);
          // localStorage.setItem('user_id', response.data.user_id);
          setMessage(response.data.msg)
         
        
         
         navigate('/login?msg='+response.data.msg);
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
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
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
                  Enter Password
              </h1>

                      
                   {message && (
                      <div
                        className={`${setMessage==''?'bg-green-100 border-green-400':'bg-red-100 border-red-400'} border  text-red-700 px-4 py-1 rounded relative text-sm`}
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
              <div className="relative w-full ">
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Password *</label>
                      <input   type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder="Enter password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      />

                    {showPassword?
                        <svg
                          onClick={togglePasswordVisibility} // Add onClick event if you want to toggle visibility
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute right-2 top-2.5 w-6 h-6 cursor-pointer mt-7"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.557 2.093-1.74 3.885-3.318 5.201a12.042 12.042 0 01-12.448 0C4.198 15.885 3.015 14.093 2.458 12z"
                          />
                        </svg>
                        :
                        <svg
                      onClick={togglePasswordVisibility}
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-2 top-2.5 w-6 h-6 cursor-pointer mt-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3l18 18"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.53 9.53a3 3 0 004.94 4.94M7.3 7.3a9.965 9.965 0 00-4.842 5.201C3.732 16.057 7.522 19 12 19c1.65 0 3.216-.368 4.625-1.018M9.53 9.53l4.94 4.94M12.37 4.948c4.478 0 8.268 2.943 9.542 7a9.96 9.96 0 01-3.287 5.22"
                      />
                    </svg>
                  }
                  </div>

                  <div className="relative w-full">
                      <label for="otp" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Confirm Password *</label>
                      <input type={showPassword2 ? 'text' : 'password'} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter confirm password" required
                      
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      />


                    {showPassword2?
                        <svg
                          onClick={togglePasswordVisibility2} // Add onClick event if you want to toggle visibility
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute right-2 top-2.5 w-6 h-6 cursor-pointer mt-7"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.557 2.093-1.74 3.885-3.318 5.201a12.042 12.042 0 01-12.448 0C4.198 15.885 3.015 14.093 2.458 12z"
                          />
                        </svg>
                        :
                        <svg
                      onClick={togglePasswordVisibility2}
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-2 top-2.5 w-6 h-6 cursor-pointer mt-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3l18 18"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.53 9.53a3 3 0 004.94 4.94M7.3 7.3a9.965 9.965 0 00-4.842 5.201C3.732 16.057 7.522 19 12 19c1.65 0 3.216-.368 4.625-1.018M9.53 9.53l4.94 4.94M12.37 4.948c4.478 0 8.268 2.943 9.542 7a9.96 9.96 0 01-3.287 5.22"
                      />
                    </svg>
                  }
                  </div>
                  
                  
                  
                 
                  <button  onClick={submitPassword} type="button" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">

                    <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                      {loader ? 'Submit' : 'Submit'}
                    </span>

                  </button>


                  <p className="text-sm font-light text-gray-300 dark:text-gray-400">
                       <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Go to Login</a>
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
  
  export default Password_reset;
  