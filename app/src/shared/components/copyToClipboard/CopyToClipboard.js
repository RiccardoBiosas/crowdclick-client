import React from 'react'
import { toast, ToastContainer, Slide } from 'react-toastify'
import Copy from '../../assets/images/copy.svg'

const CopyToClipboard = ({
  condition,
  contentToCopy,
  successTxt,
  failureTxt
}) => {
  const copyToClipboard = () => {
    const temporaryInput = document.createElement('input')
    document.body.appendChild(temporaryInput)
    temporaryInput.setAttribute('value', contentToCopy)
    temporaryInput.select()
    document.execCommand('copy')
    document.body.removeChild(temporaryInput)
  }

  return (
    <>
      <span>
        <img
          onClick={copyToClipboard}
          src={Copy}
          alt='copy to clipboard button'
        />
      </span>
      <ToastContainer
        position='top-center'
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
  )
}

export default CopyToClipboard
