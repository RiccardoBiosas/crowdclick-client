import React, { useState } from "react";
import { animated, useTransition } from "react-spring";
import { useHistory } from "react-router-dom";
import {
  StyledPublisherCampaignTaskSummaryLayout,
  StyledPublisherCampaignGeneralTaskLayout,
  StyledPercentageBarItem,
} from "../../publisher-dashboard__new-task/styles/CampaignStyles";
import  StyledGeneralButton  from "../../../shared/styles/StyledGeneralButton";
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
    <StyledPublisherCampaignGeneralTaskLayout>
      <StyledPublisherCampaignTaskSummaryLayout campaignToggle={campaignState}>
        <div className="campaignAvatar" />
        <div style={{ marginLeft: "34px" }}>
          <h2>{campaignID}</h2>
          <p>{campaignDescription}</p>
          <div>
            {/* <button>Edit Campaign</button>
            <button>Results</button> */}
            <StyledGeneralButton
              buttonColor={"blue"}
              buttonMargin={"0px 20px 20px 0px"}
              buttonTextColor={"#FFFFFF"}
              buttonWidth={200}
            >
              Edit Campaign
            </StyledGeneralButton>
            <StyledGeneralButton
              buttonColor={"transparent"}
              buttonMargin={"0px 0px 20px 0px"}
              buttonTextColor={"#206DFF"}
              buttonWidth={200}
              onClick={() => setCampaignState(!campaignState)}
            >
              {!campaignState && "Show results"}{" "}
              {campaignState && "Hide results"}
            </StyledGeneralButton>
          </div>
        </div>
      </StyledPublisherCampaignTaskSummaryLayout>

      {transitions.map(({ item, key, props }) => {
        return (
          item && (
            <animated.div
              style={{ ...props }}
              className="taskAnalyticsContainer"
              key={key}
            >
              <div className="viewsContainer">
                <h2>Total count</h2>
                <h3>{weeklyViews}</h3>
              </div>
              <div>
                <h2>Survey results:</h2>
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

                        <StyledPercentageBarItem percentage={currentPercentage}>
                          <div className="itemPercentage" />
                        </StyledPercentageBarItem>
                      </div>
                    );
                  })}
                </div>
              </div>
            </animated.div>
          )
        );
      })}
    </StyledPublisherCampaignGeneralTaskLayout>
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
  dashboardData
}) => {
  const history = useHistory();
  const [campaignState, setCampaignState] = useState(false);
  const answersCount = dashboardData.find(x => x.id === taskID).answers_result_count
  const answers = dashboardData.find(x => x.id === taskID).answers


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
    <StyledPublisherCampaignGeneralTaskLayout>
      <StyledPublisherCampaignTaskSummaryLayout
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
            <StyledGeneralButton
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
            </StyledGeneralButton>
            <StyledGeneralButton
              buttonColor={"transparent"}
              buttonMargin={"0px 0px 20px 0px"}
              buttonTextColor={"#206DFF"}
              buttonWidth={200}
              onClick={() => setCampaignState(!campaignState)}
            >
              {!campaignState && "Show results"}{" "}
              {campaignState && "Hide results"}
            </StyledGeneralButton>
          </div>
        </div>
      </StyledPublisherCampaignTaskSummaryLayout>

      {transitions.map(({ item, key, props }) => {
        return (
          item && (
            <animated.div
            style={{ ...props }}
            className="taskAnalyticsContainer"
            key={key}
          >
            { answers.length > 0 ? 
            (<>
            <div className="viewsContainer">
              <h2>Total Count:</h2>
              <h3>{answersCount}</h3>
            </div>
            <div>
              <h2>Survey results:</h2>
              <div className="answersContainer">
                {answers.map((x) => {
                  let currentPercentage = isWhatPercentage(
                    x.selected_options[0].answer_count,
                    answersCount
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
                          {x.selected_options[0].title}
                        </p>
                        <p>{currentPercentage}%</p>
                      </div>

                      <StyledPercentageBarItem percentage={currentPercentage}>
                        <div className="itemPercentage" />
                      </StyledPercentageBarItem>
                    </div>
                  );
                })}
              </div>
            </div> </>) : <>no data</>}
          </animated.div>
          )
        );
      })}
    </StyledPublisherCampaignGeneralTaskLayout>
  );
};
