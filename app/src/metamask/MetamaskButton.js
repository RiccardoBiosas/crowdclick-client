import React, { useState, Fragment } from "react";
import Web3 from "web3";
import Web3Utils from "web3-utils";
import { useDispatch } from "react-redux";
import axios from "axios";
import  StyledGlobalButton from "../shared/styles/StyledGlobalButton";
import { AUTH_ENDPOINT } from "../config/api-config";
import { createPortal } from "react-dom";
import { MetamaskModal } from "./MetamaskModal";
import { navAuthTrueAction } from "../redux/NavAuth/navAuthActions";

axios.defaults.withCredentials = true;

const modalRoot = document.getElementById("portal-root");

const MetamaskButton = (props) => {
  const { btnColor, btnWidth, btnText } = props;
  const [showModal, setShowModal] = useState();
  const dispatch = useDispatch()

  const checkMetamask = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      try {
        await window.ethereum.enable();
      } catch (error) {}
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      setShowModal(true);
    }

    const resp = await axios.get(AUTH_ENDPOINT);
    const nonce = resp.data.nonce
      ? resp.data.nonce
      : null;
    const coinbase = await window.web3.eth.getCoinbase(console.log);

    if(!nonce) {
      const isAlreadyAuth = resp.data.is_authenticated
      if(isAlreadyAuth) {
        window.localStorage.setItem("userPubKey", `"${coinbase}"`);
        dispatch(navAuthTrueAction);

      } else {
        window.localStorage.removeItem("userPubKey")
      }

       
    } else {
      const sig = await window.web3.eth.sign(
        // Web3Utils.sha3(nonce.data.nonce),
        Web3Utils.sha3(nonce),
        coinbase,
        console.log
      );
  
      const response = await axios.post(AUTH_ENDPOINT, {
        user_address: coinbase,
        user_signature: sig,
      });
  
  
      if (response.data.is_authenticated === true) {
        dispatch(navAuthTrueAction);
        window.localStorage.setItem("userPubKey", `"${coinbase}"`);
        if (props.cb_login) {
          props.cb_login();
        }
      } else {
        window.localStorage.removeItem("userPubKey")

      }
  
    }
   

  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Fragment>
      {showModal &&
        createPortal(
          <MetamaskModal closeModalCallback={closeModal} />,
          modalRoot
        )}
      <StyledGlobalButton
        buttonColor={btnColor}
        buttonTextColor={"#FFFFFF"}
        buttonWidth={btnWidth}
        onClick={checkMetamask}
      >
        {btnText}
      </StyledGlobalButton>
    </Fragment>
  );
};

MetamaskButton.defaultProps = {
  btnText: "connect"
}

export default MetamaskButton

