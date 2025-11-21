import {React, useEffect, useState} from "react";
import {  useNavigate } from 'react-router-dom';
import axios from "axios"

const Terms = () => {


    return (
      <>
    

<section className=" py-8 antialiased dark:bg-gray-900 md:py-16 " style={{
     background: "linear-gradient(to bottom, #111827 10%, #6f551e 100%, #111827 80%)", 
    height: "auto",
    
  }}>
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 pt-16">
    <div className="mx-auto max-w-5xl">
      <h2 className="text-2xl font-semibold text-gray-300 sm:text-4xl mb-8">Terms & Conditions</h2>
     
      <div className="mx-auto  space-y-6">
        <p className="text-base font-normal text-gray-200 ">Effective Date: 3rd April 2025

        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        Welcome to DomGenie! These Terms & Conditions ("T&C") govern your access and use of our website, AI-powered services, and related offerings (collectively, the “Services”). By using our Services, you acknowledge that you have read, understood, and agree to be bound by these T&C. If you do not agree, you should immediately discontinue use of our Services.
        </p>

        <p className="text-xl font-semibold text-gray-300 dark:text-white">1. Introduction</p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            1.1 DomGenie is an AI-powered knowledge assistant that provides structured responses to card payment-related queries using AI Agentic Retrieval-Augmented Generation (RAG) technology.</span>


            

          </li>

          <li>
            <span className="font-normal text-gray-300">
            1.2 Our AI model is built on OpenAI APIs and primarily relies on expert-curated content developed by industry professionals with decades of experience in the payments sector. This ensures that the foundational information provided by DomGenie is reliable, accurate, and aligned with best practices in the payments industry.</span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            1.3 In addition to our proprietary expert content, our model may reference external sources utilized by OpenAI.
</span>

          </li>


          <li>
            <span className="font-normal text-gray-300">
            1.4 While we strive to ensure that the information provided by DomGenie maintains an accuracy rate of over 95%, AI models operate on probabilistic algorithms. Consequently, there may be instances where responses are incomplete, outdated, or imprecise. We strongly recommend that users verify all AI-generated information with official payment network documentation, regulatory guidelines, or independent subject matter experts before making business or compliance-related decisions.
</span>

          </li>
          
        </ul>



        <p className="text-xl font-semibold text-gray-300 dark:text-white">2. Eligibility    </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
         

          <li>
            <p className="font-normal text-gray-300 mb-2">
            2.1 By using DomGenie, you confirm that you:</p>

            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-300 ">
              <li>
                  Are at least 18 years old, or you have explicit parental/legal guardian consent if you are a minor.
              </li>
              <li>
              Have the legal capacity to enter into this agreement.
              </li>

              <li>
              Will use our Services only for lawful and permitted purposes in accordance with these T&C.
              </li>

            </ul>
          </li>

          <li>
            <span className="font-normal text-gray-300">2.2 We reserve the right to restrict or terminate access to any user who violates these T&C or engages in unauthorized, fraudulent, or illegal activities.
            </span>

          </li>

          
          
        </ul>




        <p className="text-xl font-semibold text-gray-300 dark:text-white">3. Use of AI-Generated Content (Disclaimer of Accuracy & Liability)     </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            3.1 Nature of AI-Generated Responses
            </span>

            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-300 ">
              <li>
              The responses provided by DomGenie are generated using an AI-powered model that operates on probabilistic reasoning and machine learning algorithms.
              </li>
              <li>
              Our AI system generates responses based on structured industry knowledge curated by our team of payment domain experts, supplemented by publicly available sources used by OpenAI.

              </li>

              <li>
              While we strive for high accuracy, there may be occasional inaccuracies, outdated information, or contextual misinterpretations in AI-generated responses.
              </li>

              <li>
              AI-generated responses are for informational purposes only and should not be considered official financial, regulatory, or legal advice. Users should verify any critical information with official payment networks, regulatory bodies, or subject matter experts before making decisions.

              </li>

            </ul>

          </li>



          <li>
            <span className="font-normal text-gray-300">
            3.2 No Guarantees on Accuracy & Completeness

            </span>

            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-300 ">
              <li>
              We do not guarantee the correctness, completeness, or real-time accuracy of AI-generated responses.

              </li>
              <li>
              AI-generated insights should be considered informational only and not a substitute for professional advice, regulatory guidance, or financial decision-making.
              </li>

              <li>
              Responses do not constitute professional financial guidance, and DomGenie shall not be liable for any financial loss, regulatory non-compliance, or operational issues resulting from reliance on AI-generated insights.

              </li>


            </ul>

          </li>



          <li>
            <span className="font-normal text-gray-300">
            3.3 User Responsibility for Verification


            </span>

            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-300 ">
              <li>
              Users must independently verify AI-generated information before acting upon it, especially when making compliance-related, financial, or business-critical decisions.


              </li>
              <li>
              We encourage users to refer to official Visa, Mastercard, NPCI, or regulatory bodies’ documentation for legally binding information.

              </li>



            </ul>

          </li>



          <li>
            <span className="font-normal text-gray-300">
            3.4 No Liability for Financial or Compliance Risks



            </span>

            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-300 ">
              <li>
              DomGenie shall not be liable for any financial loss, business disruption, regulatory non-compliance, or reputational damage arising from reliance on AI-generated responses.



              </li>
              <li>
              Users assume full responsibility for any actions taken based on AI-generated insights.


              </li>

              

            </ul>

          </li>



          <li>
            <span className="font-normal text-gray-300">
            3.5 Training Data & Content Sources



            </span>

            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-300 ">

          

              <li  className="mt-2">
              DomGenie’s AI model is designed to provide insights based on expert-verified industry knowledge and publicly available sources.



              </li>

              <li>
            No proprietary, financial, or copyright-protected information has been used to train the bot.

              </li>


              <li>
              The model primarily references:

              <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-300 ">
                 <li>Expert-curated payment industry knowledge contributed by professionals with decades of experience.</li>
                 <li>Legally accessible, publicly available information related to card payments, acquiring, issuing, regulatory standards, and compliance.
                 </li>
                 <li>Standardized payment regulations from official financial networks (Visa, Mastercard, NPCI, etc.).
                 </li>
              </ul>

              </li>


              <li>
              DomGenie does not process, store, or utilize any proprietary banking data, financial records, or confidential business information for AI training.


              </li>

              

            </ul>

          </li>
          
        </ul>

          <p className="text-xl font-semibold text-gray-300 dark:text-white">4. Permitted & Prohibited Uses

          </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            4.1 Permitted Uses
            <br/>
            You are permitted to use DomGenie for:

            </span>

            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-300 ">
            <li>Educational and research purposes to understand payments, card networks, and transaction processing.</li>
            <li>Enhancing professional knowledge for industry-related discussions, training, or consulting.</li>
            <li>Exploring structured responses related to acquiring, issuing, ISO 8583, EMV, tokenization, and security best practices.</li>

            </ul>

          </li>



          <li>
            <span className="font-normal text-gray-300">
            4.2 Prohibited Uses
            <br/>
            You are strictly prohibited from:


            </span>

            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-300 ">
            <li>Relying solely on AI responses for regulatory compliance or legal decision-making.
            </li>
            <li>Using AI-generated content to mislead, defraud, or misrepresent information.
            </li>
            <li>Performing financial transactions, storing payment credentials, or inputting sensitive data into the AI model.
            </li>

            <li>Reverse-engineering, modifying, or exploiting DomGenie’s AI model or proprietary content.</li>
            <li>Using DomGenie for unethical, fraudulent, or unlawful activities.</li>

            </ul>

          </li>

         </ul>


        


            <p className="text-xl font-semibold text-gray-300 dark:text-white">5. Privacy Policy & Data Storage

                </p>
                <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                <li>
                  <span className="font-normal text-gray-300">
                  5.1 Minimal Data Collection:
                  

                  </span>

                  <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-300 ">
                  <li>We collect only essential user details, including Name, Email, and Phone Number, as part of our registration or service usage process.  </li>
                  <li>We do not store payment details, transaction logs, or financial credentials.
                  </li>

                  </ul>

                </li>



                <li>
                  <span className="font-normal text-gray-300">
                  5.2 Data Protection & Compliance:
                
                  </span>

                  <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-300 ">
                  <li>Our use of OpenAI’s API ensures that our AI model operates in compliance with OpenAI’s privacy policies.
                  </li>
                  <li>User data is processed in compliance with global data protection laws, including GDPR, UAE Data Protection Law, and India’s IT Act.
                  </li>
                  
                  </ul>

                </li>


                <li>
                  <span className="font-normal text-gray-300">
                  5.3 Third-Party Sharing:
                
                  </span>

                  <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-300 ">
                  <li>We do not sell, rent, or distribute user data to third parties for marketing or commercial purposes.
                  </li>
                  <li>We may share data only when required by law enforcement agencies or regulatory authorities.
                  </li>
                  
                  </ul>

                </li>


             
                  <p className="font-normal text-gray-300">
                  For more details, refer to our <a href="privacy">Privacy Policy.</a>
                
                  </p>

                

              

            </ul>




            <p className="text-xl font-semibold text-gray-300 dark:text-white">6. Intellectual Property Rights

                </p>
                <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                <li>
                  <span className="font-normal text-gray-300">
                  6.1 Ownership of Content & AI Model

                  

                  </span>

                  <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-300 ">
                  <li>The DomGenie AI platform, algorithms, software, and proprietary knowledge base are the exclusive intellectual property of DomGenie FZ LLC RAKEZ UAE and DomGenie powered by AllTekkies Services Private Limited India
                  </li>
                  <li>Users do not acquire ownership rights over AI-generated content, responses, or software architecture.
                  </li>

                  </ul>

                </li>



                <li>
                  <span className="font-normal text-gray-300">
                  6.2 Restrictions on Use
                
                  </span>

                  <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-300 ">
                  <li>Users may not copy, distribute, or reproduce AI-generated responses for commercial use without explicit written consent.
                  </li>
                  <li>Any unauthorized attempt to replicate, modify, or exploit DomGenie’s AI content is strictly prohibited.
                  </li>
                  
                  </ul>

                </li>



            </ul>





            <p className="text-xl font-semibold text-gray-300 dark:text-white">7. Limitation of Liability

                </p>
                <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                <li>
                  <span className="font-normal text-gray-300">
                  7.1 No Warranties Provided

                  

                  </span>

                  <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-300 ">
                  <li>DomGenie is offered on an "as-is" and "as-available" basis, without warranties of accuracy, completeness, merchantability, or fitness for a particular purpose.
                  </li>
                  

                  </ul>

                </li>



                <li>
                  <span className="font-normal text-gray-300">
                  7.2 Liability Exclusions
                
                  </span>

                  <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-300 ">
                  <li>We shall not be held liable for any:

                  <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-300 ">

                    <li>Errors, inaccuracies, or outdated information in AI-generated responses.
                    </li>

                    <li>Financial losses, missed opportunities, or business disruptions arising from reliance on AI insights.

                    </li>

                    <li>Unavailability, API downtimes, or technical failures of the AI platform.
                    </li>

                    </ul>
                  </li>
                  
                  
                  </ul>

                </li>



            </ul>



            <p className="text-xl font-semibold text-gray-300 dark:text-white">8. Termination of Use

                </p>
                <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                <li>
                  <span className="font-normal text-gray-300">
                  8.1 We reserve the right to terminate or suspend access if a user:

                  

                  </span>

                  <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-300 ">
                  <li>Violates any terms of this agreement.
                  </li>

                  <li>Engages in fraudulent, abusive, or illegal activities using DomGenie.

                  </li>

                  <li>Attempts to exploit or misuse the AI system.

                  </li>
                  

                  </ul>

                </li>

            </ul>



            <p className="text-xl font-semibold text-gray-300 dark:text-white">9. Governing Law & Dispute Resolution

                </p>
                <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                <li>
                  <span className="font-normal text-gray-300">
                  9.1 These T&C shall be governed by the laws of the United Arab Emirates (UAE) and Rajasthan, India.
                  </span>

                 

                </li>

                <li>
                  <span className="font-normal text-gray-300">
                  9.2 Any disputes shall be resolved through negotiation first, and if unresolved, arbitration in UAE and India.</span>

                </li>

            </ul>


            <p className="text-xl font-semibold text-gray-300 dark:text-white">10. Modifications to Terms & Conditions

                </p>
                <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                <li>
                  <span className="font-normal text-gray-300">
                  10.1 We reserve the right to modify, update, or amend these T&C to reflect changes in AI technology, regulatory policies, or business operations.
</span>

                 

                </li>

                <li>
                  <span className="font-normal text-gray-300">
                  10.2 Users will be notified of significant updates via email or through the website.

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
  
  export default Terms;
  