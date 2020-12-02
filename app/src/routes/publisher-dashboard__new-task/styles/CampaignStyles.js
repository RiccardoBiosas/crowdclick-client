import styled from "styled-components";
import crowdclick_logo from "../../../assets/images/miniLogo.png";
import crowdclick_campaign_placeholder from "../../../assets/userTasksConsole/SocialMediaPlaceholder.png";

export const StyledPublisherCampaignTaskSummaryLayout = styled.div`
  width: 60vw;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: ${(props) =>
    props.campaignToggle ? "21px 21px 0px 0px" : "21px"};
  display: grid;
  grid-template-columns: 300px 2fr 0.2fr;
  .campaignAvatar {
    background-image: url(${(props) =>
      props.og_background
        ? `"${props.og_background}"`
        : crowdclick_campaign_placeholder});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: ${(props) =>
      props.campaignToggle ? "21px 0px 0px 0px" : "21px 0px 0px 21px"};
    max-height: 100%;
  }

  .nextCampaignLogo {
    background-image: url(${crowdclick_logo});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: ${(props) =>
      props.campaignToggle ? "21px 0px 0px 0px" : "21px 0px 0px 21px"};
  }
`;

export const StyledPublisherCampaignGeneralTaskLayout = styled.div`
  margin-bottom: 20px;

  .taskAnalyticsContainer {
    margin-top: 0.5-px;
    width: 60vw;
    display: grid;
    grid-template-columns: 2fr 6fr;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 0px 0px 21px 21px;
    padding-bottom: 20px;
  }

  .answersContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .viewsContainer {
    // margin-left: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
   
  }
`;

export const StyledPercentageBarItem = styled.div`
  width: 60%;
  border-radius: 8px;
  background-color: grey;
  height: 14px;

  .itemPercentage {
    width: ${({percentage}) => Math.round(percentage)}%;
    background-color: #206dff;
    border-radius: 8px;
    height: 14px;
  }
`;
