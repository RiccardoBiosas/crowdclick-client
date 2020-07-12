import React from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import Copy from "../../assets/images/copy.svg";

const CopyToClipboard = ({
  condition,
  contentToCopy,
  successTxt,
  failureTxt,
}) => {
    const copyToClipboard = () => {
        console.log('CONTENT TO COPY', contentToCopy);
    
        if (condition) {
          const temporaryInput = document.createElement('input');
          document.body.appendChild(temporaryInput);
          temporaryInput.setAttribute('value', contentToCopy);
          temporaryInput.select();
          document.execCommand('copy');
          document.body.removeChild(temporaryInput);
          toast.success(successTxt, {
            position: 'top-center',
            transition: Slide,
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.warn(failureTxt, {
            position: 'top-center',
            transition: Slide,
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      };


  return (
    <>
      <span>
        <img
          onClick={copyToClipboard}
          src={Copy}
          alt="copy to clipboard button"
        />
      </span>
      <ToastContainer
        position="top-center"
        transition={Slide}
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default CopyToClipboard;
