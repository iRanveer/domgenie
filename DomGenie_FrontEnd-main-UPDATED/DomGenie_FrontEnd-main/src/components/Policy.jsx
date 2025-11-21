import { useState } from "react";

const Policy = () => {

  const [accordion,setAccordian] = useState(false)
  const [accordion2,setAccordian2] = useState(false)
  const [accordion3,setAccordian3] = useState(false)
  const [accordion4,setAccordian4] = useState(false)
  const [accordion5,setAccordian5] = useState(false)

  const handleAccordianClick1 = ()=>{
    setAccordian(!accordion)
  }

  const handleAccordianClick2 = ()=>{
    setAccordian2(!accordion2)
  }
  const handleAccordianClick3 = ()=>{
    setAccordian3(!accordion3)
  }
  const handleAccordianClick4 = ()=>{
    setAccordian4(!accordion4)
  }
  const handleAccordianClick5 = ()=>{
    setAccordian5(!accordion5)
  }


    return (
      <>
    


    <section className=" py-8 antialiased dark:bg-gray-900 md:py-16 " style={{
     background: "linear-gradient(to bottom, #111827 10%, #6f551e 100%, #111827 80%)", 
    height: "auto",
      /*  backgroundImage:"url('bg-front.jpg')" */
    
  }}>







<div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white " data-inactive-classes="text-gray-500 dark:text-gray-400" className=" mx-6 md:mx-52 pb-16 ">
<h2 className="text-2xl font-semibold text-gray-300 sm:text-4xl mb-4 py-16">Policies</h2>

  <h2 id="accordion-flush-heading-1">
  <button onClick={handleAccordianClick1} type="button" className="flex items-center justify-between w-full py-5 rtl:text-right  border-b border-gray-500  gap-3 text-4xl text-gray-300 font-thin" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
    <span>
    Privacy Policy</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-flush-body-1" className={`${accordion?'':'hidden'}`} aria-labelledby="accordion-flush-heading-1">
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 pt-16">
    <div className="mx-auto max-w-5xl">
      
      <div className="mx-auto  space-y-6">
      <p className="text-base font-normal text-gray-200 ">Effective Date: 3rd April 2025
        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        At DomGenie ("we," "us," or "our"), we are committed to protecting your privacy and ensuring transparency in how we collect, use, and store your information. This Privacy Policy outlines how we handle personal data, AI-generated interactions, and third-party services, including our use of OpenAI's API for AI-powered responses.

        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        By using DomGenie’s services (the "Services"), you acknowledge that you have read and understood this Privacy Policy. If you do not agree, please refrain from using our Services.

        </p>

      

        <p className="text-xl font-semibold text-gray-300 dark:text-white">1. Introduction</p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        At DomGenie ("we," "us," "our"), we value and respect your privacy. This Privacy Policy outlines how we collect, use, store, and protect personal data when you use our services, including interactions with our AI-powered system. We are committed to complying with applicable data protection laws and regulations, including but not limited to the General Data Protection Regulation (GDPR), India’s IT Act, UAE Data Protection Law, and other relevant legislation.


        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        By accessing or using DomGenie, you consent to the collection, use, and sharing of your information as described in this Privacy Policy. If you do not agree with these terms, you should discontinue the use of our services immediately.


        </p>


        <p className="text-xl font-semibold text-gray-300 dark:text-white">2. Scope of This Privacy Policy </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        This Privacy Policy applies to:
        </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            The DomGenie website and AI-powered assistant.</span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Any associated applications, services, or platforms through which DomGenie is accessed.
</span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Any personal and interaction data collected during your engagement with our services.


            </span>

        </li>
         
        </ul>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        This policy does not apply to third-party services or external websites that we may link to, nor does it cover data collection by third-party providers, such as OpenAI, whose APIs we use for AI-based responses.
        </p>



        <p className="text-xl font-semibold text-gray-300 dark:text-white">3. Information We Collect
        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        To provide and enhance our services, we collect different types of data, including personal information and interaction logs.
        </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            3.1 Personal Information
            </span>
            <p className="text-base font-normal text-gray-300 dark:text-gray-400 my-2">
            We collect and store the following personal data when you register or engage with our services:

        </p>

        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
              <span className="font-normal text-gray-300">
               Name (first and last name)

             </span>
            </li>

            <li>
              <span className="font-normal text-gray-300">
              Email address


             </span>
            </li>

            <li>
              <span className="font-normal text-gray-300">
              Phone number

             </span>
            </li>

          </ul>

          <p className="text-base font-normal text-gray-300 dark:text-gray-400 my-2">
          We do not collect or store sensitive financial data, payment card details, government-issued identification numbers, or personal transaction history.

        </p>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            3.2 AI Interaction Data (User Queries & AI Responses)


            </span>


        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
              <span className="font-normal text-gray-300">
              When you interact with DomGenie’s AI-powered system, your questions and the corresponding AI-generated responses may be temporarily stored.

             </span>
          </li>

          <li>
              <span className="font-normal text-gray-300">
              Since DomGenie utilizes OpenAI’s API for processing responses, OpenAI retains AI interaction data (questions and answers) for up to 30 days as part of its compliance monitoring and abuse detection policies.

             </span>
          </li>

          <li>
              <span className="font-normal text-gray-300">
              OpenAI does not use stored data for model training or AI improvement, and DomGenie has no control over OpenAI’s data retention policies.

             </span>
          </li>

          <li>
              <span className="font-normal text-gray-300">
              OpenAI may update its policies at any time without prior notice, and users are encouraged to review OpenAI’s official privacy documentation for the most up-to-date information.

             </span>
          </li>

        </ul>

          </li>




          <li>
            <span className="font-normal text-gray-300">
            3.3 Automatically Collected Information (Cookies & Analytics)


            </span>

            <p className="text-base font-normal text-gray-300 dark:text-gray-400 my-2 ml-2">
            We automatically collect certain technical and usage data through cookies, log files, and tracking technologies to enhance user experience and system performance. This includes:

        </p>


        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
              <span className="font-normal text-gray-300">
              Device Information: Browser type, operating system, screen resolution.


             </span>
          </li>

          <li>
              <span className="font-normal text-gray-300">
              IP Address & Geolocation: Used for security monitoring and fraud prevention.

             </span>
          </li>

          <li>
              <span className="font-normal text-gray-300">
              Usage Data: Website navigation patterns, pages visited, session duration, and interactions with AI-generated responses.


             </span>
          </li>


        </ul>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        We do not use tracking mechanisms for behavioral profiling or targeted advertising.
        </p>


          </li>



        </ul>

          <p className="text-xl font-semibold text-gray-300 dark:text-white">4. How We Use Your Information

          </p>


          <p className="text-base font-normal text-gray-300 dark:text-gray-400">
          We use the collected information to:

        </p>

        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            Provide AI-driven insights related to payment systems, card acquiring, issuing, and compliance.
            </span>

          </li>


          <li>
            <span className="font-normal text-gray-300">
            Improve service quality and accuracy by analyzing user queries and refining AI responses.



            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Ensure security and prevent misuse by monitoring unusual activity and potential policy violations.



            </span>

          </li>


          <li>
            <span className="font-normal text-gray-300">
            Communicate with users regarding updates, support requests, and new feature releases.
            



            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Comply with applicable legal and regulatory requirements related to data protection, fraud detection, and industry standards.


            </span>

          </li>


          
          
        </ul>


        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        We do not use collected data for advertising, automated decision-making, or unsolicited marketing purposes.

        </p>



        <p className="text-xl font-semibold text-gray-300 dark:text-white">5. Sharing of Information

            </p>


            <p className="text-base font-normal text-gray-300 dark:text-gray-400">
            We do not sell, rent, or share personal data with third parties except under the following circumstances:

            </p>

            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
            <li>
              <span className="font-normal text-gray-300">
              5.1 OpenAI API Usage & Data Handling

              </span>

              <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                <li>
                  <span className="font-normal text-gray-300">
                  Since DomGenie relies on OpenAI’s API for AI-generated responses, OpenAI temporarily stores user interactions for a maximum of 30 days for monitoring purposes.


                  </span>

                  </li>

                  <li>
                  <span className="font-normal text-gray-300">
                  We do not have control over OpenAI’s internal policies regarding stored AI interaction data.


                  </span>

                  </li>

                  <li>
                  <span className="font-normal text-gray-300">
                  OpenAI does not use stored interactions for AI training or improvement purposes.


                  </span>

                  </li>
              </ul>

            </li>


            <li>
              <span className="font-normal text-gray-300">
              5.2 Compliance with Legal Obligations
               </span>

               <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                <li>
                  <span className="font-normal text-gray-300">
                  We may disclose information if required by law enforcement authorities, regulatory bodies, or court orders to comply with applicable legal requirements.


                  </span>

                  </li>

                
              </ul>
              
            </li>


            <li>
              <span className="font-normal text-gray-300">
              5.3 Business Transfers

               </span>

               <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                <li>
                  <span className="font-normal text-gray-300">
                  In the event of a merger, acquisition, or restructuring, user data may be transferred to the new entity under the same privacy principles.



                  </span>

                  </li>

                
              </ul>
              
            </li>

           


            </ul>



            <p className="text-xl font-semibold text-gray-300 dark:text-white">6. Data Security & Protection

              </p>


              <p className="text-base font-normal text-gray-300 dark:text-gray-400">
              We implement stringent security measures to safeguard user information from unauthorized access, breaches, or misuse.

              </p>

              <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
              <li>
                <span className="font-normal text-gray-300">
                6.1 Data Encryption & Secure Storage

                </span>

                <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  <li>
                    <span className="font-normal text-gray-300">
                    All personal data is encrypted during transmission and storage using SSL/TLS protocols.


                    </span>

                    </li>

                    <li>
                    <span className="font-normal text-gray-300">
                    AI-generated interactions are processed through secure OpenAI APIs.


                    </span>

                    </li>

                   
                </ul>

              </li>


              <li>
                <span className="font-normal text-gray-300">
                6.2 Access Control & Monitoring
                </span>

                <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  <li>
                    <span className="font-normal text-gray-300">
                    User data is accessible only by authorized personnel with strict authentication controls.


                    </span>

                    </li>

                    <li>
                    <span className="font-normal text-gray-300">
                    We conduct regular security audits and vulnerability assessments.



                    </span>

                    </li>

                  
                </ul>
                
              </li>


              <li>
                <span className="font-normal text-gray-300">
                6.3 Data Retention Policy

                </span>

                <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  <li>
                    <span className="font-normal text-gray-300">
                    Personal information is stored for as long as necessary to provide services and fulfill legal requirements.



                    </span>

                    </li>

                    <li>
                    <span className="font-normal text-gray-300">
                    AI interactions processed through OpenAI’s API are temporarily stored by OpenAI for up to 30 days.

                    </span>

                    </li>

                    <li>
                    <span className="font-normal text-gray-300">
                    Cookies and analytics data are retained periodically and purged as needed.

                    </span>

                    </li>

                  
                </ul>
                
              </li>




              </ul>




              <p className="text-xl font-semibold text-gray-300 dark:text-white">7. User Rights & Data Control

                </p>


                <p className="text-base font-normal text-gray-300 dark:text-gray-400">
                Under applicable privacy laws, you have certain rights regarding your personal data:

                </p>

                <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                <li>
                  <span className="font-normal text-gray-300">
                  7.1 Right to Access & Correction


                  </span>

                  <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    <li>
                      <span className="font-normal text-gray-300">
                      Users can request a copy of the personal data we store.

                      </span>

                      
                      </li>

                      <li>
                      <span className="font-normal text-gray-300">
                      Users may request corrections or modifications to inaccurate data.


                      </span>

                      
                      </li>

                   

                    
                  </ul>

                </li>


                <li>
                  <span className="font-normal text-gray-300">
                  7.2 Right to Deletion ("Right to be Forgotten")

                  </span>

                  <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    <li>
                      <span className="font-normal text-gray-300">
                      Users may request deletion of their personal data from DomGenie’s records.



                      </span>

                      </li>

                      <li>
                      <span className="font-normal text-gray-300">
                      AI-generated interactions processed via OpenAI cannot be deleted from OpenAI’s systems as we do not control OpenAI’s retention policies.




                      </span>

                      </li>

                    
                  </ul>
                  
                </li>


                <li>
                  <span className="font-normal text-gray-300">
                  7.3 Right to Restrict Processing

                  </span>

                  <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    <li>
                      <span className="font-normal text-gray-300">
                      Users may request that their data is not used for analytics or service improvements.

                      </span>

                      </li>

                     

                    
                  </ul>
                  
                </li>



                <li>
                  <span className="font-normal text-gray-300">
                  7.4 Right to Opt-Out of Cookies & Tracking


                  </span>

                  <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    <li>
                      <span className="font-normal text-gray-300">
                      Users can disable cookies in browser settings, though this may affect website functionality.


                      </span>

                      </li>
                      <p className="text-base font-normal text-gray-300 dark:text-gray-400">
                      To exercise these rights, users may contact support@domgenie.ai


            </p>
                    
                  </ul>
                  
                </li>




                </ul>




                <p className="text-xl font-semibold text-gray-300 dark:text-white">8. Third-Party Links & Services

                  </p>


                  <p className="text-base font-normal text-gray-300 dark:text-gray-400">
                  DomGenie may contain links to third-party websites or services for reference.

                  </p>

                  <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  <li>
                    <span className="font-normal text-gray-300">
                    We are not responsible for the data privacy policies of external websites.
                    </span>

                    

                  </li>

                  <li>
                    <span className="font-normal text-gray-300">
                    Users should review the privacy policies of third-party sites before engaging with them.



                    </span>

                    

                  </li>

                  </ul>



                  <p className="text-xl font-semibold text-gray-300 dark:text-white">9. Changes to This Privacy Policy

                  </p>



                  <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  <li>
                    <span className="font-normal text-gray-300">
                    We reserve the right to update this Privacy Policy to reflect new legal requirements, AI technology advancements, or changes in OpenAI’s data policies.

                    </span>

                    

                  </li>

                  <li>
                    <span className="font-normal text-gray-300">
                    Users will be notified of material updates through email or website announcements.

                    </span>

                    

                  </li>

                  <li>
                    <span className="font-normal text-gray-300">
                    Continued use of our services after an update constitutes acceptance of the revised Privacy Policy.

                    </span>

                    

                  </li>

                  </ul>



                  <p className="text-xl font-semibold text-gray-300 dark:text-white">10. Governing Law & Dispute Resolution

                  </p>

                  <p className="text-base font-normal text-gray-300 dark:text-gray-400">
                  This Privacy Policy shall be governed by and interpreted under the laws of India and UAE.

                  </p>



                  <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  <li>
                    <span className="font-normal text-gray-300">
                    Any disputes shall first be attempted to be resolved amicably.


                    </span>

                    

                  </li>

                  <li>
                    <span className="font-normal text-gray-300">
                    If a resolution is not reached, the matter shall be subject to binding arbitration in India and UAE


                    </span>

                    

                  </li>

                
                  </ul>



                  <p className="text-xl font-semibold text-gray-300 dark:text-white">11. AI Interaction Data & Training Sources

                  </p>

                  <p className="text-base font-normal text-gray-300 dark:text-gray-400">
                  At DomGenie, we ensure that our AI-powered system operates with the highest standards of data security, compliance, and ethical AI usage. This section details how our AI model interacts with user queries, what data is processed, and our approach to AI training.

                  </p>



                  <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  <li>
                    <span className="font-normal text-gray-300">
                    11.1 User Queries & AI-Generated Responses
                    </span>

                    <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                      <li>
                          <span className="font-normal text-gray-300">
                          When users interact with DomGenie’s AI assistant, their queries and AI-generated responses are processed in real -time to provide structured and relevant answers.

                          </span>

                      </li>

                      <li>
                          <span className="font-normal text-gray-300">
                          We do not store AI-generated responses on our servers; however, as we utilize OpenAI's API, OpenAI may temporarily retain interaction data for a maximum of 30 days for compliance and abuse monitoring purposes.

                          </span>

                      </li>

                      <li>
                          <span className="font-normal text-gray-300">
                          DomGenie does not use or retain personally identifiable financial data, transaction details, or any confidential banking information during AI processing.

                          </span>

                      </li>
                    </ul>

                    

                  </li>

                  <li>
                    <span className="font-normal text-gray-300">
                    11.2 No Use of Financial Data or Copyrighted Information in AI Training

                    </span>

                   

                    <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    <li className="mt-2">
                          <span className="font-normal text-gray-300">
                          DomGenie has not been trained on financial transaction data, payment credentials, or any copyrighted materials.


                          </span>

                          </li>
                      
                      <li>
                          <span className="font-normal text-gray-300">
                          Our AI model primarily relies on:


                          </span>

                          <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                              <li>
                              <span className="font-normal text-gray-300">
                              Expert-curated industry knowledge from professionals with decades of experience in the payments domain.



                              </span>

                              </li>
                              <li>
                              <span className="font-normal text-gray-300">
                              Publicly available sources that are legally permissible for AI-assisted retrieval.



                              </span>

                              </li>
                              <li>
                              <span className="font-normal text-gray-300">
                              Regulatory and compliance guidelines from official financial institutions.


                              </span>

                              </li>
                          </ul>

                      </li>

                      <li>
                          <span className="font-normal text-gray-300">
                          We do not incorporate or expose proprietary banking data, internal financial records, or sensitive business information in AI-generated responses.


                          </span>

                      </li>

                     
                    </ul>

                    

                  </li>

                  <li>
                    <span className="font-normal text-gray-300">
                    11.3 No AI Model Training on User Data


                    </span>

                    <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                              <li>
                              <span className="font-normal text-gray-300">
                              DomGenie does not train its AI model on user interactions, queries, or responses.
                        


                              </span>

                              </li>

                              <li>
                              <span className="font-normal text-gray-300">
                              Any data processed through OpenAI’s API is subject to OpenAI’s privacy and security policies.

                              </span>

                              </li>
                              <li>
                              <span className="font-normal text-gray-300">
                              As a result, no user input, confidential payment information, or proprietary business details are used to enhance or modify DomGenie’s AI model.



                              </span>

                              </li>
                              
                          </ul>

                  </li>


                  <li>
                    <span className="font-normal text-gray-300">
                    11.4 Transparency in AI Data Processing


                    </span>

                    <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                              <li>
                              <span className="font-normal text-gray-300">
                              While DomGenie provides AI-powered payment domain insights, responses should be considered informational only and must be independently verified.

                              </span>

                              </li>
                              <li>
                              <span className="font-normal text-gray-300">
                              Users should refrain from entering confidential or sensitive information into the system, as we do not store or process such data.



                              </span>

                              </li>


                              <li>
                              <span className="font-normal text-gray-300">
                              If users have concerns regarding data privacy, they may contact our support team at support@domgenie.ai for further clarification.



                              </span>

                              </li>

                             
                              
                          </ul>

                  </li>

                
                  </ul>



                  <p className="text-xl font-semibold text-gray-300 dark:text-white">12. Compliance with Global Data Protection Laws


                  </p>

                  <p className="text-base font-normal text-gray-300 dark:text-gray-400">
                  DomGenie is an AI-powered platform that provides insights into the payments industry. We do not store or process sensitive personal or financial data on our own servers.


                  </p>

                  <p className="text-base font-normal text-gray-300 dark:text-gray-400">
                  Since DomGenie uses OpenAI’s API for AI-generated responses, the handling of AI queries and responses is governed by OpenAI’s privacy policies. OpenAI temporarily retains API interaction data for up to 30 days for security monitoring but does not use it for model training. As OpenAI may update its policies, users are encouraged to review OpenAI’s Privacy Policy for the latest details.

                  </p>

                  <p className="text-base font-normal text-gray-300 dark:text-gray-400">
                    User Rights & Compliance
                    </p>

                    <p className="text-base font-normal text-gray-300 dark:text-gray-400">
                    DomGenie complies with applicable global data protection laws, including:

                    </p>

                  <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  
                 
               

                    <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                      <li>
                          <span className="font-normal text-gray-300">
                          General Data Protection Regulation (GDPR - EU)

                          </span>

                      </li>

                      <li>
                          <span className="font-normal text-gray-300">
                          UAE Personal Data Protection Law (PDPL)

                          </span>

                      </li>

                      <li>
                          <span className="font-normal text-gray-300">
                          India’s Digital Personal Data Protection Act (DPDP Act, 2023)


                          </span>

                      </li>
                    </ul>

                    

               
                
                  </ul>



                  <p className="text-xl font-semibold text-gray-300 dark:text-white">13. User and Chat Data Storage & Security Policy


</p>

<p className="text-base font-normal text-gray-300 dark:text-gray-400">
At DomGenie, we prioritize the privacy and security of user interactions. As part of our AI-powered chatbot service for the card and payment domain, we store user chat data to enhance response accuracy, improve system performance, and refine AI models.


</p>

<p className="text-base font-normal text-gray-300 dark:text-gray-400">
How We Store Chat Data

</p>



<ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
<li>
  <span className="font-normal text-gray-300">
  User chat logs are securely stored in AWS S3 for service improvement and reference.
  </span>  

</li>

<li>
  <span className="font-normal text-gray-300">
  Chat data is stored in clear format but is protected through strict access controls and security measures.
  </span>  

</li>

<li>
  <span className="font-normal text-gray-300">
  We do not share, sell, or use chat data for any purpose other than service enhancement.
  </span>  

</li>


<p className="text-base font-normal text-gray-300 dark:text-gray-400">
Data Security Measures

</p>


<li>
  <span className="font-normal text-gray-300">
  Encryption: We are implementing S3 encryption (SSE-S3 or SSE-KMS) to enhance security.

  </span>  

</li>

<li>
  <span className="font-normal text-gray-300">
  Access Control: Only authorized personnel can access chat data.

  </span>  

</li>

<li>
  <span className="font-normal text-gray-300">
  Data Minimization: Chat data is retained only as long as necessary for system learning and performance improvements.

  </span>  

</li>

<p className="text-base font-normal text-gray-300 dark:text-gray-400">
User Control & Transparency

</p>


<li>
  <span className="font-normal text-gray-300">
  
  Users can delete their personal as well as chat data by reaching out to our support team at support@domgenie.ai or accessing the option in their profile settings.
  </span>  

</li>

<li>
  <span className="font-normal text-gray-300">
  We do not store or process sensitive payment details (e.g., card numbers, CVV, or banking credentials) in chat logs.

  </span>  

</li>




<p className="text-base font-normal text-gray-300 dark:text-gray-400">
User Data Storage & Security


</p>


<li>
  <span className="font-normal text-gray-300">
  User data, including name, email, and mobile number, is stored in our database within our cloud infrastructure. We follow strict security measures to protect this information. Passwords are fully secured through encryption to ensure user privacy and security

  </span>  

</li>



                    

                






</ul>




<p className="text-base font-normal text-gray-300 dark:text-gray-400">If users have concerns regarding data privacy, they may contact our support team at support@domgenie.ai for further clarification.
</p>





  <p className="font-normal text-gray-300">
  Changes to This Privacy Policy


  </p>

  <p className="text-base font-normal text-gray-300 dark:text-gray-400">
  We reserve the right to update this policy in response to changes in OpenAI’s policies or legal requirements. Users will be notified of significant updates via our website or email.



</p>



          

      </div>
     
      
    </div>
  </div>
  </div>
  

  <h2 id="accordion-flush-heading-1">
    <button onClick={handleAccordianClick2} type="button" className="flex items-center justify-between w-full py-5 rtl:text-right  border-b border-gray-500  gap-3 text-4xl text-gray-300 font-thin" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
     <span>
        Refund Policy</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-flush-body-1" className={`${accordion2?'':'hidden'}`} aria-labelledby="accordion-flush-heading-1">
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 pt-16">
    <div className="mx-auto max-w-5xl">
      
      <div className="mx-auto  space-y-6">
      <p className="text-base font-normal text-gray-200 ">Effective Date: 3rd April 2025
        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        At DomGenie, we strive to offer high-quality AI-powered subscription services and professional training programs. This Refund Policy outlines the conditions under which refunds may or may not be granted for our services.


        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        By purchasing a subscription or enrolling in a training program, you acknowledge that you have read, understood, and agreed to this Refund Policy.


        </p>

      

        <p className="text-xl font-semibold text-gray-300 dark:text-white">1. No Refund Policy for Subscription Services
        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        DomGenie offers AI-powered subscription services, which provide users with ongoing access to structured industry knowledge, payment domain insights, and automated AI-generated responses.



        </p>


        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            All subscription purchases are final, and we do not offer refunds or partial refunds for any subscription plans.</span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Users may cancel their subscription at any time, but cancellation will only stop future billing cycles and will not result in a refund for the current billing period.

          </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            If you experience technical issues or service disruptions, please contact our support team at support@domgenie.ai, and we will work to resolve the issue promptly.



            </span>

        </li>
         
        </ul>


        

        <p className="text-xl font-semibold text-gray-300 dark:text-white">2. Refund Policy for Training Programs
        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        We offer a 100% Refund Guarantee for participants who withdraw their enrollment 7 days or more before the training date. However, cancellations made less than 7 days prior to the training date are non-refundable.

        </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            2.1 100% Refund Guarantee
            </span>

            <p className="font-normal text-gray-300 ml-2 my-2">
            Participants who withdraw 7 days or more before the training date are eligible for a full refund of the course fee.

            </p>

            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
              <li>
                <span className="font-normal text-gray-300">
                Refund requests must be submitted via email to support@domgenie.ai with the following details:

                </span>


                <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    <li>
                      <span className="font-normal text-gray-300">
                      Full Name

                      </span>


                    </li>

                    <li>
                      <span className="font-normal text-gray-300">
                      Email Address (used for registration)


                      </span>


                    </li>

                    <li>
                      <span className="font-normal text-gray-300">
                      Training Program Name & Date



                      </span>


                    </li>

                    <li>
                      <span className="font-normal text-gray-300">
                      Payment Receipt or Transaction ID


                      </span>


                    </li>


                </ul>

                </li>

                <li>
                <span className="font-normal text-gray-300">
                Refunds will be processed within 14 business days after approval.


                </span>


              </li>
            </ul>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            2.2 No Refund After the Deadline

            </span>

            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
              <li>
                <span className="font-normal text-gray-300">
                Cancellations made less than 7 days before the training date are not eligible for a refund.


                </span>

                </li>

                <li>
                <span className="font-normal text-gray-300">
                This policy applies regardless of the reason for cancellation, including changes in personal schedule, work commitments, or other obligations.



                </span>

                </li>
                </ul>

          </li>

          <li>
            <p className="font-normal text-gray-300">
            2.3 Exceptional Circumstances
             </p>

             <p className="font-normal text-gray-300 my-2">
             We understand that unforeseen emergencies may arise. In such cases, participants may be eligible for alternative arrangements, including:

             </p>

            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
              <li>
                <span className="font-normal text-gray-300">
                Rescheduling to a future training session at no additional cost.



                </span>

                </li>

                <li>
                <span className="font-normal text-gray-300">
                Transfer of enrollment to another individual (must be requested at least 48 hours before the training starts).




                </span>

                </li>
                </ul>

                <span className="font-normal text-gray-300">
                Requests for exceptional circumstances will be reviewed on a case-by-case basis. Please contact us at support@domgenie.ai to discuss available options.


             </span>

        </li>
         
        </ul>

       



        <p className="text-xl font-semibold text-gray-300 dark:text-white">3. Refund Processing Timeline

        </p>

      {/*   <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        DomGenie offers AI-powered subscription services, which provide users with ongoing access to structured industry knowledge, payment domain insights, and automated AI-generated responses.



        </p> */}


        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            Approved refunds will be processed within 14 business days of receiving a valid refund request.
            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Refunds will be credited using the same payment method used during registration.


          </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            We will notify you via email once your refund has been processed.




            </span>

        </li>
         
        </ul>



        <p className="text-xl font-semibold text-gray-300 dark:text-white">4. Changes to This Refund Policy


              </p>

                 <p className="text-base font-normal text-gray-300 dark:text-gray-400">DomGenie reserves the right to update or modify this Refund Policy at any time. Any changes will be communicated on our website and via email to registered users.



              </p> 








          

      </div>
     
      
    </div>
  </div>





  </div>


  <h2 id="accordion-flush-heading-1">
    <button onClick={handleAccordianClick3} type="button" className="flex items-center justify-between w-full py-5 rtl:text-right  border-b border-gray-500  gap-3 text-4xl text-gray-300 font-thin" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
    <span>
        Cookie Policy</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-flush-body-1" className={`${accordion3?'':'hidden'}`}  aria-labelledby="accordion-flush-heading-1">
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 pt-16">
    <div className="mx-auto max-w-5xl">
      
      <div className="mx-auto  space-y-6">
      <p className="text-base font-normal text-gray-200 ">Effective Date: 3rd April 2025
        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        At DomGenie ("we," "us," "our"), we use cookies and similar tracking technologies to enhance user experience, analyze website performance, and ensure compliance with global privacy laws, including the General Data Protection Regulation (GDPR), UAE Data Protection Law, and India’s IT Act.



        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        This Cookie Policy explains what cookies are, how we use them, and how you can manage your preferences.


        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        By continuing to use our website, you consent to the use of cookies in accordance with this policy. If you do not agree, you may disable cookies through your browser settings or the cookie consent banner on our website.



        </p>

      

        <p className="text-xl font-semibold text-gray-300 dark:text-white">1. What Are Cookies?
        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        Cookies are small text files that are placed on your device (computer, tablet, smartphone) when you visit a website. They help websites store user preferences, track browsing behavior, and enhance functionality.



        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        Cookies can be categorized into:

        </p>


        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            Session Cookies: These expire when you close your browser.

            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Persistent Cookies: Stored on your device for a specific period or until manually deleted.


          </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            First-Party Cookies: Set by DomGenie to support core functionalities.
           </span>

         </li>

         <li>
            <span className="font-normal text-gray-300">
            Third-Party Cookies: Set by external services for analytics, security, or integrations (e.g., OpenAI, Google Analytics).

           </span>

         </li>
         
        </ul>


        

        <p className="text-xl font-semibold text-gray-300 dark:text-white">2. How We Use Cookies
        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        DomGenie uses cookies for the following purposes:


        </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            2.1 Essential Cookies (Strictly Necessary)
            </span>

            <span className="font-normal text-gray-300">
            These cookies are required for the website to function properly. They help with:


            </span>

            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
              <li>
                <span className="font-normal text-gray-300">
                User authentication and login security.

                </span>


                

                </li>

                <li>
                <span className="font-normal text-gray-300">
                Fraud detection and risk mitigation.



                </span>


              </li>

              <li>
                <span className="font-normal text-gray-300">
                Compliance with legal and regulatory requirements.




                </span>


              </li>
            </ul>
            <p className="text-base font-normal text-gray-300 dark:text-gray-400">
            These cookies cannot be disabled, as they are critical to website functionality.



        </p>
          </li>

          <li>
            <span className="font-normal text-gray-300">
            2.2 Analytics and Performance Cookies

            </span>

            <span className="font-normal text-gray-300">
            These cookies collect anonymous user data to help us:


            </span>

            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
              <li>
                <span className="font-normal text-gray-300">
                Understand visitor behavior and improve website usability.



                </span>

                </li>

                <li>
                <span className="font-normal text-gray-300">
                Optimize AI-powered features based on user interactions.




                </span>

                </li>

                <li>
                <span className="font-normal text-gray-300">
                Analyze performance using third-party tools like Google Analytics.





                </span>

                </li>
                </ul>

          </li>

          <li>
            <p className="font-normal text-gray-300">
            2.3 Functionality and Preference Cookies

             </p>

             <p className="font-normal text-gray-300 mt-2 mb-2">
             These cookies store user preferences such as:

             </p>

            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
              <li>
                <span className="font-normal text-gray-300">
                Language selection, theme settings, and interaction history.




                </span>

                </li>

                <li>
                <span className="font-normal text-gray-300">
                Enhancing the AI chat experience by remembering previous queries.





                </span>

                </li>
                </ul>

              
        </li>


        <li>
            <p className="font-normal text-gray-300">
            2.4 Third-Party and External Service Cookies


             </p>

             <p className="font-normal text-gray-300 my-2">
             DomGenie integrates with third-party services that may place cookies on your device. These include:


             </p>

            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
              <li>
                <span className="font-normal text-gray-300">
                OpenAI API Cookies: Since DomGenie uses OpenAI’s API for AI-generated responses, OpenAI may store temporary cookies for compliance and security monitoring.





                </span>

                </li>

                <li>
                    <span className="font-normal text-gray-300">
                    Google Analytics Cookies: Used for tracking website performance and visitor engagement.

                    </span>

                </li>

                <li>
                    <span className="font-normal text-gray-300">
                    Cloud Hosting Cookies: Used to maintain uptime, prevent security breaches, and optimize server performance.

                    </span>

                </li>


                </ul>

                <span className="font-normal text-gray-300">
                We do not control the data collection policies of third-party services, and users are encouraged to review their respective privacy policies.


                    </span>
        </li>
         
        </ul>

       



        <p className="text-xl font-semibold text-gray-300 dark:text-white">3. GDPR Compliance and User Consent


        </p>

         <p className="text-base font-normal text-gray-300 dark:text-gray-400">
         Under the General Data Protection Regulation (GDPR), European users have the right to:



        </p> 


        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            Be informed about how cookies are used.

            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Provide explicit consent before non-essential cookies are placed.



          </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Withdraw consent at any time through the cookie settings on our website.





            </span>

        </li>

        <li>
            <span className="font-normal text-gray-300">
            Request deletion or restriction of personal data collected via cookies.

            </span>

        </li>
         
        </ul>


        <p className="text-xl font-semibold text-gray-300 dark:text-white">How We Ensure GDPR Compliance



          </p>

         

          <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
            <li>
              <span className="font-normal text-gray-300">
              Cookie Consent Banner: When you visit DomGenie, a pop-up banner will request explicit consent for non-essential cookies.


              </span>

            </li>

            <li>
              <span className="font-normal text-gray-300">
              Granular Cookie Controls: Users can choose to enable or disable specific cookie categories.




            </span>

            </li>

            <li>
              <span className="font-normal text-gray-300">
              Data Minimization: We only collect necessary, anonymized analytics data for performance tracking.



              </span>

          </li>

          <li>
              <span className="font-normal text-gray-300">
              Right to Opt-Out: Users can disable non-essential cookies at any time using the "Cookie Settings" button on our website.


              </span>

          </li>
          
          </ul>

          <p className="text-base font-normal text-gray-300 dark:text-gray-400">
          If you have any concerns regarding GDPR compliance, you may contact our Data Protection Officer (DPO) at support@domgenie.ai


        </p> 

          


        <p className="text-xl font-semibold text-gray-300 dark:text-white">4. How to Manage and Disable Cookies</p>
        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        You can control or delete cookies through your browser settings:
        </p> 


          <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
            <li>
              <span className="font-normal text-gray-300">
              Google Chrome: Settings → Privacy and Security → Cookies and Site Data.

              </span>

            </li>

            <li>
              <span className="font-normal text-gray-300">
              Mozilla Firefox: Preferences → Privacy & Security → Cookies and Site Data.

            </span>

            </li>

            <li>
              <span className="font-normal text-gray-300">
              Safari: Preferences → Privacy → Manage Website Data.

              </span>

          </li>

          <li>
              <span className="font-normal text-gray-300">
              Microsoft Edge: Settings → Privacy, Search, and Services → Cookies and Site Permissions.


              </span>

          </li>

          </ul>

          <p className="text-base font-normal text-gray-300 dark:text-gray-400">
          Disabling cookies may affect website functionality, including login access, AI-generated responses, and personalization features.
        </p> 





        <p className="text-xl font-semibold text-gray-300 dark:text-white">5. Data Security and Privacy Protection
        </p>
        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        We implement strict security measures to protect user data collected through cookies, including:
        </p> 


          <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
            <li>
              <span className="font-normal text-gray-300">
              Data Encryption: Secure transmission of cookies using SSL/TLS protocols.

              </span>

            </li>

            <li>
              <span className="font-normal text-gray-300">
              Limited Data Retention: We store only anonymized analytics data and periodically delete unnecessary logs.


            </span>

            </li>

            <li>
              <span className="font-normal text-gray-300">
              Access Control: Only authorized personnel can access user interaction data for service optimization.

              </span>

          </li>

          <li>
              <span className="font-normal text-gray-300">
              No Behavioral Tracking: We do not use cookies for targeted advertising, profiling, or third-party behavioral tracking.


              </span>

          </li>

          

          </ul>



          <p className="text-xl font-semibold text-gray-300 dark:text-white">6. Updates to This Cookie Policy

        </p>
        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        We may update this Cookie Policy periodically to:

        </p> 


          <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
            <li>
              <span className="font-normal text-gray-300">
              Reflect changes in legal or regulatory requirements (e.g., GDPR, UAE, India’s IT Act).


              </span>

            </li>

            <li>
              <span className="font-normal text-gray-300">
              Comply with new privacy standards for AI-based services.


            </span>

            </li>

            <li>
              <span className="font-normal text-gray-300">
              Improve transparency and user control over cookie preferences.


              </span>

          </li>


          </ul>
          <p className="text-base font-normal text-gray-300 dark:text-gray-400">
          Any updates will be posted on our website, and major changes will be communicated through email notifications to registered users.

        </p>



      </div>
     
      
    </div>
  </div>



  </div>


  <h2 id="accordion-flush-heading-1">
    <button onClick={handleAccordianClick4} type="button" className="flex items-center justify-between w-full py-5 rtl:text-right  border-b border-gray-500  gap-3 text-4xl text-gray-300 font-thin" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
    <span>
    Acceptable Use Policy (AUP)
    </span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-flush-body-1" className={`${accordion4?'':'hidden'}`}  aria-labelledby="accordion-flush-heading-1">
    

  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 pt-16">
    <div className="mx-auto max-w-5xl">
      
      <div className="mx-auto  space-y-6">
      <p className="text-base font-normal text-gray-200 ">Effective Date: 3rd April 2025
        </p>

        

      

        <p className="text-xl font-semibold text-gray-300 dark:text-white">1. Introduction
        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        This Acceptable Use Policy (AUP) outlines the rules and guidelines for using DomGenie, our AI-powered knowledge platform. By accessing or using DomGenie, you agree to comply with this policy.
        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        DomGenie is designed to provide informational insights into the payments industry, including acquiring, issuing, compliance, ISO 8583, EMV, and other related topics. However, misuse of the platform, including unauthorized access, fraudulent activities, or unethical use, is strictly prohibited.


        </p>


        <p className="text-xl font-semibold text-gray-300 dark:text-white">2. Prohibited Activities

        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        Users must not engage in the following activities while using DomGenie:



        </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            2.1 Unlawful and Fraudulent Use

            </span>

          
            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
              <li>
                <span className="font-normal text-gray-300">
                Violating any local, national, or international laws.


                </span>


                

                </li>

                <li>
                <span className="font-normal text-gray-300">
                Using DomGenie for any fraudulent, deceptive, or misleading activities.




                </span>


              </li>

              <li>
                <span className="font-normal text-gray-300">
                Attempting to obtain unauthorized access to the AI system, platform, or any related infrastructure.


                </span>


              </li>
            </ul>
           
          </li>

          <li>
            <span className="font-normal text-gray-300">
            2.2 Misuse of AI-Generated Content

            </span>

           

            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
              <li>
                <span className="font-normal text-gray-300">
                Relying on AI responses as professional financial, legal, or compliance advice.




                </span>

                </li>

                <li>
                <span className="font-normal text-gray-300">
                Using AI-generated content to spread false, misleading, or harmful information.





                </span>

                </li>

                <li>
                <span className="font-normal text-gray-300">
                Reproducing, distributing, or selling AI-generated responses without explicit permission from DomGenie.



                </span>

                </li>
                </ul>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            2.3 Security Violations & System Abuse


             </span>

           
            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
              <li>
                <span className="font-normal text-gray-300">
                Attempting to disrupt, overload, or interfere with DomGenie’s operations.

                </span>

                </li>

                <li>
                <span className="font-normal text-gray-300">
                Engaging in unauthorized scraping, data mining, or hacking activities.

                </span>

                </li>

                <li>
                <span className="font-normal text-gray-300">
                Introducing viruses, malware, or other harmful code into the system.


                </span>

                </li>

                </ul>

              
        </li>


        <li>
            <span className="font-normal text-gray-300">
            2.4 Offensive or Harmful Conduct


             </span>

            
            <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
              <li>
                <span className="font-normal text-gray-300">
                Using DomGenie to generate, share, or disseminate hate speech, discrimination, harassment, or defamatory content.

                </span>

                </li>

                <li>
                    <span className="font-normal text-gray-300">
                    Attempting to bypass AI restrictions or exploit vulnerabilities.

                    </span>

                </li>

            

                </ul>

              
        </li>
         
        </ul>

       



        <p className="text-xl font-semibold text-gray-300 dark:text-white">3. AI Model Limitations & User Responsibility



        </p>

         <p className="text-base font-normal text-gray-300 dark:text-gray-400">
         DomGenie provides AI-generated insights for informational purposes only and does not guarantee:


        </p> 


        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            The accuracy, completeness, or reliability of AI responses.


            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Compliance with regulatory or legal requirements.

          </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Liability for financial loss or regulatory non-compliance caused by AI-generated content.

            </span>

        </li>

       
         
        </ul>

        <span className="font-normal text-gray-300">
        Users must independently verify AI responses before making any decisions related to payments, compliance, or financial operations.


            </span>

        <p className="text-xl font-semibold text-gray-300 dark:text-white">4. Consequences of Policy Violations




          </p>

          <p className="text-base font-normal text-gray-300 dark:text-gray-400">
          Failure to comply with this Acceptable Use Policy may result in:


        </p> 


         

          <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
            <li>
              <span className="font-normal text-gray-300">
              Account suspension or termination without prior notice.


              </span>

            </li>

            <li>
              <span className="font-normal text-gray-300">
              Blocking access to DomGenie’s AI platform.

            </span>

            </li>

            <li>
              <span className="font-normal text-gray-300">
              Legal action in case of severe violations.

              </span>

          </li>

          </ul>

          <p className="text-base font-normal text-gray-300 dark:text-gray-400">
          DomGenie reserves the right to investigate any suspected misuse and take necessary action.


        </p> 

          


        <p className="text-xl font-semibold text-gray-300 dark:text-white">5. Reporting Violations
        </p>
        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        If you believe someone is misusing DomGenie or violating this policy, please report the issue by contacting support@domgenie.ai.

        </p> 


       



        <p className="text-xl font-semibold text-gray-300 dark:text-white">6. Changes to This Policy

        </p>
        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        We may update this Acceptable Use Policy as needed. Users will be notified of significant changes via our website or email communications.

        </p> 


        

       


      </div>
     
      
    </div>
  </div>


  </div>


  <h2 id="accordion-flush-heading-1">
    <button onClick={handleAccordianClick5} type="button" className="flex items-center justify-between w-full py-5 rtl:text-right  border-b border-gray-500  gap-3 text-4xl text-gray-300 font-thin" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
    <span>
    AI Disclaimer</span>
      <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-flush-body-1" className={`${accordion5?'':'hidden'}`}  aria-labelledby="accordion-flush-heading-1">
    
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 pt-16">
    <div className="mx-auto max-w-5xl">
      
      <div className="mx-auto  space-y-6">
      <p className="text-base font-normal text-gray-200 ">Effective Date: 3rd April 2025
        </p>

        

      

        <p className="text-xl font-semibold text-gray-300 dark:text-white">1. Introduction
        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        DomGenie is an AI-powered platform designed to provide structured insights into the card payments industry, acquiring, issuing, regulatory compliance, ISO 8583, EMV, tokenization, and related domains. While we strive to provide accurate and relevant information, all AI-generated responses should be treated as informational only and not as official financial, legal, or regulatory advice.

        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        By using DomGenie, you acknowledge and agree that:



        </p>

        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
              <li>
                <span className="font-normal text-gray-300">
                AI-generated responses are not a substitute for professional consultation.

                </span>
               </li>

               <li>
                <span className="font-normal text-gray-300">
                DomGenie does not guarantee the accuracy, completeness, or timeliness of AI responses.


                </span>
               </li>

               <li>
                <span className="font-normal text-gray-300">
                Users must verify information independently before making business, compliance, or financial decisions.


                </span>
               </li>

          </ul>


        <p className="text-xl font-semibold text-gray-300 dark:text-white">2. No Financial, Legal, or Compliance Guarantee


        </p>

        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        DomGenie provides insights into payment industry topics based on publicly available sources, expert-verified knowledge, and OpenAI’s API responses. However:

        </p>
        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            AI-generated responses do not constitute financial, legal, regulatory, or tax advice.


            </span>
     
          </li>

          <li>
            <span className="font-normal text-gray-300">
            DomGenie is not responsible for any decisions made based on AI-generated insights.


            </span>

           

          

          </li>

          <li>
            <span className="font-normal text-gray-300">
            Users should consult with certified professionals, regulatory authorities, or financial institutions before taking action based on AI-generated content.



             </span>

           
          

              
        </li>


        
         
        </ul>

       



        <p className="text-xl font-semibold text-gray-300 dark:text-white">3. OpenAI API Usage & AI Limitations




        </p>

         <p className="text-base font-normal text-gray-300 dark:text-gray-400">
         DomGenie uses OpenAI’s API to process user queries and generate responses. This means:

        </p> 


        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
          <li>
            <span className="font-normal text-gray-300">
            OpenAI temporarily stores API interactions for up to 30 days for compliance monitoring but does not use them for AI training.



            </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            AI operates on probabilistic algorithms, meaning responses may be incomplete, incorrect, or misinterpreted in certain cases.


          </span>

          </li>

          <li>
            <span className="font-normal text-gray-300">
            AI-generated responses do not reflect the views of DomGenie, its founders, or any financial institution.


            </span>

        </li>

       
         
        </ul>

        <span className="font-normal text-gray-300">
        For more details on OpenAI’s data handling, refer to <a href="https://openai.com/policies/privacy-policy/">OpenAI’s Privacy Policy.</a>



            </span>

        <p className="text-xl font-semibold text-gray-300 dark:text-white">4. No Liability for AI-Generated Content




          </p>

          <p className="text-base font-normal text-gray-300 dark:text-gray-400">
          DomGenie and its affiliates shall not be held liable for any losses, damages, or liabilities resulting from:



        </p> 


         

          <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
            <li>
              <span className="font-normal text-gray-300">
              Errors or inaccuracies in AI-generated responses.



              </span>

            </li>

            <li>
              <span className="font-normal text-gray-300">
              Regulatory non-compliance, financial losses, or business disruptions caused by reliance on AI insights.


            </span>

            </li>

            <li>
              <span className="font-normal text-gray-300">
              Missed opportunities or incorrect interpretations of AI responses.


              </span>

          </li>

          </ul>

          <p className="text-base font-normal text-gray-300 dark:text-gray-400">
          Users assume full responsibility for verifying AI-generated information before making decisions.


        </p> 

          


        <p className="text-xl font-semibold text-gray-300 dark:text-white">5. AI Response Moderation & Updates

        </p>
        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        While DomGenie continuously refines its AI-powered responses:

        </p> 

        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
            <li>
              <span className="font-normal text-gray-300">
              AI-generated content is subject to updates, and we may revise model accuracy over time.

              </span>

            </li>

            <li>
              <span className="font-normal text-gray-300">
              Users are encouraged to report any incorrect, misleading, or outdated responses to support@domgenie.ai


            </span>

            </li>

            <li>
              <span className="font-normal text-gray-300">
              AI-generated insights should not be used as the sole basis for compliance-related decisions.

              </span>

          </li>

          </ul>


       



        <p className="text-xl font-semibold text-gray-300 dark:text-white">6. Changes to This Disclaimer

        </p>
        <p className="text-base font-normal text-gray-300 dark:text-gray-400">
        DomGenie reserves the right to update or modify this AI Disclaimer in response to:


        </p> 


        <ul className="list-outside list-disc space-y-4 pl-4 text-base font-normal text-gray-500 dark:text-gray-400">
            <li>
              <span className="font-normal text-gray-300">
              Advancements in AI technology or model updates.


              </span>

            </li>

            <li>
              <span className="font-normal text-gray-300">
              Changes in OpenAI’s API policies and data retention practices.


            </span>

            </li>

            <li>
              <span className="font-normal text-gray-300">
              Legal and regulatory requirements affecting AI-generated content.


              </span>

          </li>

          </ul>

          <p className="text-base font-normal text-gray-300 dark:text-gray-400">
          Users will be notified of major updates through our website or email communications.



        </p>


      </div>
     
      
    </div>
  </div>

  </div>





</div>


  
</section>



      </>
    );
  };
  
  export default Policy;
  