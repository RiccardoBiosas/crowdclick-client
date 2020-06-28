import React, { Fragment } from "react";
import PackmanLoader from "react-spinners/PacmanLoader";
import { ROPSTEN_ETHERSCAN_TX } from "../../../config/api-config";
import { CampaignHeader } from "../styles/CampaignStyles";
import metamaskLogo from "../../../assets/wallet-logos/metamask-logo.svg";
import { GlobalButton } from "../../../shared/GlobalButton";
import Copy from "../../../assets/images/copy.svg";
import CopyToClipboard from "../../../shared/copyToClipboard/CopyToClipboard";

export const PublisherWizardFormCampaignPayment = ({
  step,
  address,
  transactionID,
}) => {
  // console.log("TRANSACTION ID CAMPAIGN PAYMENT", transactionID);

  if (step !== 5) {
    return null;
  } else {
    const copyToClickboard = (txt) => {
      console.log("COPY CLIPBPARD FUNCTION");
      const temporaryInput = document.createElement("input");
      document.body.appendChild(temporaryInput);
      temporaryInput.setAttribute("value", txt);
      temporaryInput.select();
      document.execCommand("copy");
      document.body.removeChild(temporaryInput);
    };

    // if (!transactionID) {
    return (
      <Fragment>
        <CampaignHeader>
          <h2>You're almost done! Just deposit ETH</h2>
          <p>Here is your total campaign cost</p>
        </CampaignHeader>
        <div
          style={{
            height: "90%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>The ETH will be deposited on:</p>
          <div style={{ display: "flex" }}>
            <div
              style={{
                border: "1px solid #E2E5ED",
                height: "38px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {address}
            </div>
            {/* <CopyToClipboard condition={true} contentToCopy={address} successTxt={"address copied!"} failureTxt={"nothing was copied!"} /> */}
            <button
              style={{
                background: "none",
                outline: "none",
                border: "none",
                marginLeft: "6px",
              }}
              type="button"
              onClick={() => copyToClickboard(address)}
            >
              <img src={Copy} alt="copy" />
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            {!transactionID ? (
              <>
                {" "}
                <div>
                  <img
                    style={{ width: "120px" }}
                    src={metamaskLogo}
                    alt="wallet-logo"
                  />
                </div>
                <div>
                  <GlobalButton
                    type="submit"
                    buttonColor={"orange"}
                    buttonMargin={"34px 0px 0px 0px"}
                    buttonTextColor={"#FFFFFF"}
                    buttonWidth={280}
                    // onClick={openTask}
                  >
                    Pay with Metamask
                  </GlobalButton>
                </div>
              </>
            ) : (
              <>
                <div style={{ height: "100px" }}>
                  <PackmanLoader color="#206DFF" size={30} />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontWeight: 900, color: "#9ea0a5" }}>
                    Check your transaction on etherscan:
                  </p>
                  <div>
                    <a
                      href={`${ROPSTEN_ETHERSCAN_TX}${transactionID}`}
                      style={{ color: "#9ea0a5" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {transactionID}
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Fragment>
    );
    // } else {
    //   return (
    //     <Fragment>
    //       <CampaignHeader>
    //         <h2>You're almost done! Just deposit ETH</h2>
    //         <p>Here is your total campaign cost</p>
    //       </CampaignHeader>
    //       <div>
    //         <p>The ETH will be deposited on:</p>
    //         <div style={{ display: "flex" }}>
    //           <div>{address}</div>
    //           {/* <CopyToClipboard condition={true} contentToCopy={address} successTxt={"address copied!"} failureTxt={"nothing was copied!"} /> */}
    //           <button type="button" onClick={() => copyToClickboard(address)}>
    //             <img src={Copy} alt="copy" />
    //           </button>
    //         </div>
    //         <div
    //           style={{
    //             display: "flex",
    //             flexDirection: "column",
    //             alignItems: "center",
    //             justifyContent: "center",
    //           }}
    //         ></div>
    //       </div>
    //     </Fragment>
    //   );
    // }
  }
};
