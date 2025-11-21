import { useEffect, useState } from "react";

const Navbar = () => {

  const [bgColor, setBgColor] = useState("bg-[#152462]"); 
  const [textColor, setTextColor] = useState("text-white"); 

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBgColor("bg-white shadow-lg"); // Change color when scrolling
        setTextColor("text-[#152462]"); // Change color when scrolling
      } else {
        setBgColor("bg-[#152462]"); // Reset color when at the top
        setTextColor("text-white");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

    return (
      <>
     
  
     <nav className={`${bgColor} border-gray-200 fixed w-full top-0 left-0 z-50`}>
    <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4 ">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/*   <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
            <span className={`self-center text-4xl font-semibold whitespace-nowrap ${textColor}`}>DomGenie</span>
          {/*   <span>The imposible is just another cha</span> */}
        </a>
        <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
           
            <a href="login" className={`${textColor} hover:text-gray-700 border-2  hover:bg-[#ffe32c]  font-medium rounded text-sm px-4 py-2 md:px-5 md:py-2.5  focus:outline-none `}>Login</a>

            <button data-collapse-toggle="mega-menu-icons" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu-icons" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
        </div>
        <div id="mega-menu-icons" className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
              {/*    <li>
                    <a href="/" className="block text-white hover:text-yellow-500 font-thin" aria-current="page">Dashboard</a>
                </li>  */}

 <li className="relative group">
            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className={`flex items-center justify-between font-normal ${textColor} text-sm    md:p-0 md:w-auto hover:text-[#ffe32c]`}>Home <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
  </svg></button>
          
            <div id="dropdownNavbar" className="z-10 fixed font-normal bg-gray-800 divide-y divide-gray-100 rounded-lg shadow w-44 absolute opacity-0 invisible transition-opacity duration-300 group-hover:opacity-100 group-hover:visible">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                  <li>
                    <a href="/" className="block px-4 py-2 hover:bg-gray-900 text-gray-200">Home</a>
                  </li>
                  <li>
                    <a href="/home2" className="block px-4 py-2 hover:bg-gray-900 text-gray-200">Home 2</a>
                  </li>
                  <li>
                    <a href="/home3" className="block px-4 py-2 hover:bg-gray-900 text-gray-200">Home 3</a>
                  </li>
                </ul>
                
            </div>
        </li>
                

               {/*  <li>
                    <a href="/" className="block text-white hover:text-yellow-500 font-thin" aria-current="page">Home</a>

                    
                </li> */}
                <li>
                    <a href="price" className={`block ${textColor} hover:text-[#ffe32c] font-normal text-sm`} aria-current="page">Pricing</a>
                </li>
                <li>
                    <a href="about" className={`block ${textColor} hover:text-[#ffe32c] font-normal text-sm`}  aria-current="page">About Us</a>
                </li>
                <li>
                    <a href="contact" className={`block ${textColor} hover:text-[#ffe32c] font-normal text-sm`}  aria-current="page">Contact Us</a>
                </li>
 
               

            </ul>
        </div>
    </div>
</nav>
      </>
    );
  };
  
  export default Navbar;
  