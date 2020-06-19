import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { CampaignHeader } from "../styles/CampaignStyles";
import { PaymentContainer } from "../styles/WizardFormContainerStyles";
import { GlobalButton } from "../../../shared/GlobalButton";
import Copy from "../../../assets/images/copy.svg";
import { LoadingIcon } from "../../../shared/LoadingIcon";
import { COINGECKO_API, TASK_ENDPOINT } from "../../../config/api-config";

export const PublisherWizardFormCampaignPayment = ({
  step,
  values,
  drizzle,
  drizzleState,
  setStep,
  transactionId,
  setRespStatus,
}) => {
  // const web3Context = useWeb3(process.env.REACT_APP_INFURA_ROPSTEN)
  // const {networkId, accounts, lib} = web3Context
  // const [wasPaymentSuccessful, setWasPaymentSuccessful] = useState(false)
  const address = drizzle.contracts.CrowdclickEscrow.address;

  // const fetchEthPrice = async() => {
  //   const resp = await axios.get(`${COINGECKO_API}simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`, {withCredentials: false})
  //   setEthPrice(resp)

  // }

  const postCampaign = async () => {
    const {
      projectName,
      projectDescription,
      projectURL,
      pricePerClick,
      campaignBudget,
      projectQuestion,
      projectOptions,
    } = values;

    const filteredProjectOptionsWithoutEmptyStrings = projectOptions.filter(
      (x) => x.option !== ""
    );

    const res = await axios.post(TASK_ENDPOINT, {
      title: projectName,
      description: projectDescription,
      website_link: projectURL,
      reward_per_click: pricePerClick,
      time_duration: "00:00:30",
      spend_daily: campaignBudget,
      questions: [
        {
          title: projectQuestion,
          options: filteredProjectOptionsWithoutEmptyStrings.map((x) => {
            return { title: x.option };
          }),
        },
      ],
    });

    let respStatus = res ? res.status : "failed";
    setRespStatus(respStatus);
    setStep(step + 1);
  };

  useEffect(() => {
    if (step === 5) {
      if (drizzleState.transactionStack.length > 0) {
        const tx = drizzleState.transactionStack[transactionId];

        if (
          drizzleState.transactions[tx] &&
          drizzleState.transactions[tx].status === "success"
        ) {
          postCampaign();
        }
      }
    }
  }, [drizzleState, postCampaign, step, transactionId]); //pass drizzleState to observe the state for changes!

  if (step !== 5) {
    return null;
  } else {
    const copyToClickboard = (txt) => {
      const temporaryInput = document.createElement("input");
      document.body.appendChild(temporaryInput);
      temporaryInput.setAttribute("value", txt);
      temporaryInput.select();
      document.execCommand("copy");
      document.body.removeChild(temporaryInput);
    };

    // if (!ethPrice) {
    //   return <LoadingIcon />
    // }

    return (
      <Fragment>
        <CampaignHeader>
          <h2>You're almost done! Just deposit ETH</h2>
          <p>Here is your total campaign cost</p>
        </CampaignHeader>
        <PaymentContainer>
          <p>Send ETH to your campaign contract:</p>
          <div className="addressContainer">
            <div>{address}</div>
            <button onClick={() => copyToClickboard(address)}>
              <img src={Copy} alt="copy" />
            </button>
          </div>
          <div className="paymentButtonContainer">
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
        </PaymentContainer>
      </Fragment>
    );
  }
};
