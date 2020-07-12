import React from "react";
import { TASK_ENDPOINT, DASHBOARD_ENDPOINT } from "../../../config/api-config";
import { Temporary__PublisherDashboardCampaignTask } from "../screen/PublisherDashboardCampaignTask";
import { PublisherDashboardNextCampaign } from "../screen/PublisherDashboardNextCampaign";
import { useFetch } from "../../../hooks/useFetch";
import  LoadingIcon  from "../../../shared/components/loadingIcons/LoadingIcon";
import { PublisherDashboardCampaignTaskBoilerplate } from "../screen/PublisherDashboardCampaignTaskBoilerplate";
import StyledGeneralCardLayout from "../../../shared/styles/StyledGeneralCardLayout";

export const PublisherDashboardContainer = () => {
  const res = useFetch(TASK_ENDPOINT);
  // const dashboard_res = useFetch(DASHBOARD_ENDPOINT);

  // const specific_res = useFetch(`${TASK_ENDPOINT}${JSON.parse(window.localStorage.getItem('userPubKey'))}`)

  if (!res.response) {
    return <LoadingIcon />;
  } else {
    const userCampaigns = res.response.data.results.filter(
      (x) =>
        x.user.username ===
        JSON.parse(window.localStorage.getItem("userPubKey"))
    );

    if (userCampaigns.length === 0) {
      return <PublisherDashboardCampaignTaskBoilerplate />;
    } else {
      return (
        <StyledGeneralCardLayout style={{ marginTop: "80px" }}>
          <PublisherDashboardNextCampaign />

          {userCampaigns.map((x, i) => (
            <Temporary__PublisherDashboardCampaignTask
              key={`campaignTask${i}`}
              campaignID={`Campaign ${i + 1}`}
              taskID={x.id}
              title={x.title}
              campaignDescription={x.description}
              og_image={x.og_image_link}
            />
          ))}
        </StyledGeneralCardLayout>
      );
    }
  }
};
