import { useRef } from "react";
import { createRoot } from 'react-dom/client'



const Sidebar = ({todayChat,yesterdayChat,weekChat,monthChat,onClickNewChat, onClickChat, currentChatId,handleSidebarToggle}) => {

//console.log('current chat id: ',currentChatId);
//console.log('sidebar toggle ',handleSidebarToggle);



  return(
      <>
    <aside
        className={`fixed md:top-0 md:left-0 top-0 ${handleSidebarToggle?'translate-x-0':'left-0 ' }  w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700 z-99 md:z-0`}
        aria-label="Sidenav"
        id="drawer-navigation"
      
      >



        <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800 z-999999">
        
          <ul className="space-y-2">
            <li>
              <a
               onClick={()=>onClickNewChat()}
               
                className={`flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer ${currentChatId==''?'bg-gray-100':''}`}
               
              >
                <svg
    aria-hidden="true"
    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.477 2 2 5.978 2 10.5c0 2.518 1.242 4.768 3.25 6.312L5 21l4.062-1.917C10.034 19.696 11.007 20 12 20c5.523 0 10-3.978 10-8.5S17.523 2 12 2zm0 15c-.869 0-1.742-.164-2.572-.487L7 17l.572-2.35C5.543 13.746 4 12.222 4 10.5 4 7.462 7.134 5 12 5s8 2.462 8 5.5S16.866 17 12 17z"/>
  </svg>
  
                <span className="ml-3">New Chat</span>
              </a>
            </li>


            <li>
              <a
              href="https://domgenie.ai/topicsupport"
               target="_blank"
                className={`flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer `}
               
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.477 2 2 5.978 2 10.5c0 2.518 1.242 4.768 3.25 6.312L5 21l4.062-1.917C10.034 19.696 11.007 20 12 20c5.523 0 10-3.978 10-8.5S17.523 2 12 2zm0 15c-.869 0-1.742-.164-2.572-.487L7 17l.572-2.35C5.543 13.746 4 12.222 4 10.5 4 7.462 7.134 5 12 5s8 2.462 8 5.5S16.866 17 12 17z"/>
                </svg>
  
                <span className=" ml-3 text-left text-sm">Topics Supported by DomGenie </span>
              </a>
            </li>


            <li>
              <a
              href="https://domgenie.ai/guidelines"
              target="_blank"
               
                className={`flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer `}
               
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.477 2 2 5.978 2 10.5c0 2.518 1.242 4.768 3.25 6.312L5 21l4.062-1.917C10.034 19.696 11.007 20 12 20c5.523 0 10-3.978 10-8.5S17.523 2 12 2zm0 15c-.869 0-1.742-.164-2.572-.487L7 17l.572-2.35C5.543 13.746 4 12.222 4 10.5 4 7.462 7.134 5 12 5s8 2.462 8 5.5S16.866 17 12 17z"/>
                </svg>
  
                <span className=" ml-3 text-left text-sm">Guidelines for Asking Questions Effectively</span>
              </a>
            </li>


            
  
            {todayChat.length>0?
            <li>
              <button
                type="button"
                className={`flex items-center p-2 pl-0 w-full text-base font-semibold text-gray-900 rounded-lg transition duration-75 group  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                aria-controls="dropdown-pages"
                data-collapse-toggle="dropdown-pages"
              >
                
                <span className="flex-1 ml-3 text-left whitespace-nowrap"
                  >Today</span>
               
              </button>
              
            </li>
            :''}

          

  
            {todayChat != "" &&
                todayChat.map((today, index) => (
            <li key={index}>
              <button
                type="button"
                className={`flex items-center p-2 w-full text-sm font-medium text-gray-900 rounded-lg transition duration-75 group ${currentChatId==today.chat_id?'bg-gray-100':''} hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                aria-controls="dropdown-sales"
                data-collapse-toggle="dropdown-sales"
                onClick={()=>onClickChat(today.chat_id)} 
              >
               
                <span className="flex-1 ml-3 text-left whitespace-nowrap"
                  >{today.user_query.substring(0,25)} {today.user_query.length > 25?"..." : ""} </span >
                 
  
              
              </button>
              
            </li>
                ))}
  
          </ul>
  
          {  yesterdayChat.length>0?
          <ul
            className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700"
          >
            
            <li>
              <button
                type="button"
                className={`flex items-center p-2 pl-0 w-full text-base font-semibold text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                aria-controls="dropdown-pages"
                data-collapse-toggle="dropdown-pages"
              >
                
                <span className="flex-1 ml-3 text-left whitespace-nowrap"
                  >Yesterday</span>
               
              </button>
              
            </li>
            
  
            {yesterdayChat != "" &&
                yesterdayChat.map((yesterday, index) => (
            <li key={index}>
           
              <button
                type="button"
                className={`flex items-center p-2 w-full text-sm font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700  ${currentChatId==yesterday.chat_id?'bg-gray-100':''}`}
                aria-controls="dropdown-sales"
                data-collapse-toggle="dropdown-sales"
                onClick={()=>onClickChat(yesterday.chat_id)} 
              >
               
                <span className="flex-1 ml-3 text-left whitespace-nowrap"
                  >{yesterday.user_query.substring(0,25)} {yesterday.user_query.length > 25?"..." : ""}</span >
                
              </button>
              
            </li>
            ))}
            
            
          </ul>
          :''}
  
  
      {  weekChat.length>0?
          <ul
            className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700"
          >
            
            <li>
              <button
                type="button"
                className="flex items-center p-2 pl-0 w-full text-base font-semibold text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-pages"
                data-collapse-toggle="dropdown-pages"
              >
                
                <span className="flex-1 ml-3 text-left whitespace-nowrap"
                  >Week</span>
               
              </button>
              
            </li>
            
  
            {weekChat != "" &&
                weekChat.map((week, index) => (
            <li key={index}>
           
              <button
                type="button"
                className={`flex items-center p-2 w-full text-sm font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${currentChatId==week.chat_id?'bg-gray-100':''}`}
                aria-controls="dropdown-sales"
                data-collapse-toggle="dropdown-sales"
                onClick={()=>onClickChat(week.chat_id)}
              >
               
                <span className="flex-1 ml-3 text-left whitespace-nowrap"
                  >{week.user_query.substring(0,25)} {week.user_query.length > 25?"..." : ""}</span >
                
              </button>
              
            </li>
            ))}
            
            
          </ul>
          :''}
  
  
  
  {  monthChat.length>0?
          <ul
            className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700"
          >
            
            <li>
              <button
                type="button"
                className={`flex items-center p-2 pl-0 w-full text-base font-semibold text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                aria-controls="dropdown-pages"
                data-collapse-toggle="dropdown-pages"
              >
                
                <span className="flex-1 ml-3 text-left whitespace-nowrap"
                  >Month</span>
               
              </button>
              
            </li>
            
  
            {monthChat != "" &&
                monthChat.map((month, index) => (
            <li key={index}>
           
              <button
                type="button"
                className={`flex items-center p-2 w-full text-sm font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${currentChatId==month.chat_id?'bg-gray-100':''} `}
                aria-controls="dropdown-sales"
                data-collapse-toggle="dropdown-sales"
                onClick={()=>onClickChat(month.chat_id)} 
              >
               
                <span className="flex-1 ml-3 text-left whitespace-nowrap"
                  >{month.user_query.substring(0,25)} {month.user_query.length > 25?"..." : ""}</span >
                
              </button>
              
            </li>
            ))}
            
            
          </ul>
          :''}
  
  
          
  
  
  
        </div>
       

         <div
        className="hidden absolute bottom-0 left-0 justify-center p-2 space-x-4 w-full lg:flex  z-20 bg-gray-100"
      >
        <a
          href="#"
          className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
        >
       Issues or feedback? <br></br>Email support@domgenie.ai

        </a>
      
       
      </div> 


      </aside>
      </>
  )
  }

  
  export default Sidebar;