
import axios from "axios";
import { useState } from "react";
import {  useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import CookieConsent from "./CookieConsent";

const Register = () => {

  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  //const [tnc, setTNC] = useState(false);
  const navigate = useNavigate();
  const [showTNC, setShowTNC] = useState(false);
  const [error, setError] = useState('');
  





  const handleLoginBtn = ()=>{

    navigate('/login')
  }

  const validatePassword = (pwd) => {
    const lengthValid = pwd.length >= 6 && pwd.length <= 16;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    if (!lengthValid) return 'Password must be 6-16 characters long.';
    if (!hasUpperCase) return 'Password must include at least one uppercase letter.';
    if (!hasNumber) return 'Password must include at least one number.';
    if (!hasSpecialChar) return 'Password must include at least one special character.';

    return ''; // No error
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const validationMessage = validatePassword(value);
    setError(validationMessage);
  };

  const handleSignupClick = async (e) => {
    e.preventDefault();
   
    if (email != "" && password != "" && phone != "" && name != "") {

      const validationMessage = validatePassword(password);
      if (validationMessage) {
        setError(validationMessage);
      }else{
      setLoader(true);
      // Handle form submission here
      try {
        const response = await axios.post("/api/auth/register", {
          email: email,
          password: password,
          full_name: name,
          confirm_password: confirmPassword,
          role_id: 0,
          phone: phone,
          otp: 0,
          photo: "",
          is_active: true,
          google_drive_folder_id: "",
          is_google_drive: 0,
        });
         console.log('sfsafsd==>',response)
        if (
          response.status === 200 &&
          response.data 
        ) {
          console.log('signup data', response)
          setSuccessMessage('Register successful');
          setErrorMessage("");
          /* localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token); */
          localStorage.setItem("name", response.data.name);
          // console.log('access_token',localStorage);
          // localStorage.setItem('user_id', response.data.user_id);
          setLoader(false);
         
          //navigate('/login');
          setShowModal(true)
          localStorage.setItem("userId", response.data.user_id);
          localStorage.setItem("otpMsg", response.data.message);
            navigate('/otp');
        } else {

          setLoader();
          setErrorMessage("Response not 200");
          setLoader(false);
          setSuccessMessage('');
        }
      } catch (error) {

        console.error("Error occurred:", error);
        setErrorMessage("Email already registered.");
        setLoader(false);
      }
    }
    } else {
      setErrorMessage("Please enter all required fields.");
      setLoader(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };




 /*  const acceptTerms = ()=>{
  
    setShowTNC(!showTNC)
   
  }
 */


  const handleGoogleSignin = async (e) => {
    e.preventDefault();
 
      setLoader(true);
    ///  setShowTNC(false)
      // Handle form submission here
      try {
        const response = await axios.get("/api/login/google", {});
         console.log('sfsafsd==>',response)
        if (response.status === 200) {
          console.log('google login data', response)
         
          setTimeout(
            () => {
              setLoader(false);
            },
             3000
          ); 
        
          const redirectUrl  = response.data.authorization_url

          window.location.href = redirectUrl
         
          //https://domgenie.ai/handleOAuthCallback
          
          
        } else {

          setErrorMessage("Email or Password is incorrect!");
          setLoader(false);
         
        }
      } catch (error) {

        console.error("Error occurred:", error);
        setErrorMessage("Email or Password is incorrect!");
        setLoader(false);
      }
   
  };

    return (
      <>
     <section className="bg-gray-700">
     <div className="p-4 text-gray-200">
       
       <div className="flex flex-row fixed">
        <a className="flex flex-row text-2xl font-normal" href="/">
         {/*  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
        Go to Home */}
        DomGenie
        </a>
          </div>
        </div>
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      {/* <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-200 ">
          
           DomGenie    
      </a> */}
      <div className="w-full bg-gray-800 rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-300 md:text-2xl dark:text-white">
                  Signup your account
              </h1>

                   {errorMessage && (
                      <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded relative text-sm"
                        role="alert"
                      >
                        <p>{errorMessage}</p>
                      </div>
                    )}

                  {/*   {successMessage ? (
                      <div
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-1 rounded relative text-sm"
                        role="alert"
                      >
                        <p>Login successful...</p>
                      </div>
                    ) : (
                      ""
                    )} */}


              <form className="space-y-4 md:space-y-6" action="#">

              <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Your Name *</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your name" required=""
                      
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      />
                  </div>


                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Your Email *</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Email" required=""
                      
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      />
                  </div>

                  <div>
                      <label for="phone" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Your Phone *</label>
                      <input type="number" name="phone" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Phone" required=""
                      
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      />
                  </div>

                  <div className="relative w-full ">
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Password *</label>
                      <input type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5 dark:bg-gray-700 -blue-500" required=""
                      value={password}
                     /*  onChange={(e) => setPassword(e.target.value)} */
                      onChange={handleChange}
                      />
                       {error && <p className="text-red-500 text-sm">{error}</p>}
                      

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

                  <div className="relative w-full ">
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Confirm Password *</label>
                      <input type={showPassword2 ? 'text' : 'password'} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
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

                 
                 {/*  <div>
                    <span className="text-gray-200">
                      <input type="checkbox"
                       value={tnc}
                       onChange={(e) => setTNC(e.target.checked)}
                      />&nbsp; I agree to accept <a href="terms" className="text-blue-300 underline cursor-pointer">Terms and Conditions</a> and <a href="policy" className="text-blue-300 underline cursor-pointer">Privacy Policy</a> *</span>
                  </div> */}
                  
                
                  <button onClick={handleSignupClick} type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>

                  <button onClick={handleGoogleSignin} type="button"  className="transition-colors mt-4 focus:ring-2 p-0.5 disabled:cursor-not-allowed bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 disabled:bg-gray-300 disabled:text-gray-700 rounded-lg w-full "><span className="flex google p-2 items-center justify-center gap-1 py-1 px-2.5 text-sm false font-normal "><svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg><span className="">  Sign up with Google </span></span></button> 

                  <p className="text-sm font-light text-gray-300 dark:text-gray-400">
                  By signing up, you agree to our <a href="/policy" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Policies</a> and <a href="/terms" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Terms & Conditions</a>
                  </p>
                  
                  
                  <p className="text-sm font-light text-gray-300 dark:text-gray-400">
                      Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</a>
                  </p>
              </form>
          </div>
      </div>
  </div>


  <div id="popup-modal" tabindex="-1" className={`${showModal?'':'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex bg-black/50 `}>
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-gray-200 rounded-lg shadow-sm ">
            <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
                <svg onClick={()=>showModal(false)} className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-800 dark:text-gray-400">A confirmation email sent on you email address. Please check your email.</h3>
                <button onClick={handleLoginBtn} data-modal-hide="popup-modal" type="button" className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                   Go to Login
                </button>
             {/*    <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button> */}
            </div>
        </div>
    </div>
</div>





<div id="default-modal" tabindex="-1" aria-hidden="true" className={`${showTNC?'':'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] md:h-full flex  `}>
    <div className="relative p-4 w-full max-w-2xl max-h-full">
      
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
         
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Terms & Conditions and Policies
                </h3>
                <button onClick={()=>setShowTNC(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
         
            <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 hover:bg-gray-300 p-2 rounded ">
                  <a href="terms">Terms and Conditions</a>
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 hover:bg-gray-300 p-2 rounded ">
                <a href="policy">  Privacy Policy</a>
                </p>
            </div>
           
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button onClick={handleGoogleSignin} data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                <button onClick={()=>setShowTNC(false)} data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
            </div>
        </div>
    </div>
</div>


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
  
  export default Register;
  