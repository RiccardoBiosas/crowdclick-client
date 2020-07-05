import React from "react";
import { PublisherCampaignTaskSummaryLayout } from "../../publisher-dashboard__new-task/styles/CampaignStyles";
import { useRedirectWithProps } from "../../../hooks/useRedirectWithProps";
import { PUBLISHER_WIZARD_ROUTE } from "../../../config/routes-config";

export const PublisherDashboardNextCampaign = () => {
  return (
    <PublisherCampaignTaskSummaryLayout style={{ marginBottom: "20px" }}>
      <div className="nextCampaignLogo" />
      <div style={{marginLeft: "34px"}}>
        <h2>My next campaign</h2>
        <p>Description of the campaign</p>
        <div>
          {useRedirectWithProps(
            `${PUBLISHER_WIZARD_ROUTE}`,
            "blue",
            "My Next Campaign"
          )}
        </div>
      </div>
    </PublisherCampaignTaskSummaryLayout>
  );
};
