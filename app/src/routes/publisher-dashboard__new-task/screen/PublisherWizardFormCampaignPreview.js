import React, { Fragment } from "react";
import { CampaignHeader } from "../styles/CampaignStyles";
import { WizardPreviewLayout } from "../styles/WizardFormStyles";
import { useFetch } from "../../../hooks/useFetch";
import { LoadingIcon } from "../../../shared/LoadingIcon";
import { COINGECKO_API } from "../../../config/api-config";

export const PublisherWizardFormCampaignPreview = ({
  step,
  values
}) => {
  const resp = useFetch(
    `${COINGECKO_API}simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`,
    { withCredentials: false }
  );
  const currentDate = new Date();

  if (step !== 4) {
    return null;
  } else {
    const {
      projectName,
      projectDescription,
      projectURL,
      pricePerClick,
      campaignBudget,
      projectQuestion,
      projectOptions,
    } = values;

    if (!resp.response) {
      return <LoadingIcon />;
    }
    return (
      <Fragment>
        <CampaignHeader>
          <h2>Your Campaign Preview</h2>
        </CampaignHeader>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WizardPreviewLayout>
            <div>
              <div className="valuesContainer">
                <h4>Project name</h4>
                <p>{projectName}</p>
              </div>
              <div className="valuesContainer">
                <h4>Project description</h4>
                <p>{projectDescription}</p>
              </div>
              <div className="valuesContainer">
                <h4>Project URL</h4>
                <p>{projectURL}</p>
              </div>
            </div>

            <div>
              <div className="valuesContainer">
                <h4>Reward per click</h4>
                <p>USD: {pricePerClick}$</p>
                <p>ETH: {pricePerClick / resp.response.data.ethereum.usd} </p>
                <span style={{ fontSize: "10px" }}>
                  converted at {currentDate.toLocaleString()}
                </span>
              </div>
              <div className="valuesContainer">
                <h4>Budget</h4>
                <p>{campaignBudget}$</p>
                <p>ETH {campaignBudget / resp.response.data.ethereum.usd} </p>
                <span style={{ fontSize: "10px" }}>
                  converted at {currentDate.toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <div className="valuesContainer">
                <h4>Question</h4>
                <p>{projectQuestion}</p>
              </div>
              <div className="valuesContainer">
                <h4>Answers</h4>
                {projectOptions.map((x, i) => (
                  <p key={`optionsPreview${i}`}>
                    {i + 1}) {x.option}
                  </p>
                ))}
              </div>
            </div>
          </WizardPreviewLayout>
        </div>
      </Fragment>
    );
  }
};
