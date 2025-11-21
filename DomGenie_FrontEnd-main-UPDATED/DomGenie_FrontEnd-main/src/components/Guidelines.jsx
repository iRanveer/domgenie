import {React, useEffect, useState} from "react";
import {  useNavigate } from 'react-router-dom';
import axios from "axios"

const Price = () => {





    return (
      <>
    

<section className=" py-8 antialiased dark:bg-gray-900 md:py-16 " style={{
    background: "linear-gradient(to bottom, #111827 10%, #6f551e 100%, #111827 80%)",
    height: "auto",
    
  }}>
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 pt-16">
    <div className="mx-auto max-w-5xl">
      <h2 className="text-2xl font-semibold text-gray-300 sm:text-4xl mb-8">Guidelines for Asking Questions Effectively</h2>
     
      <div className="mx-auto  space-y-6">
       

        <p className="text-xl font-semibold text-gray-300 dark:text-white">DomGenie is designed to provide precise and expert-level answers related to the card payment domain. To get the best results, follow these guidelines when asking questions:
        </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            Be Specific: Instead of "Explain ISO 8583," ask "What are the key data elements in a VISA ISO 8583 authorization message?"
            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Use Industry Terms: If you are looking for details on PIN translation, clearing, or tokenization, include these terms in your query.

            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Clarify the Context: If your question is about a specific payment network (VISA, MasterCard, RuPay), mention it for a more accurate response.


            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Ask About Flows & Processes: If you need help understanding a transaction flow, you can ask "How does a pre-authorization and completion process work in an issuing system?"

            </span>

          </li>
          
        </ul>



        <p className="text-xl font-semibold text-gray-300 dark:text-white">Below is a list of sample questions to help you frame your queries effectively. You can use them as a reference while interacting with DomGenie.
        </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            1. How to Identify OCT Transactions ?</span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
           2. What's the role of DE 63.2 in case of VISA pre-authorization ?

</span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
           3. How can a fallback transaction be identified?

            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
           4. How can User reset the PIN counter?
            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
               5. How to identify token based transaction
            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
               6. What does the service code refer to?
            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
               7. Can you explain Track 1 and Track2 ?
            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
               8. What is the Visa Settlement Summary Report and provide the reports name?
            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
               9. How can Visa clearing transactions be matched with their corresponding authorizations?
            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
               10. How can a duplicate clearing file be identified?
            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
              11. What does TCQ refer to in the Visa Clearing file?
            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
               12. How can the header validation be performed for the Visa clearing file and share header format?
            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
               13. What is the name and format of the Visa clearing file?
            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
               14. What is an Advice Recovery message?
            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
               15. How can STIP Advice be identified?
            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
               16. How can an exceptional file be updated in Visa for STIP?
            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
               17. What is the File Update Code (DE91)?
            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
               18. Can you provide the schema for MTI 0302 related to Account Screen Authorization File Update in table format?
            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
               19. Can you provide a step-by-step execution of the 3DS 2.x challenge flow?
            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
               20. How can an issuer system identify a DCC transaction?
            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
               21. What HSM command is used to validate ARQC?
            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
               22.What are the possible Service Code values for CVV1, CVV2, and iCVV?
            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
               23. What is the purpose of MTI 0320 from an acquiring perspective during batch reconciliation between the POS and acquirer?
            </span>
          </li>          
        </ul>




        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        This guide will be updated regularly to improve the user experience and ensure you get the most accurate and insightful responses from DomGenie.
        </p>


        <p className="text-base font-normal text-gray-300 dark:text-gray-400 underline">
          <a href="topicsupport">Topics Supported by DomGenie</a>
        </p>
        

      </div>
     
      
    </div>
  </div>
</section>



      </>
    );
  };
  
  export default Price;
  