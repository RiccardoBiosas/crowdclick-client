import React from "react";
import {useHistory} from 'react-router-dom'
import StyledGeneralCardLayout from "../../../shared/styles/StyledGeneralCardLayout";
import StyledGeneralCardWrapper from "../../../shared/styles/StyledGeneralCardWrapper";
import { ReactComponent as MetamaskIcon } from "../../../assets/no-metamask/metamask_small_icon.svg";
import StyledGlobalButton from "../../../shared/styles/StyledGlobalButton";
import StyledGeneralParagraph from "../../../shared/styles/StyledGeneralParagraph";
import { HOME_ROUTE } from "../../../config/routes-config";

const InstallMetamaskWarning = () => {
    const history = useHistory();
  return (
    <StyledGeneralCardLayout>
      <div style={{ display: "flex", alignItems: "center" }}>
        <MetamaskIcon />

        <h1 style={{ marginLeft: "18px" }}>
          <span style={{ color: "#F1853B" }}>MetaMask</span> extension needed
        </h1>
      </div>
      <StyledGeneralCardWrapper cardJustify="space-around">
        <div>
          <StyledGeneralParagraph
            paragraphColor="#000000"
            paragraphFontSize="20px"
          >
            To be a user please{" "}
            <a
              style={{ color: "#F1853B" }}
              href="https://metamask.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              install
            </a>{" "}
            Metamask browser extension to continue.
          </StyledGeneralParagraph>
        </div>
        <div>
          <StyledGeneralParagraph
            paragraphColor="#000000"
            paragraphFontSize="20px"
          >
            Our Web 3.0 application doesn’t collect any user data and is
            completely safe to protect your identity
          </StyledGeneralParagraph>
        </div>
        <div>
          <StyledGeneralParagraph
            paragraphColor="#000000"
            paragraphFontSize="20px"
          >
            MetaMask is compatible with Chrome, Brave & Firefox
          </StyledGeneralParagraph>
        </div>
        <div>
          <StyledGlobalButton
          type="button"
            buttonColor="blue"
            buttonTextColor="white"
            buttonWidth="180"
            onClick={() => history.push(HOME_ROUTE)}
          >
            Close
          </StyledGlobalButton>
        </div>
      </StyledGeneralCardWrapper>
    </StyledGeneralCardLayout>
  );
};

export default InstallMetamaskWarning;
