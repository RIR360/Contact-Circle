import React, { useState, useEffect } from 'react';

const Toast = ({ type = "success", message, showToast, setShowToast }) => {

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (showToast) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setShowToast(false);
      }, 5 * 1000); // X seconds
    }
  }, [showToast, setShowToast]);

  return (
    <div>
      {show && (
        <div className="fixed z-40 bottom-10 right-5 bg-light-800 shadow-xl">

          {type === "error" ?
            <div className="bg-red-600 text-white px-4 py-2 rounded-t-md">
              <i className="fa fa-close"></i> 
              <span>Error Encountered!</span>
            </div>
          : 
            <div className="bg-green-600 text-white px-4 py-2 rounded-t-md">
              <i className="fa fa-circle-info"></i> 
              <span>Success Alert!</span>
            </div>
          }

          <div className="p-4 rounded-b-md">
            {message}
          </div>
        </div>
      )}
    </div>
  );

};

export default Toast;