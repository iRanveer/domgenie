import { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Header from "./includes/Header";

export default function Profile() {

const [message,setMessage] = useState('')
const [fullName,setFullName] = useState('')
const [email,setEmail] = useState('')
const [phone,setPhone] = useState('')
const [photo,setPhoto] = useState('')
const [photoName,setPhotoName] = useState('')

const [oldPassword,setOldPassword] = useState('')
const [newPassword,setNewPassword] = useState('')
const [confirmPassword,setConfirmPassword] = useState('')
const [messagePassowrd,setMessagePassowrd] = useState('')

const navigate = useNavigate();



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
  


  const closeSubscriptionScreen = ()=>{

    navigate('/chat')
  
  }





const updateProfile = async ()=>{



  try {

/* 
   
    photo.forEach((file) => {
      console.log("file upload: ", file);
      if (file !== "" && file !== undefined) {
        console.log("file data: ", file);
        const fileName = file.name;

        const fileSize = file.size;
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const base64Data = fileReader.result.split(",")[1];
          console.log("base64 : ", base64Data);
          setPdfBase64((prevState) => [...prevState, base64Data]);
          setUploadedFileName((prevState) => [...prevState, fileName]);
          uploadPdf(base64Data, fileName, fileSize);
        };
        fileReader.readAsDataURL(file);
      }
    });

    // Reset the input value
    fileInputRef.current.value = "";
 */


      // setLoading(true);

      let access_token = getAccessToken();
      if (isTokenExpired(access_token)) {
        access_token = await refreshAccessToken();
      }
      if (!access_token) {
        console.error("Access token not found in session storage");
        return;
      }
       
      const apiUrl = "/api/auth/update_profile"; 
     
      const requestData = {
           full_name: fullName,
           email: email,
           photo: '',
           photo_name: '',
         };

         console.log('request data ',requestData);
         const response = await axios.post(apiUrl, requestData, {
          headers: {
              "Content-Type": "application/json",
              Token: `Bearer ${access_token}`,
            },
         });
   console.log('update profile response ',response);
     
       if (response.status === 200 ) {
         setMessage(response.data.message)
       } else {
        // chatHistory("");
       }
     } catch (error) {
       console.error("API Error new:", error);
     } finally {
     //  setLoading(false);
     }

}




const updatePassword = async ()=>{



  try {


      // setLoading(true);

      let access_token = getAccessToken();
      if (isTokenExpired(access_token)) {
        access_token = await refreshAccessToken();
      }
      if (!access_token) {
        console.error("Access token not found in session storage");
        return;
      }
       
      const apiUrl = "/api/auth/password-update"; 
     
      const requestData = {
           password: newPassword,
           confirm_password: confirmPassword,
           old_password: oldPassword
         };

         console.log('request data ',requestData);
         const response = await axios.post(apiUrl, requestData, {
          headers: {
              "Content-Type": "application/json",
              Token: `Bearer ${access_token}`,
            },
         });
   console.log('update password response ',response);
     
       if (response.status === 200 ) {
         setMessage(response.data.msg)
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
   

<Header></Header>
   


  


<main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
 
<section className="text-gray-600 body-font">
<button
     onClick={closeSubscriptionScreen}  // Function to handle close
    className="absolute top-24 right-12 text-gray-500 hover:text-gray-700"
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

  <div className="container px-5 py-4 mx-auto">
    <div className="flex flex-col text-center w-full mb-8">
      <h1 className="sm:text-4xl text-3xl font-medium title-font mb-0 text-gray-900">My Profile</h1>
      
    </div>
    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
    <div className="p-4 text-gray-900 text-2xl">{message}</div>
    <form action="#">
    <div className="flex gap-8 ">
  <div className="w-1/2 ">
                <div className="grid gap-4 mb-4 sm:grid-cols-1 mt-4 ">
                    <div>
                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Full Name</label>
                        <input type="text" name="name" id="name"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter name" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}/>
                    </div>
                   {/*  <div>
                        <label for="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                        <input type="text" name="brand" id="brand" value="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter last name"/>
                    </div>
                    */}

                    <div>
                        <label for="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter email" 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    

                    <div>
                        <label for="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                        <input type="text" name="brand" id="brand"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Phone"
                         value={phone}
                         onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div>
                        <label for="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo</label>
                        <input type="file" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Upload Photo"
                         value={photo}
                         onChange={(e) => setPhoto(e.target.value)}
                        />
                    </div>


                    <div className="flex items-center space-x-4 bottom-24 fixed">
                      
                      <button onClick={updateProfile} type="button" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                          Update Profile
                      </button>
                   
                    </div>
                   
                </div>
                </div>
<div className="border-r-2 border-gray-200"></div>

                <div className="w-1/2">
                <div className="grid gap-4 mb-4 sm:grid-cols-1 mt-4 ">
                    <div>
                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Old Password</label>
                        <input type="text" name="name" id="name"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter old password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label for="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                        <input type="text" name="brand" id="brand"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter new password"
                         value={newPassword}
                         onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                   

                    <div>
                        <label for="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                        <input type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter confirm password"
                         value={confirmPassword}
                         onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    


                    <div className="flex items-right space-x-4 bottom-24 fixed">
                    <button onClick={updatePassword} type="button" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Update Password
                    </button>
                   
                    </div>
                   
                </div>

               
                </div>

                </div>
                
                
                {/* <div className="flex items-center space-x-4">
                    <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Update product
                    </button>
                    <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                        <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        Delete
                    </button>
                </div> */}
            </form>
    </div>
    {/* <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
       <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </a> 
      <button onClick={upgradePlan} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Upgrade</button>
    </div> */}
  </div>
</section>

</main>







  </div>


</div>
  
  );


}

