import { useState,useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const accessToken = localStorage.getItem('access_token')

const navigate = useNavigate()

  const handleLoginButton = ()=>{

    if(accessToken==''){
      navigate('/login')
    }else{
      navigate('/chat')
    }
    
  }

  const handlePricing = ()=>{
    navigate('/price')
  }


  const handleRegister = ()=>{
    navigate('/register')
  }
    return (
      <>
     
  
     <nav
      className="fixed w-full top-0 left-0 z-50"
      style={{
        background: "linear-gradient(to bottom, #111827 10%, #6f551e 100%, #111827 80%)",
        height: "88px",
      }}
    >
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4">
        
        {/* Logo */}
        <img src="/domgenieLogo.png" style={{height:"50px",width:"70px"}}></img>
        <a
          href="/"
          className="flex flex-col font-mandali w-[196px] h-[58px] text-[40px] text-white"
        >
          DomGenie
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 ml-auto h-[18px] w-[197px] gap-[50px] " style={{paddingLeft:"200px"}}>
          <li>
            <a href="/" className="text-white hover:text-yellow-500 font-normal text-sm leading-1 font-montserrat">
              Home
            </a>
          </li>
          <li>
            <a  onClick={handlePricing} className="cursor-pointer text-white hover:text-yellow-500 font-normal text-sm leading-1 font-montserrat">
              Pricing
            </a>
          </li>
        </ul>

        {/* Desktop Buttons (Right Aligned) */}
        <div className="hidden md:flex space-x-8 ml-auto -mr-36">
  <a
   onClick={handleLoginButton}
    className="text-white font-inter rounded-lg text-sm px-4 py-2 text-center cursor-pointer"
    style={{
      width: "87px",
      height: "40px",
      borderRadius: "10px",
      backgroundColor: "#101827",
      boxShadow: "1px 1px 2px gray inset",
    }}
  >
    Login
  </a>
  <a
    onClick={handleRegister}
    className="text-white font-inter rounded-lg text-sm px-4 py-2 text-center cursor-pointer"
    style={{
      width: "100px",
      height: "40px",
      borderRadius: "10px",
      backgroundColor: "#101827",
      boxShadow: "1px 1px 2px gray inset",
    }}
  >
    Sign Up
  </a>
</div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute top-20 right-5 bg-gray-900 text-white shadow-lg rounded-lg w-40 p-3 md:hidden">
            <ul className="flex flex-col space-y-2">
              <li>
                <a href="login" className="block px-4 py-2 hover:bg-gray-700 rounded">
                  Login
                </a>
              </li>
              <li>
                <a href="register" className="block px-4 py-2 hover:bg-gray-700 rounded">
                  Sign Up
                </a>
              </li>
              <li>
                <a href="price" className="block px-4 py-2 hover:bg-gray-700 rounded">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>


      </>
    );
  };
  
  export default Navbar;
  