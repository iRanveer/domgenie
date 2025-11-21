import { useState, useRef, useEffect } from "react";
import { createRoot } from 'react-dom/client'
import PulseLoader from "react-spinners/PulseLoader";
import ClipLoader from "react-spinners/ClipLoader";
import {  useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { parseContent } from "./Functions";
import AppendComponent from "./AppendComponent";
import Header from "./includes/Header";
import Sidebar from "./includes/Sidebar";
import { Root } from "postcss";

export default function Chat() {

const navigate = useNavigate();
/* const [showApps,setShowApps] = useState(false)  */
const [showProfile,setShowProfile] = useState(false)
const [loading, setLoading] = useState(false);
const contentEditableRef = useRef(null);

const bottomRef = useRef(null);
const appendRef = useRef(null);
const [loadingSpinner, setLoadingSpeaner] = useState(false);
const [currentQuery, setCurrentQuery] = useState(""); 
const [chatId, setChatId] = useState("");
const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [questionAnswer, setQuestionAnswer] = useState([]);
const [enterIcon, setEnterIcon] = useState(false);
const [chatHistoryData, setChatHistoryData] = useState("");
const [chatHistoryCount, setChatHistoryCount] = useState(0);
const [isRefreshed, setIsRefreshed] = useState(true);
const [lastChatId, setLastChatId] = useState("");
const [monthChat, setMonthChat] = useState("");
const [weekChat, setWeekChat] = useState("");
const [yesterdayChat, setYesterdayChat] = useState("");
const [todayChat, setTodayChat] = useState("");
const [limitExceed, setLimitExceed] = useState("");
const [isSubscriptionActive, setIsSubscriptionActive] = useState("");
const [newChat, setNewChat] = useState(true);
const [activeTab, setActiveTab] = useState("Profile");
const [showModal, setShowModal] = useState(false);
const [sidebarToggle, setToggleSidebar] = useState(false);
const inputRef = useRef(null);

const restrictedCopyRef = useRef(null); 


/* for profile/settings modal param start here */

const [message,setMessage] = useState('')
const [fullName,setFullName] = useState('')
const [email,setEmail] = useState('')
const [phone,setPhone] = useState('')
const [file,setPhoto] = useState('')
const [photoName,setPhotoName] = useState('')

const [oldPassword,setOldPassword] = useState('')
const [newPassword,setNewPassword] = useState('')
const [confirmPassword,setConfirmPassword] = useState('')
const [messagePassowrd,setMessagePassowrd] = useState('')
const [profileMessage,setProfileMessage] = useState('')

const [base64, setBase64] = useState("");
  const [fileName, setFileName] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [subscriptionModal, setSubscriptionModal] = useState(false);


  const [isSubscriptionCancel, setIsSubscriptionCancel] = useState(false);
  const [subscriptionHistory, setSubscriptionHistory] = useState();

  const is_subscription = localStorage.getItem("is_subscription");

  const [cardExpiry, setCardExpiry] = useState('');
  const [cardMethod, setCardMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('');
  const [subscriptionName, setSubscriptionName] = useState('');
  const [subscriptionType, setSubscriptionType] = useState('');
  const [cardholderName, setCardholderName] = useState('');


 //// const [showScrollButton, setShowScrollButton] = useState(false);
 //// const chatRef = useRef(null);



useEffect(() => {
  if (!isSubscriptionCancel && is_subscription == '1') {
    setIsSubscriptionCancel(true);
  } else {
    setIsSubscriptionCancel(false);
  }
}, [is_subscription]); 



useEffect(() => {
  
  lastChatHistory();
  getSubscriptionHistory()

  const checkScroller = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // Small buffer

    setIsVisible(!isAtBottom); // Show image if not at bottom
  };

  window.addEventListener("scroll", checkScroller);
  return () => window.removeEventListener("scroll", checkScroller);

}, []);


/* useEffect(() => {
  const handleCopy = (e) => {
    const selection = window.getSelection();
    if (selection) {
     
      if (restrictedCopyRef.current && restrictedCopyRef.current.contains(selection.anchorNode)) {
        e.preventDefault(); 
       
      }
    }
  };

  document.addEventListener("copy", handleCopy);
  return () => document.removeEventListener("copy", handleCopy);
}, []); */




const scrollToBottom = () => {
 
      handleScroll();
   

}



const logout = async () => {
  localStorage.clear();
  navigate('login');

}

const handleProfileIconClick = ()=>{
  setShowProfile(!showProfile)
}


const handleScroll = () => {

  if (bottomRef.current) {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }
  
};


const handleEnterIcon = (e) => {
  const inputLength = e.target.value.length;
  if (inputLength > 0) {
    setEnterIcon(true);
  } else {
    setEnterIcon(false);
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



/* const checkIfArrayValuesExist = (str, arr) => {

  return arr.some(value => str.trim().toLowerCase().includes(value.toLowerCase()));

}; */

const checkIfArrayValuesExist = (str, arr) => {
  const words = str.toLowerCase().split(/\W+/); // splits string into words ignoring punctuation
  return arr.some(value => words.includes(value.toLowerCase()));
};





const PreHandleSendPrompt = ()=>{

  const inputArea = contentEditableRef.current;
  const inputValue = inputArea.value.trim();
  contentEditableRef.current.focus(); 
  if (!inputValue) return;

  // first array - CASE A
  const Card_Network_Supported = [
                                  "VISA",
                                  "visa", 
                                  "Visa",
                                  "MasterCard",
                                  "MC",
                                  "Master Card",
                                  "mastercard",
                                  "Mastercard",
                                  "IPMIN",
                                  "IPM Clearing",
                                  "IPM IN File",
                                  "IPM File",
                                  "ipmin file",
                                  "IRD",
                                  "ird",
                                  "MasterCard",
                                  "MC",
                                  "MC Network",
                                  "MC Payment network",
                                  "Master Card",
                                  "master card",
                                  "Mastercard",
                                  "Interest Rate Derivative"
                                ];
  const caseA = checkIfArrayValuesExist(inputValue, Card_Network_Supported);

  // second array - CASE B
  const Card_Network_Supported2 = [
                                    "RuPay",
                                    "rupay",
                                    "Rupay",
                                    "ru pay",
                                    "Ru pay",
                                    "Ru Pay"
                                  ];
  const Card_Network_Supported3 = [
                  "Clearing",
                  "clearing",
                  "Clearance",
                  "clearance",
                  "Base II",
                  "base II",
                  "Base 2",
                  "base 2",
                  "base two",
                  "Settlement",
                  "settlement",
                  "Reconciliation",
                  "reconciliation",
                  "RGCS",
                  "rgcs",
                  "IRGCS",
                  "irgcs"];

  const caseB1 = checkIfArrayValuesExist(inputValue, Card_Network_Supported2);
  const caseB2 = checkIfArrayValuesExist(inputValue, Card_Network_Supported3);

  // third array - CASE C
  const Card_Network_Not_Supported = [
                  "RuPay",
                  "rupay",
                  "Rupay",
                  "American Express",
                  "AMEX",
                  "Discover",
                  "Diners Club International",
                  "DinersClub International",
                  "Diners",
                  "Diners Club",
                  "Japan Credit Bureau",
                  "JCB",
                  "China UnionPay",
                  "China Union Pay",
                  "CUP",
                  "UnionPay",
                  "Union Pay",
                  "Interac",
                  "Girocard",
                  "Giro Card",
                  "Bancontact",
                  "Ban Contact",
                  "Carte Bancaire",
                  "Dankort",
                  "Dan kort",
                  "Turkey's Payment Method",
                  "TROY",
                  "Turkeys Payment Method",
                  "Turkey Payment Method",
                  "Verve",
                  "Network for Electronic Transfers",
                  "NETS",
                  "Mada",
                  "Meeza",
                  "PagoBancomat",
                  "Pago Bancomat",
                  "BankAxept",
                  "Bank Axept",
                  "Saudi Payments Network",
                  "SAMA",
                  "Saudi Payment"
                ];
  const caseC = checkIfArrayValuesExist(inputValue, Card_Network_Not_Supported);



  if(caseA==true){

    console.log('in case a')
    handleSendPrompt()
  }
  else if(caseB1===true && caseB2===true){
    console.log('in case B')
    handleSendPrompt()

  }
  else if(caseC===true){

  
    console.log('in case C')

    if (appendRef.current) {
      const newDiv = document.createElement("div");
      appendRef.current.appendChild(newDiv);

    
      const root = createRoot(newDiv);
      root.render(
        <AppendComponent
          query={inputValue}
          answer={"We are actively working to expand DomGenie’s knowledge base to include comprehensive coverage of all major payment networks. Currently, DomGenie supports detailed information on issuing, acquiring fundamentals, and clearing processes for selected leading networks. For details, please refer to the 'Topics Supported by DomGenie' section provided in the left-side panel. Thank you for exploring DomGenie!"}
        />
      );

      setCurrentQuery(inputValue)
      
      inputArea.value = "";

      
      
      setTimeout(
        () => {
          handleScroll();
        },
         1000
      ); 
    
     
    } else {
      console.error("appendRef is not attached to a DOM element");
    }



  }
  else{
    console.log('in case D')
    handleSendPrompt()
  }
  
}

const handleSendPrompt = async (p) => {
 
  console.log('prompt text ',p)
  try {

     setTimeout(
      () => {
        handleScroll();
      },
       1000
    ); 
  
   


    //let promptText = p || contentEditableRef.current?.value;

   

    setLoading(true);
    setLoadingSpeaner(true);

    let promptText = '';
    let inputArea = '';
    let inputValue = '';

console.log('pppp ',p)
    if(p){
       promptText = p
       inputArea = ""
       inputValue = promptText
     
    }else{
      console.log('aaa')
       promptText = contentEditableRef.current?.value;
       inputArea = contentEditableRef.current;
       inputValue = inputArea.value.trim();
      contentEditableRef.current.focus(); 
    //  if (!inputValue) return;
  
     
      inputArea.value = "";
    }
   
    if (!promptText) return;
  
    setCurrentQuery(inputValue);

    //  const access_token = localStorage.getItem("access_token");
    let access_token = getAccessToken();
    /* if (isTokenExpired(access_token)) {
      access_token = await refreshAccessToken();
    } */

    if (!access_token) {
      console.error("Access token not found in session storage");
      return;
    }

    let apiUrl = "/api/send_prompt";
   

    const requestData = {
      query: inputValue,
      chat_id: chatId
    };

    console.log("request data new: ", requestData);

    const response = await axios.post(apiUrl, requestData, {
      headers: {
        "Content-Type": "application/json",
        Token:`Bearer ${access_token}`
      },
    });

    console.log('response text : ',response)

    if (response.status === 200) {
      const responseData = response.data;
    
      console.error("responseData 1234:", responseData);

  
      setChatId(responseData.message.chat_id);
      localStorage.setItem("sessionChatID", responseData.message.chat_id);

      setAnswer(responseData.message.answer);
      setQuestion(responseData.message.query);
      setLimitExceed(responseData.message.limit_exceed);
      setIsSubscriptionActive(responseData.message.is_subscription);

      getSidebarList()

      setLoadingSpeaner(false)
      
      setTimeout(() => contentEditableRef.current.focus(), 1000)
      setNewChat(false)

     if (appendRef.current) {
      const newDiv = document.createElement("div");
      appendRef.current.appendChild(newDiv);

    
      const root = createRoot(newDiv);
      root.render(
        <AppendComponent
          query={responseData.message.query}
          answer={responseData.message.answer}
          subscriptionStatus={responseData.message.is_subscription}
          documents={responseData.message.documents_used}
          execution_time={responseData.message.execution_time}
          source={responseData.message.source}
          
        />
      );
      
      setTimeout(
        () => {
          handleScroll();
        },
         1000
      ); 
    
     
    } else {
      console.error("appendRef is not attached to a DOM element");
    }

    
   
     
    } else {
      console.error("Error2222:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending prompt:", error);
  } finally {
    setLoading(false);
  }
};




const chatHistory = async (chat_id) => {

  console.log('test')

  setQuestionAnswer([]);
  try {
   
    let access_token = getAccessToken();
    if (isTokenExpired(access_token)) {
      access_token = await refreshAccessToken();
    }
    if (!access_token) {
      console.error("Access token not found in session storage");
      return;
    }

  

    const requestData = {
      chat_id: chat_id,
     };
    console.log("request data new: ", requestData);

    let apiUrl = "";

    apiUrl = "/api/get_chat_history";
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        "Content-Type": "application/json",
        Token: `Bearer ${access_token}`,
      },
    });

    if (response.status === 200) {
     
   
      console.error("responseData chathistory: ", response);
      const responseData = response;
      setChatId(chat_id)

      setChatHistoryData(responseData.data);
      setChatHistoryCount(responseData.data.chat_history.length - 1);
      setCurrentQuery('')


      setTimeout(() => {
        handleScroll();
      }, 1000);

      const allChildren = appendRef.current.childNodes; // or use .childNodes
     /// appendRef.remove();
      console.log('all child ',allChildren)

   
     Array.from(allChildren).forEach((child) => {
     // Unmount the component if it was rendered in this child node
    // root.unmountComponentAtNode(child);
     
     // Remove the child node from the DOM
     child.remove();

   ///  child.removeButton();

   }); 

 

    } else {
      console.error("Error2222:", response);
    }
  } catch (error) {
    console.error("Error sending prompt 123:", error);
  } finally {
    setLoading(false);
  }
};


const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
};



const lastChatHistory = async () => {
  try {
    setLoading(true);
    
    let access_token = getAccessToken();
    if (!access_token) {
      console.error("Access token not found");
      return;
    }

    const apiUrl = "/api/get_last_chat_id/"; // Using Vite proxy
   // const apiUrl = "http://3.108.57.25:3300/get_last_chat_id"; 

      const response = await axios.post(apiUrl, {}, {
        headers: {
          "Content-Type": "application/json",
          Token:`Bearer ${access_token}`
        },
      });

      console.log("Last Chat ID response : ", response);

    if (response.status === 200 && response.data.status === 1) {
      const last_chat_id = response.data.last_chat.chat_id;
      setIsSubscriptionActive(response.data.last_chat.is_subscription)
      console.log("Last Chat ID test:", last_chat_id);
      setLastChatId(last_chat_id);
      ///setChatId(last_chat_id);
      chatHistory(last_chat_id);
      setMonthChat(response.data.last_chat.month_chats);
      setWeekChat(response.data.last_chat.week_chats);
      setYesterdayChat(response.data.last_chat.yesterday_chats);
      setTodayChat(response.data.last_chat.today_chats);
      localStorage.setItem("userSubscriptionId", response.data.last_chat.subscription_history.id);
      const subscriptionEndDate = formatDate(response.data.last_chat.subscription_history.end_date)
      localStorage.setItem("subscriptionEndDate", subscriptionEndDate);
      localStorage.setItem("is_subscription", response.data.last_chat.subscription_history.is_subscription);
      localStorage.setItem("is_sequence", response.data.last_chat.subscription_history.is_sequence);

      setCardExpiry(response.data.last_chat.subscription_history.card_expiry);
      setCardMethod(response.data.last_chat.subscription_history.card_method);
      setCardNumber(response.data.last_chat.subscription_history.card_pan);
      setCardType(response.data.last_chat.subscription_history.card_type);
      setSubscriptionName(response.data.last_chat.subscription_history.subscription_name);
      setSubscriptionType(response.data.last_chat.subscription_history.subscription_type);
      setCardholderName(response.data.last_chat.subscription_history.cardholder_name);
      localStorage.setItem("coupon_type", response.data.last_chat.coupon_data.coupons_type);
      localStorage.setItem("coupon_amount", response.data.last_chat.coupon_data.amount);
     
    } else {
      chatHistory("");
    }
  } catch (error) {
    console.error("API Error new:", error);
  } finally {
    setLoading(false);
  }
};



const getSidebarList = async () => {
  try {
    setLoading(true);
    
    let access_token = getAccessToken();
    if (!access_token) {
      console.error("Access token not found");
      return;
    }

    const apiUrl = "/api/get_last_chat_id/"; // Using Vite proxy
   // const apiUrl = "http://3.108.57.25:3300/get_last_chat_id"; 

      const response = await axios.post(apiUrl, {}, {
        headers: {
          "Content-Type": "application/json",
          Token:`Bearer ${access_token}`
        },
      });

      console.log("Last Chat ID response : ", response);

    if (response.status === 200 && response.data.status === 1) {
      const last_chat_id = response.data.last_chat.chat_id;
      setIsSubscriptionActive(response.data.last_chat.is_subscription)
      console.log("Last Chat ID:", last_chat_id);
     // setLastChatId(last_chat_id);
      setMonthChat(response.data.last_chat.month_chats);
      setWeekChat(response.data.last_chat.week_chats);
      setYesterdayChat(response.data.last_chat.yesterday_chats);
      setTodayChat(response.data.last_chat.today_chats);
    } else {
      chatHistory("");
    }
  } catch (error) {
    console.error("API Error new:", error);
  } finally {
    setLoading(false);
  }
};
 
const handleChatSelected = async (selectedChatId)=>{
 
    chatHistory(selectedChatId)
    setToggleSidebar(false)
    setNewChat(false);
    setCurrentQuery('')
}

const handleNewChatBtun = ()=>{
  
  setChatId('')
  setNewChat(true)
  setChatHistoryData('')
  setToggleSidebar(false)
  setCurrentQuery('')


  const allChildren = appendRef.current.childNodes; // or use .childNodes
  /// appendRef.remove();
   console.log('all child ',allChildren)


  Array.from(allChildren).forEach((child) => {
  // Unmount the component if it was rendered in this child node
 // root.unmountComponentAtNode(child);
  
  // Remove the child node from the DOM
  child.remove();

///  child.removeButton();

}); 
  

}

const handleMyProfileClick = (userName,userEmail,userPhone)=>{

    setFullName(userName)
    setEmail(userEmail)
    setPhone(userPhone)
    setShowModal(true)
    setMessagePassowrd('')
    setProfileMessage('')
}




  // Convert file to Base64
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBase64(reader.result); // Base64 string
      };
      reader.onerror = (error) => {
        console.error("Error converting file:", error);
      };
    }
  };

  


const updateProfile = async ()=>{


  try {

    setProfileModal(false)

    if (!base64) return alert("Please select photo first!");


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
      const base64Data = base64.split(",")[1];
      const requestData = {
           full_name: fullName,
           email: email,
           photo:  base64Data,
           photo_name: fileName,
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
         setProfileMessage('User profile updated successfully!')
        setFullName('')
        setEmail('')
        setPhone('')
        setFileName('')
        setBase64('')
        getUserProfile()
        setProfileModal(true)
      

        

       } else {
        // chatHistory("");
           setProfileModal(false)
       }
     } catch (error) {
       console.error("API Error new:", error);
     } finally {
     //  setLoading(false);
     }

}






const getUserProfile = async ()=>{



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
       
      const apiUrl = "/api/auth/get_user_profile"; 
     
      const requestData = {};

         console.log('request data ',requestData);
         const response = await axios.post(apiUrl, requestData, {
          headers: {
              "Content-Type": "application/json",
              Token: `Bearer ${access_token}`,
            },
         });
   console.log('user profile response ',response);
     
       if (response.status === 200 ) {
      //   setMessage(response.data.msg)
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
    setPasswordModal(false)

      // setLoading(true);

      if(newPassword==confirmPassword){

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
        // setMessage(response.data.msg)
        setMessagePassowrd(response.data.msg)
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setPasswordModal(true)
       } else {
        // chatHistory("");
        setPasswordModal(false)
       }


      }else{
        setMessagePassowrd('Password and Confirm Password should be same.')
      }
     } catch (error) {
       console.error("API Error new:", error);
     } finally {
     //  setLoading(false);
     }

}


const updateSubscription = async (cancelSubsVal)=>{


//console.log('is cancel ',isSubscriptionCancel);

  try {
    setSubscriptionModal(false)

      // setLoading(true);

      let access_token = getAccessToken();
      if (isTokenExpired(access_token)) {
        access_token = await refreshAccessToken();
      }
      if (!access_token) {
        console.error("Access token not found in session storage");
        return;
      }
       
      const apiUrl = "/api/is_subscription"; 
     
      const requestData = {
          is_subscription: cancelSubsVal,
        
         };

         console.log('request data ',requestData);
         const response = await axios.post(apiUrl, requestData, {
          headers: {
              "Content-Type": "application/json",
              Token: `Bearer ${access_token}`,
            },
         });
   console.log('update subscription response ',response);
     
       if (response.status === 200 ) {
        // setMessage(response.data.msg)
        setMessagePassowrd(response.data.msg)
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setSubscriptionModal(true)
       if(isSubscriptionCancel==true){
        localStorage.setItem("is_subscription", 0);
        setIsSubscriptionCancel(true)
       
       }else{
        localStorage.setItem("is_subscription", 1);
        setIsSubscriptionCancel(false)
       
       }

       // localStorage.getItem("is_subscription");
       } else {
        // chatHistory("");
        setPasswordModal(false)
        setSubscriptionModal(false)
       }


     
     } catch (error) {
       console.error("API Error new:", error);
     } finally {
     //  setLoading(false);
     }
     
}

  
const toggleNewPasswordVisibility = () => {
  setShowNewPassword(!showNewPassword);
};


const toggleOldPasswordVisibility = () => {
  setShowOldPassword(!showOldPassword);
};

const toggleConfirmPasswordVisibility = () => {
  setShowConfirmPassword(!showConfirmPassword);
};



const handleProfileOkBtn = ()=>{

  setProfileModal(false)
  setShowModal(false)
 
}


const handlePasswordOkBtn = ()=>{

  setProfileModal(false)
  setPasswordModal(false)
  setShowModal(false)
  setSubscriptionModal(false)
 
}


const handleSubscriptionOkBtn = ()=>{
  setProfileModal(false)
  setPasswordModal(false)
  setShowModal(false)
  setSubscriptionModal(false)
}



const toggleSidebar = ()=>{

  console.log('test toggle')
  setToggleSidebar(!sidebarToggle)
}


const handleSidebarToggle = ()=>{

  setToggleSidebar(!sidebarToggle)

}





const getSubscriptionHistory = async () => {
  try {
   // setLoading(true);
    
 
   // const apiUrl = "http://3.108.57.25:3300/get_last_chat_id"; 

   let access_token = getAccessToken();
   if (!access_token) {
     console.error("Access token not found");
     return;
   }

   const apiUrl = "/api/get_subscription_history"; // Using Vite proxy
  // const apiUrl = "http://3.108.57.25:3300/get_last_chat_id"; 

     const response = await axios.get(apiUrl, {
       headers: {
       Token:`Bearer ${access_token}`
       },
     });


console.log('subscription history ',response);
  
    if (response.status === 200 ) {
      setSubscriptionHistory(response.data.history)
    } else {
     // chatHistory("");
    }
  } catch (error) {
    console.error("API Error new:", error);
  } finally {
  //  setLoading(false);
  }
};


/* function parseDMY(dateStr) {
  const [day, month, year] = dateStr.split("-");
  return new Date(`${day}-${month}-${year}`); 
} */

function parseDMY(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
}

  return (
    <div>
      
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
   <Header handleMyProfileClick={handleMyProfileClick} handleHamburgerIconClick={toggleSidebar}></Header>

   <Sidebar todayChat={todayChat} yesterdayChat={yesterdayChat} weekChat={weekChat} monthChat={monthChat} onClickNewChat={handleNewChatBtun} onClickChat={handleChatSelected} currentChatId={chatId} handleSidebarToggle={sidebarToggle}></Sidebar>


  
  
  
<main className={`${chatId && chatHistoryData!=''?'pt-8 pb-16 lg:pt-16 lg:pb-24':''} bg-white dark:bg-gray-900 antialiased `} /* ref={chatRef} */>
  <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
    
    
      <article className="mx-auto w-full md:ml-64 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
         
     
         
          <section className="not-format mb-8 sm:mb-16 md:mb-8 lg:mb-8 xl:mb-16 2xl:mb-24 w-full">
              {/* <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion (20)</h2>
              </div> */}
             
              <article className="p-6 md:mb-6 md:mt-0 mt-8 text-base bg-white rounded-lg dark:bg-gray-900">
             
              {chatId 
              && chatHistoryData != "" && 
              chatHistoryData.chat_history.map((chat, index) => (
                <div key={index}>
             

             <footer className="flex justify-end items-center mb-2 mt-6  md:mr-[25%] -z-100">
                <div className="flex items-center text-left p-4 rounded-2xl bg-gray-100 md:w-[500px]"> {/* Keeps image and text in one line */}
                  <img
                    className="w-6 h-6 rounded-full mr-2"
                    src="user.png"
                    alt="User"
                  />
                  <p className="font-normal text-normal text-gray-900 dark:text-white">
                    {chat.query}
                  </p>
                </div>
              </footer>




               
                   <div className="flex items-center mt-8 space-x-4 ">
                      <button type="button"
                          className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                            <svg className="mr-1.5 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z"/>
                            </svg>
                          Answer
                      </button>
                  </div>
                   <p ref={restrictedCopyRef} >{parseContent(chat.answer)}</p> 
                

                   <div className=" items-center mt-4  mt-8">
                      {/* <button type="button"
                          className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                           


                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M12 4.248C8.852-1.264 0 .325 0 6.477 0 9.44 2.233 12.046 5.493 15.28l6.363 5.812c.395.361.9.361 1.294 0l6.363-5.812C21.768 12.046 24 9.44 24 6.477c0-6.152-8.852-7.741-12-2.229Z"/>
                            </svg> Like

                      </button> */}


                       {/*  <p 
                          className="flex items-center font-medium text-sm text-gray-500  py-2">
                            <b>Source:</b> &emsp;{chat.source ? chat.source : 'N/A'}

                        </p>

                        <p 
                          className="flex items-center font-medium text-sm text-gray-500 py-2">
                            <b>Documents:</b> &emsp;{chat.documents_used ? chat.documents_used : 'N/A'}

                        </p>

                        <p 
                          className="flex items-center font-medium text-sm text-gray-500 py-2">
                            <b>Execution Time:</b> &emsp;{chat.execution_time ? chat.execution_time : 'N/A'}

                        </p>
 */}

                  </div> 


                  { isVisible ? 
                  <button
                     onClick={scrollToBottom} 
                    className="fixed z-100 bg-white hover:bg-gray-50  border p-1 rounded-full overflow-hidden left-1/2 bottom-28  "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-8 h-8 text-gray-600 hover:text-gray-900 transition duration-300"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 16a1 1 0 0 0 .707-.293l5-5a1 1 0 0 0-1.414-1.414L12 13.586 7.707 9.293a1 1 0 0 0-1.414 1.414l5 5A1 1 0 0 0 12 16Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                 :''}  
              

                     {/* {limitExceed == 1 ? (
                        <div className="fixed z-100 bg-yellow-800 text-white   border p-2 rounded-full overflow-hidden left-1/3 bottom-28 ">
                           Your daily usage limit has been exceeded. Please try again later.
                        </div>
                    ) : ''} */}
             

                 </div>
              ))}

               

            
            <div id="appendId" ref={appendRef}></div>  
            <div ref={bottomRef}></div>  
                          
        
            
                    {limitExceed == 1  && isSubscriptionActive==1? (
                        <div className="fixed z-100 bg-yellow-800 text-white   border p-2 rounded-full overflow-hidden left-1/3 bottom-28 ">
                          Your daily limit exhausted, please try next day
                        </div>
                    ) : ''}


                  {isSubscriptionActive && isSubscriptionActive == 0 ? (
                        
                        <div className="fixed z-100 bg-yellow-800 text-white border p-2 rounded-full overflow-hidden left-1/2 -translate-x-1/2 bottom-28 w-full md:w-1/3">
                       Your plan has expired, please renew to continue……
                        </div>
                        
                    ) : ''}


               

            {/* {limitExceed=='1'?
                    <div className="flex flex-col text-center w-full mb-20 mt-40">
                        
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-0 text-gray-900">DomGenie</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Your maximum limit to ask question has been exceed. Please upgrade your plan.</p>
                  </div>
              
              :''}  */}


              
                   

                 
                 
                  {loading ? (
                         /*  <div className="flex items-center mt-4">
                          <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
                            <img
                              className="mr-2 w-6 h-6 rounded-full"
                              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                              alt=""
                            />
                           {currentQuery.charAt(0).toUpperCase() +
                          currentQuery.slice(1)}
                          </p>
                          
                        </div> */

                          <div className="flex justify-end items-center my-16 relative md:mr-[22%] ">
                              <div className="flex items-center text-left p-4 rounded-2xl bg-gray-100 md:w-[600px]"> {/* Keeps image and text in one line */}
                                <img
                                  className="w-6 h-6 rounded-full mr-2"
                                  src="user.png"
                                  alt=""
                                />
                                <p className="font-normal text-normal text-gray-900 dark:text-white">
                                {currentQuery.charAt(0).toUpperCase() +
                              currentQuery.slice(1)}
                                </p>
                              </div>
                          </div>


                  ):""}

                {loading ? (
                  <span className="p-2 mt-4 text-gray-700  text-base">
                    {/*  Loading Response... */}
                    <PulseLoader
                      color={"#20ADE6"}
                      loading={loadingSpinner}
                      size={10}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                      cssOverride={{
                        zIndex: "99999",
                        align: "center",
                        backgroundColor: "#fff",
                      }}
                    />
                  </span>
                ) : (
                  ""
                )}





              </article>
              
             
          </section>
      </article>
      
  </div>


           

              
            


</main>

{/* 
  setChatId('')
  setNewChat(true)
  setChatHistoryData('')
  setToggleSidebar(false)
  currentQuery('')


*/}

{/*  {console.log('chat history data test ',chatHistoryData.chat_history)} */}
{/* {chatId==''   && (currentQuery=='' || currentQuery=='undefined') && chatHistoryData && chatHistoryData.chat_history.length == 0 ? */}
{chatId==''   && (currentQuery=='' || currentQuery=='undefined') && newChat ? 

            <main className="bg-white antialiased pt-0 pb-0 lg:pt-0 lg:pb-0 mb-24 ml-0">
            <div className="flex flex-col text-center justify-center items-center min-h-screen px-4">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                How can I help you today?
              </h1>
          
              <div className="flex justify-center w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                  <div
                    className="border-2 border-gray-300 rounded p-4 text-left cursor-pointer"
                   
                    onClick={() => handleSendPrompt('How can an issuer system identify a DCC transaction')}
                  >
                    How can an issuer system identify a DCC transaction
                  </div>
                  <div className="border-2 border-gray-300 rounded p-4 text-left cursor-pointer"
                   onClick={() => handleSendPrompt('What are the key ISO8583 Data Elements for AFD Transaction')}
                  >
                    What are the key ISO8583 Data Elements for AFD Transaction
                  </div>
                  <div className="border-2 border-gray-300 rounded p-4 text-left cursor-pointer"
                    onClick={() => handleSendPrompt('How a Payment Gateway reconciles with acquirer')}
                  >
                    How a Payment Gateway reconciles with acquirer
                  </div>
                  <div className="border-2 border-gray-300 rounded p-4 text-left cursor-pointer"
                   onClick={() => handleSendPrompt('How can a fallback transaction be identified')}
                  >
                    How can a fallback transaction be identified
                  </div>
                </div>
              </div>
            </div>
          </main>
          
        
          
          :''} 

          






<section 
  className="fixed left-0 right-0 bottom-2 md:mr-[400px] md:ml-[400px] mr-3 ml-3 rounded-2xl border bg-gray-50 mb-4 md:w-[50%] w-full shadow-2xl overflow-hidden"
  style={{ margin: "0 auto", zIndex: 50 }}
>
  <div className="py-2 px-1 lg:pt-0 lg:pb-8 lg:pl-0 lg:pr-0">
    <div className="mx-auto sm:text-center"> 
  
      <form action="#">
        {/* Container with flex to align textarea & button correctly */}
        <div className="flex items-end space-x-2 mx-auto w-full">
          {/* Textarea inside a growable container */}
          <div className="w-full flex-grow">
            <textarea
              autoFocus
              className="chatInput block p-3 pl-3 w-full text-sm text-gray-900 bg-gray-50 rounded-2xl border-0 focus:ring-0 resize-none overflow-hidden"
              placeholder="Ask Anything..."
              id="askAnything"
              required
              ref={contentEditableRef}
              disabled={loading || limitExceed === '1'}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  PreHandleSendPrompt();
                }
              }}
              onInput={(e) => {
                e.target.style.height = "auto"; 
                e.target.style.height = `${e.target.scrollHeight}px`; 
              }}
              rows={1} // Starts with 1 line but expands dynamically
              onChange={(e) => handleEnterIcon(e)}
            />
          </div>

          {/* Send Button */}
          <div className="flex items-center justify-center rounded-full bg-[#6f551e] p-2  md:-mb-6 lg:-mb-6 " style={{marginRight:"10px"}}>
            <button
              type="button"
              className={`text-sm cursor-pointer ${enterIcon ? "send-file-active" : "send-file"}`}
              onClick={() => PreHandleSendPrompt()}
            >
              {loading ? (
                <svg
                  className="text-white p-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect width="24" height="24" />
                </svg>
              ) : (
                <svg
                  className="text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2a1 1 0 0 1 .932.638l7 18a1 1 0 0 1-1.326 1.281L13 19.517V13a1 1 0 1 0-2 0v6.517l-5.606 2.402a1 1 0 0 1-1.326-1.281l7-18A1 1 0 0 1 12 2Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</section>





  </div>



 

    <div id="defaultModal" tabindex="-1" aria-hidden="true" className={`${showModal?'':'hidden'}  bg-black/50 overflow-y-auto fixed top-0 right-0 z-999 flex justify-end items-start w-full h-screen `} style={{zIndex:"999"}}>
      <div className="relative p-4 w-[440px] max-w-2xl h-full bg-white shadow-lg dark:bg-gray-800">
        
        {/* Header with Tabs */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b dark:border-gray-600 overflow-x-scroll">
          <div className="flex space-x-4 ">
            <button 
              className={`px-4 py-2 font-medium ${activeTab === "Profile" ? "border-b-2 border-yellow-700 text-yellow-700" : "text-gray-600"}`}
              onClick={() => setActiveTab("Profile")}
            >
              Profile
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === "Settings" ? "border-b-2 border-yellow-700 text-yellow-700" : "text-gray-600"}`}
              onClick={() => setActiveTab("Settings")}
            >
              Password
            </button>
              {is_subscription==1?(
            <button 
              className={`px-4 py-2 font-medium ${activeTab === "Subscription" ? "border-b-2 border-yellow-700 text-yellow-700" : "text-gray-600"}`}
              onClick={() => setActiveTab("Subscription")}
            >
              Subscription
            </button>
            ):''}

            <button 
              className={`px-4 py-2 font-medium ${activeTab === "subscriptionHistory" ? "border-b-2 border-yellow-700 text-yellow-700" : "text-gray-600"}`}
              onClick={() => setActiveTab("subscriptionHistory")}
            >
               History 
            </button>


          </div>
          <button onClick={() => setShowModal(false)} type="button" className="text-gray-100 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 absolute -left-10 top-2 ">
            <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>

        {/* Tab Content */}
        <div className="pb-16">
          {activeTab === "Profile" ? (
             <form action="#" className="pb-16">
             <div className="grid gap-4 mb-4">
               <div>
                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                <input type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" placeholder="Enter fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                ></input>
               </div>

               <div>
                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></input>
               </div>

               <div>
                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                <input type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" placeholder="Enter phone"
                value={''}
                onChange={(e) => setPhone(e.target.value)}
                ></input>
               </div>

               <div>
                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo</label>
               
                 <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2" />
                  
                  {fileName && <p className="text-sm text-gray-500">Selected: {fileName}</p>}
                  {base64 && <img src={base64} alt="Preview" className="mt-2 w-40 h-auto" />}
               </div>
       
             {/*  {profileMessage?
               <p className="text-lg text-blue-900">{profileMessage}</p> 
               :''} */}
             </div>
           </form>
          ) :activeTab === "Settings"? (
            <form action="#" className="pb-16">
            <div className="grid gap-4 mb-4">
              <div className="relative w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
               <input type={showOldPassword ? 'text' : 'password'} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" placeholder="**********"
               
               value={oldPassword}
               onChange={(e) => setOldPassword(e.target.value)}
               ></input>

                  {showOldPassword?
                        <svg
                          onClick={toggleOldPasswordVisibility} // Add onClick event if you want to toggle visibility
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
                      onClick={toggleOldPasswordVisibility}
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
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
               <input type={showNewPassword ? 'text' : 'password'} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" placeholder="**********"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
               />

                {showNewPassword?
                        <svg
                          onClick={toggleNewPasswordVisibility} // Add onClick event if you want to toggle visibility
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
                      onClick={toggleNewPasswordVisibility}
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
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
               <input type={showConfirmPassword ? 'text' : 'password'} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" placeholder="**********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
               ></input>

              {showNewPassword?
                        <svg
                          onClick={toggleConfirmPasswordVisibility} // Add onClick event if you want to toggle visibility
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
                      onClick={toggleConfirmPasswordVisibility}
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

              {messagePassowrd?
               <p className="text-lg text-blue-900">{messagePassowrd}</p> 
               :''}
            </div>
          </form>
          ):activeTab === "Subscription" && is_subscription==1? 
          
         
             <div className="grid gap-4 mb-4">
               <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                    <div className="flex flex-col pb-3">
                       
                        <dd className="text-normal font-normal">Subscription Name</dd>
                        <dt className="mb-1 text-gray-500 md:text-normal dark:text-gray-400">{subscriptionName}</dt>
                    </div>

                    <div className="flex flex-col py-3">
                       <dd className="text-normal font-normal">Subscription Expiry</dd>
                       <dt className="mb-1 text-gray-500 md:text-normal dark:text-gray-400">{localStorage.getItem("subscriptionEndDate")}</dt>
                    </div>

                  
                    <div className="flex flex-col pt-3">
                        <dd className="text-normal font-normal">Card Number</dd>
                        <dt className="mb-1 text-gray-500 md:text-normal dark:text-gray-400">{cardNumber.slice(-4)}</dt>
                    </div>

                    <div className="flex flex-col pt-3">
                        <dd className="text-normal font-normal">Card Type</dd>
                        <dt className="mb-1 text-gray-500 md:text-normal dark:text-gray-400">{cardType}</dt>
                    </div>

                    <div className="flex flex-col pt-3">
                        <dd className="text-normal font-normal">Card Method</dd>
                        <dt className="mb-1 text-gray-500 md:text-normal dark:text-gray-400">{cardMethod}</dt>
                    </div>

                    <div className="flex flex-col pt-3">
                        <dd className="text-normal font-normal">Cardholder Name</dd>
                        <dt className="mb-1 text-gray-500 md:text-normal dark:text-gray-400">{cardholderName}</dt>
                    </div>

                </dl>

               
             </div>
           
          :activeTab === "subscriptionHistory"? 
          
         
          <div className="grid gap-4 mb-4">
            
{/* <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Subscription History</h2> */}
<ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">

{subscriptionHistory.map((history, index) => (
   



    <dl key={index}  className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
      
        <div className="flex flex-col pb-3 border-b mt-2">
          
            <dd className="text-normal font-normal">{subscriptionName}</dd>

            <dt className="mb-1 text-gray-500 md:text-normal dark:text-gray-400">Price : {'AED '+history.subscription_amount}</dt>
            <dt className="mb-1 text-gray-500 md:text-normal dark:text-gray-400"> Start Date : {parseDMY(history.start_date)}</dt>
            <dt className="mb-1 text-gray-500 md:text-normal dark:text-gray-400">Price : {'AED '+history.subscription_amount}</dt>
        </div>

       


    </dl>






))}
    
   
</ul>


            
          </div>
        
       :''}
        </div>

        {/* Fixed Button at Bottom */}
        <div  className="absolute bottom-0 left-0 w-full bg-white p-4 border-t">
          {activeTab=='Profile'? (
            <button onClick={updateProfile} type="button" className="w-full bg-yellow-700 hover:bg-yellow-800 text-white font-medium rounded px-5 py-2.5">
              Update Profile
            </button>
          ):activeTab=='Settings'?
            <button onClick={updatePassword} type="button" className="w-full bg-yellow-700 hover:bg-yellow-800 text-white font-medium rounded px-5 py-2.5">
            Update Password
          </button>
           :activeTab=='Subscription'?
            <button onClick={()=>updateSubscription(0)} type="button" className="w-full bg-yellow-700 hover:bg-yellow-800 text-white font-medium rounded px-5 py-2.5">
            Cancel Subscription
          </button>
          :''
        }
        </div>
      </div>






<div id="popup-modal" tabindex="-1" className={`${subscriptionModal?'':'hidden'} bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full flex md:inset-0  max-h-full`}>
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <button onClick={()=>setSubscriptionModal(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"> {messagePassowrd}</h3>
             
               <button onClick={handleSubscriptionOkBtn} data-modal-hide="popup-modal" type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Ok
                </button>
              {/*   <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>  */}
            </div>
        </div>
    </div>
</div>






    </div>




    <div id="popup-modal" tabindex="-1" className={`${profileModal?'':'hidden'} bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full flex md:inset-0  max-h-full`}>
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <button onClick={()=>setProfileModal(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"> {profileMessage}</h3>
             
               <button onClick={handleProfileOkBtn} data-modal-hide="popup-modal" type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Ok
                </button>
              {/*   <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>  */}
            </div>
        </div>
    </div>
</div>






<div id="popup-modal" tabindex="-1" className={`${passwordModal?'':'hidden'} bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full flex md:inset-0  max-h-full`}>
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <button onClick={()=>setPasswordModal(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"> {messagePassowrd}</h3>
             
               <button onClick={handlePasswordOkBtn} data-modal-hide="popup-modal" type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Ok
                </button>
              {/*   <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>  */}
            </div>
        </div>
    </div>
</div>











</div>
  
  );


}

