import { useLocation, useNavigate } from "react-router-dom";


const Footer = () => {

    const location = useLocation();
    const navigate = useNavigate()

    const handleJoinNow = () => {
        navigate('/register')
    }

    const handleTerms = () => {

        navigate('/terms')
    }
  

    const handlePolicy = () => {
        navigate('/policy')
    }

    const handleGuideline = () => {
        navigate('/guidelines')
    }

    const handleContact = () => {
        navigate('/contact')
    }

    const handleAbout = () => {
    
        navigate('/about')
    }

    const handleTopicsupport = () => {
        navigate('/topicsupport')
    }

    return (
      <>


     {/* <footer className="bg-gray-900 py-20 "> */}
     <footer className=" py-[20px] " style={{
    background: `linear-gradient(to ${location.pathname=='/' || location.pathname=='/price' || location.pathname=='/policy'  || location.pathname=='/terms' || location.pathname=='/guidelines' || location.pathname=='/topicsupport' || location.pathname=='/contact' || location.pathname=='/about' || location.pathname=='/paymentredirect' ?'bottom':'top'}, #111827 30%, #6f551e 100%, #111827 80%)`,
    height: "auto",
    
  }} >


    <div className="mx-auto w-full max-w-screen-xl p-4 py-2 lg:py-2">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
              <a href="#" className="flex items-center">
                 {/*  <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" /> */}
                  <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">DomGenie </span>
                 
              </a>
              <p className="text-gray-400 mt-4"> Whether you're in card payments, fintech, or digital banking</p>
              <p className="text-gray-400">DomGenie is built for you. </p>
              <p className="text-gray-400"><a className="underline cursor-pointer"/*  onClick={handleJoinNow} */ href="register">Join Now & Explore!</a></p>
             
            
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 md:gap-24 sm:grid-cols-4">

             <div>
                  <h2 className="mb-6 text-sm font-normal text-gray-900 uppercase text-white">Legal</h2>
                  <ul className="text-gray-300 dark:text-gray-400 font-normal">
                     
                      <li className="mb-2 text-gray-400">
                          <a /* onClick={handleTerms} */ href="terms" className="hover:underline cursor-pointer">Terms &amp; Conditions</a>
                      </li>
                      <li className="mb-2 text-gray-400">
                          <a /* onClick={handlePolicy} */ href="policy" className="hover:underline cursor-pointer"> Policies</a>
                      </li>

                    {/*   <li className="mb-2 text-gray-400">
                          <a onClick={handleGuideline} className="hover:underline cursor-pointer">Question Guidelines</a>
                      </li> */}
                  </ul>
              </div>

              <div>
                  <h2 className="mb-6 text-sm font-normal text-gray-900 uppercase text-white">Follow us</h2>
                  <ul className="text-gray-300 font-normal">
                      {/* <li className="mb-2 text-gray-400">
                          <a href="#" className="hover:underline ">Facebook</a>
                      </li>
                      <li className="mb-2 text-gray-400">
                          <a href="#" className="hover:underline">Instagram</a>
                      </li> */}
                      <li className="mb-2 text-gray-400">
                          <a href="https://www.linkedin.com/company/domgenie-global-fz-llc/?viewAsMember=true " target="_blank" className="hover:underline">LinkedIn</a>
                      </li>

                      <li className="mb-2 text-gray-400">
                          <a href="https://www.youtube.com/@TheDomainPodium/videos" target="_blank" className="hover:underline">Youtube</a>
                      </li>
                  </ul>
              </div>


              <div>
                  <h2 className="mb-6 text-sm font-normal text-gray-900 uppercase text-white">Company</h2>
                  <ul className="text-gray-300 font-normal">
                       <li className="mb-2 text-gray-400">
                          <a /* onClick={handleAbout} */ href="about" className="hover:underline cursor-pointer ">About Us</a>
                      </li>
                      <li className="mb-2 text-gray-400">
                          <a /* onClick={handleContact} */ href="contact"  className="hover:underline cursor-pointer">Contact Us</a>
                      </li> 
                     
                  </ul>
              </div>
              
              <div>
                  <h2 className="mb-6 text-sm font-normal text-gray-900 uppercase text-white">Resources</h2>
                  <ul className="text-gray-300 font-normal">
                      

                      <li className="mb-2 text-gray-400">
                          <a onClick={handleTopicsupport} className="hover:underline cursor-pointer">Supported Topics</a>
                      </li>

                      <li className="mb-2 text-gray-400">
                          <a onClick={handleGuideline} className="hover:underline cursor-pointer">Prompts</a>
                      </li>

                      

                     
                      
                  </ul>
              </div>
              
              
          </div>
      </div>
       <hr className="my-6 border-gray-400 sm:mx-auto  lg:my-8" />
       <div className="sm:flex sm:items-center sm:justify-center text-center">
  <span className="text-sm text-gray-400">
    © 2025 Copyright – DomGenie Global FZ-LLC 2025. All rights reserved.
  </span>
</div>

    </div>

    
</footer>

      </>
    );
  };
  
  export default Footer;
  