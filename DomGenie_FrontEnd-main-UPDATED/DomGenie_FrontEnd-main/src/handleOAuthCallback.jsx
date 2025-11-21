import {React, useEffect, useState} from "react";
import {  useNavigate } from 'react-router-dom';
import axios from "axios"
import { useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const HandleOAuthCallback = () => {

  const location = useLocation();
  const navigate = useNavigate();
  
  const queryParams = new URLSearchParams(location.search);
  
  

    useEffect(() => {
        
        const state = queryParams.get("state"); 
        const code = queryParams.get("code"); 

       sendCallback(state,code)
      }, []);
      

    
   
  const sendCallback = async (state,code)=>{

   
    const requestData = {}
    try {
      const response = await axios.get("/api/callback/google"+`?state=${state}&code=${code}`, requestData);
    //  const response = await axios.get("/api/login/google", {});
         console.log('sfsafsd==>',response)
         
      
      console.log('google callback response==> ',response)
      if (response.status === 200) {
       
        console.log('success')

         localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        localStorage.setItem("name", response.data.name); 

      // const accessToken = response.data.access_token 

    
       ///
        navigate('/chat');
      } else {
        console.log('fail')
       //
      }
    } catch (error) {

      console.error("Error occurred:", error);
    
    }

  }
  



    return (
      <>
             <ClipLoader
                color={"#20ADE6"}
                loading={true}
                size={40}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
     </>
    );
  };
  
  export default HandleOAuthCallback;
  