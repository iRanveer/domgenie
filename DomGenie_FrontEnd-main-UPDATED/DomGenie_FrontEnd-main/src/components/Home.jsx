import { useEffect } from "react";
import { motion , useAnimation} from "framer-motion";
import AOS from "aos";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import CookieConsent from "./CookieConsent";




const Home = () => {


  const accessToken = localStorage.getItem('access_token')

  const navigate = useNavigate()
  

  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: false, // Animation resets when leaving viewport
    threshold: 0.3, // 30% of section should be visible to trigger
  });

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once
    });

    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }

  }, [controls, inView]);




    const handleTryFreeButton = ()=>{
  
      if(accessToken==''){
        navigate('/register')
      }else{
        navigate('/chat')
      }
      
    }


    const handleLearnmore = ()=>{
      navigate('/topicsupport')
    }
  return (
    <>
  



<div className="" >
 <section className="pt-24 pb-36   " style={{
     background: "linear-gradient(to bottom, #111827 10%, #6f551e 100%, #111827 80%)", 
  
    
  }}> 
   

    <div className=" px-4 mx-auto text-center lg:mt-16  ">
         <p  className=" " role="alert">
            <span className="text-2xl font-normal mx-4"></span> 
           
        </p> 

        <motion.p 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
          }}
            className="inline-flex justify-between items-center text-white font-roboto font-medium md:text-[56px] text-[24px]" 
          >
 
          The impossible is just another challenge!
          </motion.p>
        

        {/* <motion.h1 
   ref={ref}
   initial="hidden"
   animate={controls}
   variants={{
     hidden: { opacity: 0, scale: 0.8 },
     visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
   }}
  className="mb-4 text-2xl font-normal tracking-tight leading-none md:text-4xl lg:text-3xl text-gray-200 font-stainless mt-16"
>
  The first AI chatbot<br/> designed to provide the most structured answers for the card payments domain!
</motion.h1>

<motion.p 
 ref={ref}
 initial="hidden"
 animate={controls}
 variants={{
   hidden: { opacity: 0, scale: 0.8 },
   visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
 }}
  className="mb-8 text-lg font-normal lg:text-lg sm:px-16 xl:px-48 text-gray-400"
>
Your AI-powered Domain Genie is here to answer all your card and payment queries instantly<br/>
 
</motion.p>

<motion.p 
 ref={ref}
 initial="hidden"
 animate={controls}
 variants={{
   hidden: { opacity: 0, scale: 0.8 },
   visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
 }}
  className="mb-8 text-lg font-normal lg:text-lg sm:px-16 xl:px-48 text-gray-400"
>
 
Join today and start your journey to continuous learning
</motion.p> */}



    
    
   {/*   <div className="flex flex-col lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 pt-8" data-aos="fade-up">

      
            

            <motion.a 
  whileHover={{ scale: 1.1 }} 
  whileTap={{ scale: 0.95 }}
  href="price" 
  className="inline-flex justify-center items-center py-3 px-5 text-normal font-normal text-center rounded-lg text-gray-300 border-2 border-light  hover:bg-gray-600 border-gray-500"
>
  Try DomGenie
  <svg className="ml-2 -mr-1 mb-1 w-5 h-5 -rotate-45" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
</svg>  

</motion.a>

          
        </div> */}



<section className=" ">
  <div className="container mx-auto flex px-1 py-6 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
    {/* <h1 className="lg:mb-4 md:mb-4 mb-16 text-white font-roboto font-normal md:text-[36px] text-[16px] md:leading-[64px] lg:leading-[64px] leading-[32px]" >
  The first AI chatbot designed to provide the most structured answers for the card payments domain!
</h1> */}

<motion.h1 
   ref={ref}
   initial="hidden"
   animate={controls}
   variants={{
     hidden: { opacity: 0, scale: 0.8 },
     visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
   }}
  className="lg:mb-4 md:mb-4 mb-16 text-white font-roboto font-normal md:text-[36px] text-[16px] md:leading-[64px] lg:leading-[64px] leading-[32px]"
>
  The first AI chatbot<br/> designed to provide the most structured answers for the card payments domain!
</motion.h1>


     {/*  <p className="mb-8 text-white font-montserrat font-normal md:text-[20px]" >Join today and start your journey to continuous learning</p> */}

      <motion.p 
 ref={ref}
 initial="hidden"
 animate={controls}
 variants={{
   hidden: { opacity: 0, scale: 0.8 },
   visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
 }}
  className="mb-8 text-white font-montserrat font-normal md:text-[20px]"
>
 
Join today and start your journey to continuous learning
</motion.p> 
      <div className="flex justify-center mt-8 cursor-pointer ">
       {/*  <a href="price" className="inline-flex text-white bg-[#101827] border-0 py-2 px-6 focus:outline-none hover:bg-[#101827] rounded-xl text-[16px] font-extrabold font-montserrat leading-8">Try DomGenie</a> */}


        <motion.a 
  whileHover={{ scale: 1.1 }} 
  whileTap={{ scale: 0.95 }}
  onClick={handleTryFreeButton} 
  className="inline-flex text-white bg-[#101827] border-0 py-2 px-6 focus:outline-none hover:bg-[#101827] rounded-xl text-[16px] font-extrabold font-montserrat leading-8 "
>
  <span  style={{lineHeight:"55px"}}>Try DomGenie {/* <span> Free</span><br/>Beta Version */}</span>
  
</motion.a>


  
       {/*  <a className="ml-4 inline-flex text-gray-200  border-2 border-gray-100 py-2 px-6 focus:outline-none hover:bg-gray-900 rounded-xl text-[16px] font-extrabold font-montserrat leading-8">Learn More</a> */}

        <motion.a 
  whileHover={{ scale: 1.1 }} 
  whileTap={{ scale: 0.95 }}
  onClick={handleLearnmore}
  className="cursor-pointer ml-4 inline-flex text-gray-200  border-2 border-gray-100 py-2 px-6 focus:outline-none hover:bg-gray-900 rounded-xl text-[16px] font-extrabold font-montserrat "
  style={{lineHeight:"55px"}}
>
Learn More
  
</motion.a>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6" data-aos="fade-up">
      <img className="object-cover object-center rounded" alt="hero" src="section1-img.png"/>
    </div>
  </div>
</section>

        
    </div>

    
    
</section>



{/* 
<section className=" p-24" style={{
    background: "linear-gradient(to bottom, #111827 10%, #6f551e 100%)",
    height: "auto",
    
  }}>

<h1 className="sm:text-3xl text-2xl font-medium text-center title-font mb-4 text-gray-300">The Brain Behind DomGenie
</h1>

<h2 className="sm:text-xlg text-lg font-medium text-center  mb-0 text-gray-400">Build by expoerts, Powered by AI, Designed for you
</h2>


   <div className="container px-5 py-24 mx-auto" data-aos="fade-up"> 
    <div className="flex flex-wrap -m-4">
      <div className="p-4 lg:w-1/2 ">
      <div className="h-[150px] bg-gray-800  bg-opacity-75 md:px-8 md:pt-8 pb-8 rounded-lg overflow-hidden text-center relative" >
      
          <p className="leading-relaxed mb-3 text-gray-300">
          DomGenie is powered by our advanced AI RAG model, meticulously trained using custom-built content designed by seasoned card payment experts with decades of industry experience.
          </p>
        </div>

      </div>
      <div className="p-4 lg:w-1/2">
        <div className="h-[150px] bg-gray-800  bg-opacity-75 px-8 pt-8 pb-8 rounded-lg overflow-hidden text-center relative">
        
          

          <p className="leading-relaxed mb-3 text-gray-300">
          Every answer you receive is structured, precise, and backed by real-world expertise, ensuring you get the most reliable insights in the card payments domain.

          </p>
        </div>
      </div>

     

    </div>
  </div>



</section> */}



<section className="  py-24" style={{
    background: "linear-gradient(to bottom, #111827 10%, #6f551e 100%)",
   
    
  }}>
   

<div className="px-4 "  data-aos="fade-right">
<h1 className=" md:text-[36px] lg:text-[36px] text-[24px] font-normal font-roboto text-center  text-white mb-8 md:leading-[64px]" >The Brain Behind DomGenie
</h1>



<h2 className="md:text-[24px] lg:text-[24px] text-[16px] font-normal font-roboto text-center text-white leading-[34px] " >Build by experts, Powered by AI, Designed for you
</h2>
</div>

  <div className=" lg:px-16 md:px-16 lg:mx-32 md:mx-32 mx-8 flex md:py-16 py-8  md:flex-row flex-col items-center md:mt-24 mt-2  px-8  rounded-2xl" style={{
    background: "linear-gradient(to bottom, #111827 30%, #6f551e 100%)",
  
    
  }} data-aos="fade-up">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24  md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
     
      <p className="mb-8  font-normal md:text-[24px] lg:text-[24px] text-[16px] text-gray-200 font-montserrat leading-8"> DomGenie is powered by our advanced AI framework that has been meticulously developed with customized content crafted by seasoned professionals in the card payment industry, who collectively possess decades of expertise</p>
      
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-6/6">
      <img className="object-cover object-center rounded" alt="hero" src="section2-img.png"/>
    </div>
  </div>


  <div className=" lg:mx-32 md:mx-32 mx-8 flex   md:flex-row flex-col items-center mt-24 px-8  rounded-2xl" style={{
    background: "linear-gradient(to bottom, #111827 30%, #6f551e 100%)",
  
    
  }}  data-aos="fade-up">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-6/6">
      <img className="object-cover object-center rounded md:h-[300px] md:block hidden" alt="hero" src="section33-img.png"/>
      <img className="object-cover object-center rounded md:h-[300px] md:hidden block" alt="hero" src="section3-img.png"/>
    </div>
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center md:mt-0 mt-8">
     
    <p className="mb-8  font-normal md:text-[24px] lg:text-[24px] text-[16px] text-gray-200 font-montserrat leading-8"> Every answer you receive is structured, precise, and backed by real-world expertise, ensuring you get the most reliable insights in the card payments domain.</p>
      
      
    </div>
    
  </div>
</section>





<section className="text-gray-200 body-font " style={{
    background: "linear-gradient(to bottom, #111827 10%, #6f551e 100%)",
    height: "auto",
    
  }} >
  <div className="container px-5 py-24 mx-auto flex flex-wrap"  data-aos="fade-up">
    <div className="flex flex-wrap w-full">
      <div className="lg:w-1/2 md:w-1/2 md:pr-10 md:py-6">
        <div className="flex relative pb-12">
          <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-0.5 bg-green-700 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6"></path> 
            <path d="M6 15l6 6 6-6"></path>
          </svg>
          </div>
          <div className="flex-grow pl-4">
            <h2 className="font-normal title-font text-gray-100 mb-1 tracking-wider md:text-32[px] lg:text-[32px] text-[24px] font-roboto" >Learn More Feature</h2>
           
            <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 w-5 h-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>

            </div>
              <p className="leading-relaxed ml-2 font-normal md:text-[20px] lg:text-[20px] text-[16px] font-montserrat" >Our AI model is continuously trained and expanded to include other domains, ensuring up-to-date and accurate insights.</p>
            </div>

          <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 w-5 h-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>
            </div>
              <p className="leading-relaxed ml-2 font-normal md:text-[20px] lg:text-[20px] text-[16px] font-montserrat" >For a detailed breakdown, <a className="underline" href="topicsupport">Click Here</a></p>
          </div>

          <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 w-5 h-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>
            </div>
              <p className="leading-relaxed ml-2 font-normal md:text-[20px] lg:text-[20px] text-[16px] font-montserrat" >Stay tuned for ongoing enhancements and new capabilities as we push the boundaries of AI-driven intelligence in the payments industry.</p>
          </div>

          
          </div>


          
        </div>

        
      </div>
     {/*  <img className="lg:w-1/2 md:w-1/2 w-full h-64 md:h-[400px] object-cover object-center rounded-lg md:mt-0 mt-12 h-[400px] " src="domgenie-img.jpeg" alt="step"/> */}

      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-full mb-10 md:mb-0 ml-auto">
        <img className=" h-64 md:h-[350px] md:w-[500px] w-full rounded-lg md:mt-12 mt-12 h-[350px]" 
              src="domgenie-img.jpeg" 
              alt="step"/>
      </div>


    </div>
  </div>
</section>






    

{/* ---------------------- */}



<section className="text-gray-200 body-font" style={{
    background: "linear-gradient(to bottom, #111827 10%, #6f551e 100%)",
    height: "auto",
    
  }}>

<h1 data-aos="fade-right" className="md:text-[36px] lg:text-[36px] text-[24px] font-normal text-center  text-white mb-8 md:leading-[64px] lg:leading-[64px] pt-24 font-roboto" >Explore the Card Payments Knowledge Hub
</h1>


  <div className="container mx-auto flex px-5 md:py-24 py-8 md:flex-row flex-col items-center"  data-aos="fade-up">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      <img className="object-cover object-center rounded" alt="hero" src="cc1.jpg"/>
    </div>
    <div className="flex relative pb-1 md:ml-24">
          <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-0.5 bg-green-700 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6"></path> 
            <path d="M6 15l6 6 6-6"></path>
          </svg>
          </div>
          <div className="flex-grow pl-4">
            <h2 className="font-normal  text-gray-100 mb-1 text-[24px] font-roboto" >DomGenie is structured to help you master the card payments domain through well-organized learning categories, including:</h2>
           
            <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>

            </div>
              <p className="leading-relaxed ml-2 font-medium md:text-[20px] lg:text-[20px] text-[16px] font-montserrat" ><b>Fundamentals – </b>Key players, card management, transactions, and security basics.</p>
            </div>

          <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>
            </div>
              <p className="leading-relaxed ml-2 font-medium md:text-[20px] lg:text-[20px] text-[16px] font-montserrat" style={{fontFamily:"Montserrat"}}><b>Issuer-Side Processing – </b>ISO 8583 messaging, authorization, clearing, refunds, and response codes.</p>
          </div>

          <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>
            </div>
              <p className="leading-relaxed ml-2 font-medium md:text-[20px] lg:text-[20px] text-[16px] font-montserrat" style={{fontFamily:"Montserrat"}}>
                <b>HSM & Key Management – </b> PIN security, encryption, and key exchange processes.</p>
          </div>

          <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>
            </div>
              <p className="leading-relaxed ml-2 font-medium md:text-[20px] lg:text-[20px] text-[16px] font-montserrat" style={{fontFamily:"Montserrat"}}>
                <b>Acquiring & Merchant Processing – </b>  Acquiring models, routing, batch reconciliation, and settlement.</p>
          </div>

          
          </div>


          
        </div>
  </div>
</section>






<section>

    <div className="relative w-full md:h-[350px] h-[200px]">
  <img className="w-full h-full object-cover" src="cc6.jpg" alt="dashboard image" />
  
  
  <div className="absolute justify-center items-center inset-0 flex  bg-black/10 " data-aos="fade-right">
    <h1 className="flex text-gray-200 text-center md:mr-[300px]  md:text-[40px] text-[20px] font-roboto font-medium" >Your AI-powered Domain Genie is here <br/>to answer all your card and payment queries instantly</h1>
  </div>
</div>
</section>






<section className="text-gray-200 body-font" style={{
    background: "linear-gradient(to bottom, #111827 10%, #6f551e 100%)",
    height: "auto",
    
  }}>

<h1 data-aos="fade-right" className="md:text-[36px] lg:text-[36px] text-[24px] font-normal text-center  text-white mb-8 leading-[64px] pt-24 font-roboto mx-8" >Who is DomGenie For?
</h1>

<h2 data-aos="fade-right" className="md:text-[24px] lg:text-[24px] text-[16px] font-normal text-center  text-white  md:leading-[64px] font-roboto mx-8" >Empowering Professionals Across Industries, Roles & Beyond!
</h2>


  <div className="container mx-auto flex px-5 lg:py-24 md:py-24 py-16 md:flex-row flex-col items-center"  data-aos="fade-up">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      <img className="h-64 md:h-[350px] md:w-[500px] w-full object-cover object-center rounded-lg md:mt-12 mt-12  object-cover object-center rounded-2xl" alt="hero" src="section5-img.png"/>
    </div>


    <div className="flex relative pb-1 md:ml-24">
          <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-0.5 bg-green-700 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6"></path> 
            <path d="M6 15l6 6 6-6"></path>
          </svg>
          </div>
          <div className="flex-grow pl-4">
            <h2 className="font-medium  text-gray-100 mb-1  lg:text-[32px] md:text-[32px] text-[24px] pb-8 font-montserrat" >Industries We Serve & Beyond</h2>
           
            <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>

            </div>
              <p className="leading-relaxed ml-2 font-normal lg:text-[20px] md:text-[20px] text-[16px] font-montserrat">Banking & Financial Services</p>
            </div>

          <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>
            </div>
              <p className="leading-relaxed ml-2 font-normal  lg:text-[20px] md:text-[20px] text-[16px] font-montserrat" style={{fontFamily:"Montserrat"}}>Fintech & Digital Payments</p>
          </div>

          <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>
            </div>
              <p className="leading-relaxed ml-2 font-normal  lg:text-[20px] md:text-[20px] text-[16px] font-montserrat" style={{fontFamily:"Montserrat"}}>
              Payment Processors & Gateways</p>
          </div>

          <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>
            </div>
              <p className="leading-relaxed ml-2 font-normal  lg:text-[20px] md:text-[20px] text-[16px] font-montserrat" style={{fontFamily:"Montserrat"}}>
              Credit Card Processors</p>
          </div>

          <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>
            </div>
              <p className="leading-relaxed ml-2 font-normal  lg:text-[20px] md:text-[20px] text-[16px] font-montserrat" style={{fontFamily:"Montserrat"}}>
              Card Issuers & Acquirers</p>
          </div>

          <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>
            </div>
              <p className="leading-relaxed ml-2 font-normal  lg:text-[20px] md:text-[20px] text-[16px] font-montserrat" style={{fontFamily:"Montserrat"}}>
              Card Issuers & Acquirers</p>
          </div>

          <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>
            </div>
              <p className="leading-relaxed ml-2 font-normal  lg:text-[20px] md:text-[20px] text-[16px] font-montserrat" style={{fontFamily:"Montserrat"}}>
              Technology & Software Development</p>
          </div>

          <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>
            </div>
              <p className="leading-relaxed ml-2 font-normal  lg:text-[20px] md:text-[20px] text-[16px] font-montserrat" style={{fontFamily:"Montserrat"}}>
              Banking as a Service (BaaS)</p>
          </div>

          <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>
            </div>
              <p className="leading-relaxed ml-2 font-normal  lg:text-[20px] md:text-[20px] text-[16px] font-montserrat" style={{fontFamily:"Montserrat"}}>
              Software as a Service (SaaS)</p>
          </div>

          
          </div>


          
        </div>
  </div>
</section>






<section className="text-gray-200 body-font " style={{
    background: "linear-gradient(to bottom, #111827 10%, #6f551e 100%)",
    height: "auto",
    
  }}>
  <div className="container px-5 py-24 mx-auto flex flex-wrap"  data-aos="fade-up">
    <div className="flex flex-wrap w-full">
      <div className="lg:w-1/2 md:w-1/2 md:pr-10 md:py-6">
        <div className="flex relative pb-12">
          <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-0.5 bg-green-700 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6"></path> 
            <path d="M6 15l6 6 6-6"></path>
          </svg>
          </div>
          <div className="flex-grow pl-4">
          <h2 className="font-medium  text-gray-100 mb-1  lg:text-[32px] md:text-[32px] text-[24px] pb-8 font-montserrat" style={{fontFamily:"Roboto"}}>Designed for Every Role & Beyond</h2>
           
            <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>

            </div>
              <p className="leading-relaxed ml-2 font-normal lg:text-[20px] md:text-[20px] text-[16px] font-montserrat" style={{fontFamily:"Montserrat"}}>Developers & Engineers</p>
            </div>

          <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>
            </div>
              <p className="leading-relaxed ml-2 font-normal lg:text-[20px] md:text-[20px] text-[16px] font-montserrat" style={{fontFamily:"Montserrat"}}>QA & Testing Experts</p>
          </div>

          <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>
            </div>
              <p className="leading-relaxed ml-2 font-normal lg:text-[20px] md:text-[20px] text-[16px] font-montserrat" style={{fontFamily:"Montserrat"}}>Business Business Analysts & Product Managers</p>
          </div>

          <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>
            </div>
              <p className="leading-relaxed ml-2 font-normal lg:text-[20px] md:text-[20px] text-[16px] font-montserrat" style={{fontFamily:"Montserrat"}}>Business Operations & Support Teams</p>
          </div>

          <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>
            </div>
              <p className="leading-relaxed ml-2 font-normal lg:text-[20px] md:text-[20px] text-[16px] font-montserrat" style={{fontFamily:"Montserrat"}}>Business Risk, Compliance & Security Specialists</p>
          </div>

          <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>
            </div>
              <p className="leading-relaxed ml-2 font-normal lg:text-[20px] md:text-[20px] text-[16px] font-montserrat" style={{fontFamily:"Montserrat"}}>Business Payment Consultants & Industry Leaders</p>
          </div>

          <div className="flex flex-row mt-4">
              <div className="flex-shrink-0 md:w-6 md:h-6 h-5 w-5 rounded-full bg-green-700 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M5 12l4 4L19 7"></path>
              </svg>
            </div>
              <p className="leading-relaxed ml-2 font-normal lg:text-[20px] md:text-[20px] text-[16px] font-montserrat" style={{fontFamily:"Montserrat"}}>Business Solution Architects</p>
          </div>

          
          </div>


          
        </div>

        
      </div>
      {/* <img className="lg:w-1/2 md:w-1/2 object-cover object-center rounded-lg md:mt-0  " src="section6-img.png" alt="step"/> */}
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-full  md:mb-0 md:ml-24">
      <img className="object-cover object-center rounded-2xl" alt="hero" src="section6-img.png"/>
    </div>
    </div>
  </div>
</section>

</div>
<CookieConsent/>
    </>
  );
};

export default Home;
