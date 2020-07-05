import React, { useState } from "react";
import { animated, useTransition } from "react-spring";
import { useHistory } from "react-router-dom";
import {
  PublisherCampaignTaskSummaryLayout,
  PublisherCampaignGeneralTaskLayout,
  PercentageBarItem,
} from "../../publisher-dashboard__new-task/styles/CampaignStyles";
import  StyledGlobalButton  from "../../../shared/styles/StyledGlobalButton";
import { isWhatPercentage } from "../../../utils/isWhatPercentage";
import { PUBLISHER_WIZARD_EDIT_ROUTE_WITH_PARAM } from "../../../config/routes-config";

export const PublisherDashboardCampaignTask = ({
  campaignID,
  campaignDescription,
  weeklyViews,
  surveyData,
}) => {
  const [campaignState, setCampaignState] = useState(false);

  const transitions = useTransition(campaignState, null, {
    from: { opacity: 0, transform: "translateY(-20%)" },
    enter: { opacity: 1, transform: "translateY(0%)" },
    leave: { opacity: 0, transform: "translateY(-20%)" },
    config: {
      duration: 400,
    },
  });

  return (
    <PublisherCampaignGeneralTaskLayout>
      <PublisherCampaignTaskSummaryLayout campaignToggle={campaignState}>
        <div className="campaignAvatar" />
        <div style={{ marginLeft: "34px" }}>
          <h2>{campaignID}</h2>
          <p>{campaignDescription}</p>
          <div>
            {/* <button>Edit Campaign</button>
            <button>Results</button> */}
            <StyledGlobalButton
              buttonColor={"blue"}
              buttonMargin={"0px 20px 20px 0px"}
              buttonTextColor={"#FFFFFF"}
              buttonWidth={200}
            >
              Edit Campaign
            </StyledGlobalButton>
            <StyledGlobalButton
              buttonColor={"transparent"}
              buttonMargin={"0px 0px 20px 0px"}
              buttonTextColor={"#206DFF"}
              buttonWidth={200}
              onClick={() => setCampaignState(!campaignState)}
            >
              {!campaignState && "Show results"}{" "}
              {campaignState && "Hide results"}
            </StyledGlobalButton>
          </div>
        </div>
      </PublisherCampaignTaskSummaryLayout>

      {transitions.map(({ item, key, props }) => {
        return (
          item && (
            <animated.div
              style={{ ...props }}
              className="taskAnalyticsContainer"
              key={key}
            >
              <div className="viewsContainer">
                <h2>Weekly results</h2>
                <h4>Views: {weeklyViews}</h4>
              </div>
              <div>
                <h2>Survey results</h2>
                <div className="answersContainer">
                  {Object.keys(surveyData).map((x) => {
                    let currentPercentage = isWhatPercentage(
                      surveyData[x],
                      weeklyViews
                    );
                    return (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "60%",
                          }}
                        >
                          <p>
                            {x}: {surveyData[x]}
                          </p>
                          <p>{currentPercentage}%</p>
                        </div>

                        <PercentageBarItem percentage={currentPercentage}>
                          <div className="itemPercentage" />
                        </PercentageBarItem>
                      </div>
                    );
                  })}
                </div>
              </div>
            </animated.div>
          )
        );
      })}
    </PublisherCampaignGeneralTaskLayout>
  );
};

const temporary__TaskAnalyticsStyle = {
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "0px 3px 6px #00000029",
  borderRadius: "0px 0px 21px 21px",
  paddingBottom: "20px",
  width: "60vw",
};

export const Temporary__PublisherDashboardCampaignTask = ({
  campaignID,
  taskID,
  title,
  campaignDescription,
  og_image,
}) => {
  const history = useHistory();
  const [campaignState, setCampaignState] = useState(false);
  const isPlaceholderNeeded =
    RegExp("foo", "g").test(og_image) ||
    RegExp("placeholder", "g").test(og_image);

  const transitions = useTransition(campaignState, null, {
    from: { opacity: 0, transform: "translateY(-20%)" },
    enter: { opacity: 1, transform: "translateY(0%)" },
    leave: { opacity: 0, transform: "translateY(-20%)" },
    config: {
      duration: 400,
    },
  });

  return (
    <PublisherCampaignGeneralTaskLayout>
      <PublisherCampaignTaskSummaryLayout
        og_background={!isPlaceholderNeeded ? og_image : ""}
        campaignToggle={campaignState}
      >
        <div className="campaignAvatar" />
        <div style={{ marginLeft: "34px" }}>
          {/* <h2>{campaignID}</h2> */}
          <h2>{title}</h2>
          <p>{campaignDescription}</p>
          <div>
            {/* <button>Edit Campaign</button>
            <button>Results</button> */}
            <StyledGlobalButton
              buttonColor={"blue"}
              buttonMargin={"0px 20px 20px 0px"}
              buttonTextColor={"#FFFFFF"}
              buttonWidth={200}
              onClick={() =>
                history.push(
                  `${PUBLISHER_WIZARD_EDIT_ROUTE_WITH_PARAM}${taskID}`
                )
              }
            >
              Edit Campaign
            </StyledGlobalButton>
            <StyledGlobalButton
              buttonColor={"transparent"}
              buttonMargin={"0px 0px 20px 0px"}
              buttonTextColor={"#206DFF"}
              buttonWidth={200}
              onClick={() => setCampaignState(!campaignState)}
            >
              {!campaignState && "Show results"}{" "}
              {campaignState && "Hide results"}
            </StyledGlobalButton>
          </div>
        </div>
      </PublisherCampaignTaskSummaryLayout>

      {transitions.map(({ item, key, props }) => {
        return (
          item && (
            <animated.div
              style={{ ...props, ...temporary__TaskAnalyticsStyle }}
              key={key}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <h2>Data Analytics Coming Soon</h2>
              </div>
            </animated.div>
          )
        );
      })}
    </PublisherCampaignGeneralTaskLayout>
  );
};
