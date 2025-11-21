import { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  /* useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []); */

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookieConsent');
      if (!consent) {
        setShowBanner(true);
      }
    }
  }, []);

  /* const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  }; */

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookieConsent', 'true');
      setShowBanner(false);
    }
  };

  const handleReject = () => {
    if (typeof window !== 'undefined') {
      //localStorage.setItem('cookieConsent', 'true');
      setShowBanner(false);
    }
  };
  

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 text-center z-50">
  <div className="flex flex-col md:flex-row items-center justify-center gap-4">
    <p className="mb-0">We use cookies to improve your experience. By using our site, you agree to our cookie policy.</p>
    <button
      onClick={handleAccept}
      className="bg-[#6f551e] hover:bg-blue-600 text-white px-4 py-2 rounded"
    >
      Accept Cookies
    </button>

    <button
      onClick={handleReject}
      className="bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded"
    >
      Reject Cookies
    </button>
  </div>
</div>

  );
};

export default CookieConsent;
