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
      <h2 className="text-2xl font-semibold text-gray-300 sm:text-4xl mb-8">About Us</h2>
     
      <div className="mx-auto  space-y-6">
        <p className="text-base font-normal text-gray-200 ">AI That Knows Payments, So You Don’t Have To
        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        At DomGenie, we leverage an advanced Retrieval-Augmented Generation (RAG) model to transform how individuals and organizations access structured insights in the card payments industry. Our AI-driven platform simplifies complex topics, enhances decision-making, and helps businesses solve operational, testing, and regulatory challenges efficiently.

        </p>

        <p className="text-xl font-semibold text-gray-300 dark:text-white">Who We Are</p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            We are a team of card payment domain experts, passionate AI developers, and fintech innovators with decades of experience in card issuing, acquiring, transaction processing, security, and compliance. Our deep industry knowledge, combined with cutting-edge AI technology, allows us to deliver a platform that simplifies complex financial concepts and empowers businesses and professionals with instant, structured insights.</span>

          </li>
          
        </ul>



        <p className="text-xl font-semibold text-gray-300 dark:text-white">What We Offer        </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            AI-Powered Payment Knowledge – Get structured insights into card payment solutions, transaction processing, and financial systems.</span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Operational & Testing Support – Design and optimize payment solutions, transaction engines, and compliance workflows with AI-assisted guidance.
</span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Enterprise-Ready AI for Internal Processes – Businesses can integrate DomGenie’s RAG-based AI model to create a centralized knowledge hub that enhances both internal operations and customer interactions. Internally, it streamlines product documentation, API references, compliance guidelines, training, and troubleshooting, reducing dependency on manual processes and expert intervention. For external users, DomGenie powers self-service portals, customer support, and merchant enablement, providing instant, AI-driven responses. Whether assisting developers with API integration, supporting compliance teams with regulatory insights, or helping support agents resolve queries faster, DomGenie enhances efficiency, decision-making, and user experience across the organization.
            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Skill Development for Professionals – Individuals can enhance their domain knowledge, prepare for interviews, and upskill in payments, fintech, and regulatory compliance.
            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Scalability Beyond Payments – While our focus today is on card payments, our AI framework is adaptable for regulatory compliance, enterprise knowledge management, and IT operations.
</span>

          </li>
          
        </ul>




        <p className="text-xl font-semibold text-gray-300 dark:text-white">Our Vision      </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            We aim to bridge knowledge gaps in the payments industry while exploring new domains where AI can streamline operations, enhance efficiency, and drive innovation.
            </span>

          </li>
        </ul>

          <p className="text-xl font-semibold text-gray-300 dark:text-white">Company Registration
          </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            DomGenie is registered under Ras Al Khaimah Free Zone, UAE.

            </span>

          </li>


          <li>
            <span className="font-normal text-gray-300">
            Committed to delivering cutting-edge solutions, DomGenie leverages AI-powered technology to help professionals and businesses navigate the evolving financial landscape with precision and efficiency.

            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            To learn more or explore collaboration opportunities, Visit Us at www.domgenie.ai.

            </span>

          </li>


          
          
        </ul>

      </div>
     
      
    </div>
  </div>
</section>



      </>
    );
  };
  
  export default Price;
  