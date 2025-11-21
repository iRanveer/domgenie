import { useState, useRef, useEffect } from "react";
import { parseContent } from "./Functions";


const AppendComponent = ({query,answer,subscriptionStatus,documents,execution_time,source}) => {



  const [showThreeDot,setShowThreeDot] = useState(false)
  const restrictedCopyRef = useRef(null); 
  const [isVisible, setIsVisible] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
  
   
  
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


  const scrollToBottom = () => {
 
    handleScroll();
 

}


const handleScroll = () => {

  if (bottomRef.current) {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }
  
};

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

  
    return (
    
                  <>
                  {
                  subscriptionStatus!=0 &&
                  query!=''?
                  <div className="mb-8 mt-16">
                    <footer className="flex justify-end items-center mt-8  relative md:mr-[22%] ">
                      <div className="flex items-center text-left p-4 rounded-2xl bg-gray-100 md:w-[600px]"> {/* Keeps image and text in one line */}
                        <img
                          className="w-6 h-6 rounded-full mr-2"
                          src="user.png"
                          alt=""
                        />
                        <p className="font-normal text-normal text-gray-900 dark:text-white">
                          {query}
                        </p>
                      </div>
                    </footer>

                      <div className="flex items-center mt-4 space-x-4">
                      
                      <div 
                          className="flex items-center font-medium text-sm text-gray-500 ">
                            <svg className="mr-1.5 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z"/>
                            </svg>
                          Answer
                        </div>
                      </div>
                  <p ref={restrictedCopyRef} >{parseContent(answer)}</p>

                    {/* <div className="flex items-center mt-4 space-x-4 " >
                      <button type="button"
                          className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                           


                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M12 4.248C8.852-1.264 0 .325 0 6.477 0 9.44 2.233 12.046 5.493 15.28l6.363 5.812c.395.361.9.361 1.294 0l6.363-5.812C21.768 12.046 24 9.44 24 6.477c0-6.152-8.852-7.741-12-2.229Z"/>
                            </svg> Like

                      </button>
                  </div> */}


            {/*   <div className=" items-center mt-4  mt-8">
                    


                        <p 
                          className="flex items-center font-medium text-sm text-gray-500  py-2">
                            <b>Source:</b> &emsp;{source ? source : 'N/A'}

                        </p>

                        <p 
                          className="flex items-center font-medium text-sm text-gray-500 py-2">
                            <b>Documents:</b> &emsp;{documents ? documents : 'N/A'}

                        </p>

                        <p 
                          className="flex items-center font-medium text-sm text-gray-500 py-2">
                            <b>Execution Time:</b> &emsp;{execution_time ? execution_time : 'N/A'}

                        </p>


                  </div> 
 */}

                    

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

<div ref={bottomRef}></div>  

                  </div>

                  
                  :<div className="fixed z-100 bg-yellow-800 text-white   border p-2 rounded-full overflow-hidden left-1/3 bottom-28 ">
                  Your subscription has been expired. Please upgrade your plan.
               </div>}
                   
                  </>    
    );
  };

  export default AppendComponent


  