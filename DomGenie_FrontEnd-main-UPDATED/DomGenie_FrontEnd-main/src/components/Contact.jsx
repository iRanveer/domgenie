
const Contact = () => {
    return (
      <>
    
    <section className="text-gray-600 body-font relative bg-gray-800 mt-8" style={{
    background: "linear-gradient(to bottom, #111827 10%, #6f551e 100%, #111827 80%)",
    height: "auto",
    
  }}>
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-300">Contact Us</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-normal text-gray-300">We’d love to hear from you! Whether you have questions about our AI-powered platform, need support, or want to explore collaboration opportunities, feel free to reach out.
      </p>
    </div>
    <div className="lg:w-1/2 md:w-2/3 mx-auto ">
      <div className="flex flex-wrap -m-2">
        

      <div className=" relative flex flex-wrap py-6 rounded shadow-md border border-gray-200 ">
        <div className="lg:w-1/2 px-6 text-gray-400">
          <h2 className="title-font font-semibold text-gray-200 tracking-widest text-xs ">ADDRESS</h2>
          <p className="mt-1">FDBC3120, Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, P.O. Box No. 10055</p>
        </div>
        <div className="lg:w-1/2 px-6 mt-4 lg:mt-0 text-gray-300">
          <h2 className="title-font font-semibold text-gray-200 tracking-widest text-xs">EMAIL</h2>
          <a className="text-gray-400 leading-relaxed">support@domgenie.ai</a>

          <h2 className="title-font font-semibold text-gray-200 tracking-widest text-xs">EMAIL</h2>
          <a className="text-gray-400 leading-relaxed">www.domgenie.ai</a>

          {/* <h2 className="title-font font-semibold text-gray-200 tracking-widest text-xs mt-4">PHONE</h2>
          <p className="leading-relaxed text-gray-400">123-456-7890</p> */}
        </div>

      

      </div>


        

      



        <div className="p-2 w-full text-left text-gray-300 mt-8">
        <p>For inquiries related to subscriptions, training, or AI responses, please mention your request in detail so we can assist you better.
        </p>

        <p>We aim to respond to all queries within 24-48 business hours.

        </p>
          
        </div>

        
      </div>
    </div>
  </div>
</section>






      </>
    );
  };
  
  export default Contact;
  