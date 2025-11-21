import {React, useEffect, useState} from "react";
import {  useNavigate } from 'react-router-dom';
import axios from "axios"

const Price = () => {





    return (
      <>
    

<section className=" py-8 antialiased dark:bg-gray-900 md:py-16 "style={{
    background: "linear-gradient(to bottom, #111827 10%, #6f551e 100%, #111827 80%)",
    height: "auto",
    
  }}>
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 pt-16">
    <div className="mx-auto max-w-5xl">
      <h2 className="text-2xl font-semibold text-gray-300 sm:text-4xl mb-8">Topics Supported by DomGenie</h2>
     
      <div className="mx-auto  space-y-6">
      <p className="text-base font-normal text-gray-200 ">Last Updated: 1st July, 2025

        </p>
        

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        At DomGenie, we bring together over six decades of collective expertise in the card payment ecosystem, covering everything from how credit, debit, and prepaid cards work to the complexities of POS, e-commerce, and ATM acquiring.

        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        Built by industry experts who have spent their careers designing, implementing, and optimizing payment systems, DomGenie is just the beginning of a vision to create the world’s most advanced AI-powered payment domain assistant.


        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        Our knowledge base is comprehensive, structured, and continuously evolving, ensuring that DomGenie delivers precise, real-time insights across transaction processing, security, compliance, acquiring, clearing, and beyond. As we expand, we are committed to building a best-in-class AI Genie that transforms how professionals access and apply payment industry knowledge.


        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        This is just the start—and we are here to redefine the future of payments intelligence.


        </p>

        <p className="text-xl font-semibold text-gray-300 dark:text-white">Category 1 -  Card Payment Domain Fundamentals
        </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            Card Payment Domain – Overview of key players and surrounding systems


            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            System Architecture and various Surrounding system of card processing





            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Key players of the echo system




            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Regulators in Card Domain (PCI DSS, EMVCo, Card Network, Central banks)




            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Various Instruments and Channels




            </span>

          </li>


          <li>
            <span className="font-normal text-gray-300">
            Entry Modes


            </span>

          </li>

         
          
        </ul>



        <p className="text-xl font-semibold text-gray-300 dark:text-white">Category 2 : Card Management System (CMS) and Embossing
        </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">

      
              <li>
              <span className="font-normal text-gray-300">
              CMS, Core Banking, Accounting Concepts

</span>

            </li>


            <li>
            <span className="font-normal text-gray-300">
            Customer, Account and Card Concepts


</span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            BIN Concept



            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            6 and 8 Digit BINs




            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            EMV Profile (Various Issuer specific EMV tags) 



            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Luhn Algorithm




            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Embossing Process




            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Personalize , Non-personalized Cards



            </span>

          </li>
          

          <li>
            <span className="font-normal text-gray-300">
            Card Life Cycle


            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
            Renew, Reissue and Replacement



            </span>

          </li>


          <li>
            <span className="font-normal text-gray-300">
            Use of Card Sequence Number



            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
            Card Encryption and Storage as per PCI DSS



            </span>
          </li>

          <li>
            <span className="font-normal text-gray-300">
            API Samples for Card Creation and Card Product Creation



            </span>
          </li>

          

          

         
        </ul>




        <p className="text-xl font-semibold text-gray-300 dark:text-white">Category 3 : HSM and Key Management
        </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            HSM & Key Management

            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Hardware Vs Cloud HSM


            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Symmetric  and Asymmetric Encryption


            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            KEK and DEKs


            </span>

          </li>


          <li>
            <span className="font-normal text-gray-300">
            Key Custodian and Keys Exchange


            </span>

          </li>


          <li>
            <span className="font-normal text-gray-300">
            Various Thales Commands (such as ZMK Generation, CVV, PVV, IBM Offset, PIN Translation, ARQC etc)


            </span>

          </li>


          <li>
            <span className="font-normal text-gray-300">
            Static and Dynamic CVVs


            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            PIN Translation & Incorrect PIN Functionality



            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Key Index Concept


            </span>

          </li>


        </ul>

          <p className="text-xl font-semibold text-gray-300 dark:text-white">Category 4 : Transaction Switch 


          </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            Various Modules of transaction switch


            </span>

          </li>


          <li>
            <span className="font-normal text-gray-300">
            SMS & DMS (Single and Dual Message Systems)




            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            ON-US, OFF-US 



            </span>

          </li>


          <li>
            <span className="font-normal text-gray-300">
            Transaction flow from Terminal to issuer

            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Overview of Dispute Cycle


            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Application Transaction Counter (ATC)


            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Various Types of Issuer Fees


            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            All different types of validations and authentications at issuer end


            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Credit Limits, Open-to-Buy, Available Balance, Holds & Outstanding Amount Calculations



            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Best Recommendations and Parameterization for issuers 



            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            API Samples for Fund Transfer



            </span>

          </li>


          
          
        </ul>



        <p className="text-xl font-semibold text-gray-300 dark:text-white">Category 5 - Clearing and Settlement



          </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            Clearing Process Fundamentals  



            </span>

          </li>


          <li>
            <span className="font-normal text-gray-300">
            Authorization-Clearing Matching Logics


            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Clearing File Structure and Parsing


            </span>

          </li>


          <li>
            <span className="font-normal text-gray-300">
            VISA Clearing


            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            MasterCard Clearing



            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            RuPay Clearing


            </span>

          </li>

         
          
          
        </ul>


        <p className="text-xl font-semibold text-gray-300 dark:text-white">Category 6 - VISA Transaction Types and ISO8583



      </p>
      <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
      <li>
        <span className="font-normal text-gray-300">
        VISA ISO 8583 – Message structure, Bitmap, Data Elements, ON-US & OFF-US Transactions 



        </span>

      </li>


      <li>
        <span className="font-normal text-gray-300">
        Various types of Card Present and Card Not Present Transactions 



        </span>

      </li>

      <li>
        <span className="font-normal text-gray-300">
        VISA 3DS E-Commerce – Challenge & Frictionless Flows



        </span>

      </li>


      <li>
        <span className="font-normal text-gray-300">
        Sample ISO Messages & Key ISO 8583 Data Elements



        </span>

      </li>

      <li>
        <span className="font-normal text-gray-300">
        VISA OCT Transactions (Original Credit Transactions)



        </span>

      </li>

      <li>
        <span className="font-normal text-gray-300">
        AFD (Automated Fuel Dispenser Transactions)



        </span>

      </li>


      <li>
        <span className="font-normal text-gray-300">
        TVR & CVR (Terminal and Card Verification Results)




        </span>

      </li>


      <li>
        <span className="font-normal text-gray-300">
        VISA Pre-Authorization and Completion Processing in Issuing System



        </span>

      </li>


      <li>
        <span className="font-normal text-gray-300">
        VISA STIP Functionality




        </span>

      </li>


      <li>
        <span className="font-normal text-gray-300">
        VISA Account Updater


        </span>

      </li>


      <li>
        <span className="font-normal text-gray-300">
        VISA Exception Handling & Updates – MTI 0302


        </span>

      </li>


      <li>
        <span className="font-normal text-gray-300">
        Tokenization (Tap and Pay)

        </span>

      </li>


      <li>
        <span className="font-normal text-gray-300">
        QR Code Payments

        </span>

      </li>

      <li>
        <span className="font-normal text-gray-300">
        VISA Quasi Cash Transaction

        </span>

      </li>

      <li>
        <span className="font-normal text-gray-300">
        Domestic, International, and Dynamic Currency Conversion (DCC) Transactions





        </span>

      </li>

      <li>
        <span className="font-normal text-gray-300">
        Recurring Transactions & Subscription Billing




        </span>

      </li>

      <li>
        <span className="font-normal text-gray-300">
        Refund and Reversal Processing Rules


        </span>

      </li>

      <li>
        <span className="font-normal text-gray-300">
        Account Funding Transaction (AFT) Processing

        </span>

      </li>

      <li>
        <span className="font-normal text-gray-300">
        VISA Card on File Transaction (COFT) Processing


        </span>

      </li>

      <li>
        <span className="font-normal text-gray-300">
        Issuer Response Codes & Error Mapping


        </span>

      </li>

      <li>
        <span className="font-normal text-gray-300">
        Partial Reversal Processing



        </span>

      </li>

      <li>
        <span className="font-normal text-gray-300">
        Partial Approval Processing



        </span>

      </li>




      </ul>



      <p className="text-xl font-semibold text-gray-300 dark:text-white">Category 7 - MasterCard Transaction Types and ISO8583




        </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
        <li>
          <span className="font-normal text-gray-300">
          MasterCard ISO 8583 – Message structure, Bitmap, Data Elements, ON-US & OFF-US Transactions
          </span>

        </li>


        <li>
          <span className="font-normal text-gray-300">
          Various types of Card Present and Card Not Present Transactions


          </span>

        </li>

        <li>
          <span className="font-normal text-gray-300">
          MasterCard MoneySend (Payment and Funding Transactions)




          </span>

        </li>


        <li>
          <span className="font-normal text-gray-300">
          TVR & CVR (Terminal and Card Verification Results)




          </span>

        </li>

        <li>
          <span className="font-normal text-gray-300">
          Sample ISO Messages & Key ISO 8583 Data Elements




          </span>

        </li>

        <li>
          <span className="font-normal text-gray-300">
          AFD (Automated Fuel Dispenser Transactions)



          </span>

        </li>


        <li>
          <span className="font-normal text-gray-300">
          Partial Reversal Processing


          </span>

        </li>


        <li>
          <span className="font-normal text-gray-300">
          Partial Approval Processing


          </span>

        </li>


        <li>
          <span className="font-normal text-gray-300">
          Issuer Response Codes & Error Mapping


          </span>

        </li>


        <li>
          <span className="font-normal text-gray-300">
          MasterCard ABU (Automatic Billing Updater)



          </span>

        </li>


        <li>
          <span className="font-normal text-gray-300">
          MasterCard 3DS transaction processing (UCAF/AAV generation method)



          </span>

        </li>


        <li>
          <span className="font-normal text-gray-300">
          MasterCard Recurring Transaction Processing.

          </span>

        </li>





        </ul>



        <p className="text-xl font-semibold text-gray-300 dark:text-white">Category 8 : Acquiring & Merchant Processing




        </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
        <li>
          <span className="font-normal text-gray-300">
          Acquiring Concepts 

          </span>

        </li>


        <li>
          <span className="font-normal text-gray-300">
          Various Acquiring Models (TMS & MMS)



          </span>

        </li>

        <li>
          <span className="font-normal text-gray-300">
          Acquiring Routing Concepts


          </span>

        </li>


        <li>
          <span className="font-normal text-gray-300">
          Dynamic Currency Conversion


          </span>

        </li>

        <li>
          <span className="font-normal text-gray-300">
          Batch and Reconciliation Between POS, Payment Gateway & Acquiring Switch


          </span>

        </li>

        <li>
          <span className="font-normal text-gray-300">
          Settlement Cycles (Host and POS Terminal Cut-off)




          </span>

        </li>


        <li>
          <span className="font-normal text-gray-300">
          Multi-Leg Pre-Authorization



          </span>

        </li>


        <li>
          <span className="font-normal text-gray-300">
          Card Network Routing Tables



          </span>

        </li>


        <li>
          <span className="font-normal text-gray-300">
          Physical and Virtual terminal Concepts



          </span>

        </li>



        </ul>




        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        This extensive and structured knowledge base ensures that DomGenie provides the most accurate and industry-relevant insights. Our topics will be continuously updated to keep up with evolving industry standards and innovations.

        </p>


        <p className="text-base font-normal text-gray-300 dark:text-gray-400 underline">
          <a href="guidelines">Guidelines for Asking Questions Effectively</a>
        </p>

      </div>
     
      
    </div>
  </div>
</section>



      </>
    );
  };
  
  export default Price;
  