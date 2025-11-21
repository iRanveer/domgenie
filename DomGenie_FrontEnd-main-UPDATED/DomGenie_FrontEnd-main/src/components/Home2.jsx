import { useEffect, useState } from "react";
const Home2 = () => {


    return (
      <>
    
  
    <section className={` bg-[#152462] text-gray-600 body-font h-screen "`}>
     
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center md:mt-16">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16  flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center ">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-200">The first AI chatbot designed to provide the most structured answers 
        <br className="hidden lg:inline-block"/>for the card payments domain!
      </h1>
      <p className="mb-8 leading-relaxed text-gray-400">Your AI-powered Domain Genie is here to answer all your card and payment queries instantly</p>
      <div className="flex justify-center">
        <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
        <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600"/>
    </div>
  </div>
</section>
  
  
      </>
    );
  };
  
  export default Home2;
  