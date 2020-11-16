// theirs
import React, {useState} from "react";
import VizSensor from "react-visibility-sensor";
import { Spring } from "react-spring/renderprops";
import { useHistory } from "react-router-dom";
// styles
import  StyledGeneralButton  from "../../../shared/styles/StyledGeneralButton";
import {
  StyledImgWrapper,
  StyledCardMainHeading,
  StyledCardLayout,
  StyledCardsParagraph,
  StyledCenteredColumnWithMediaQueries,
  
} from "../styles/HomepageStyles";
// assets
import default_landing_double_image from "../../../assets/homepage/img1.svg";
import aeternity_landing_img from "../../../assets/images/aeternity_landing-page.svg";
// constants
import {
  REGISTER_FALLBACK_ROUTE,
  PUBLISHER_WIZARD_ROUTE,
  USER_TASKS_LIST_ROUTE,
} from "../../../config/routes-config";
import { SCOPED_LOCAL_STORAGE_USER_PUBLIC_KEY } from "../../../utils/blockchain/constants";

export const HomepageDoubleCard = ({ currencyTheme }) => {
  const [isVizSensorActive, setIsVizSensorActive] = useState(true)
  const [visibilityCount, setVisibilityCount] = useState(0)
  const history = useHistory();

  const handleVisibility = (isVisible) => {
    if(isVisible < 1) {
      setVisibilityCount(visibilityCount+1)
    }
    if(visibilityCount >= 1) {
      setIsVizSensorActive(false)
      
    }
  }

  const handleRedirect = (redirectRoute) => {
    if (!window.localStorage.getItem(SCOPED_LOCAL_STORAGE_USER_PUBLIC_KEY)) {
      history.push({
        pathname: REGISTER_FALLBACK_ROUTE,
        state: { next_redirect: redirectRoute },
      });
    } else {
      if (redirectRoute === "publisher") {
        history.push(PUBLISHER_WIZARD_ROUTE);
      }
      if (redirectRoute === "user") {
        history.push(USER_TASKS_LIST_ROUTE);
      }
    }
  };
  return (
    <VizSensor active={isVizSensorActive} partialVisibility={true} onChange={handleVisibility}>
      {({ isVisible  }) => (
        <StyledCardLayout>
          <Spring
            from={{
              left: !isVisible ? "80%" : "0%",
              opacity: !isVisible ? 0 : 1,
              position: "relative",
              width: "100%",
            }}
            to={{
              left: isVisible ? "0%" : "80%",
              height: "0%",
              opacity: isVisible ? 1 : 0,
            }}
            config={{ duration: 800 }}
          >
            {(props) => (
              <div style={props}>
                <StyledCenteredColumnWithMediaQueries>
                  <StyledCardMainHeading type={"break-paragraph"} mainHeadline={40}>
                    Click. Answer. Earn.
                  </StyledCardMainHeading>
                  <StyledCardsParagraph>
                    Go on interesting sites, click to answer
                    {currencyTheme === "ethereumStyle"
                      ? " & earn ETH"
                      : " & earn AE"}
                  </StyledCardsParagraph>
                  <div>
                    <StyledGeneralButton
                      onClick={() => handleRedirect("user")}
                      buttonWidth="135"
                      buttonMargin="30px 0 30px 0"
                      buttonColor={
                        currencyTheme === "ethereumStyle" ? "green" : "purple"
                      }
                      buttonTextColor={"#FFFFFF"}
                    >
                      {currencyTheme === "ethereumStyle"
                        ? "Earn ETH"
                        : "Earn AE"}
                    </StyledGeneralButton>
                  </div>
                </StyledCenteredColumnWithMediaQueries>
                <StyledCenteredColumnWithMediaQueries containerMargin="0 0 48px 0">
                  <StyledCardMainHeading type={"break-paragraph"} mainHeadline={40}>
                    Traffic. Feedback. Grow.
                  </StyledCardMainHeading>
                  <StyledCardsParagraph>Publish your site, set a reward and ask a question.</StyledCardsParagraph>
                  <StyledCardsParagraph>Get traffic and first impression feedback.</StyledCardsParagraph>
                  <div>
                    <StyledGeneralButton
                      onClick={() => handleRedirect("publisher")}
                      buttonWidth="135"
                      buttonMargin="30px 0 0 0"
                      buttonColor={
                        currencyTheme === "ethereumStyle" ? "blue" : "darkBlue"
                      }
                      buttonTextColor={"#FFFFFF"}
                    >
                      Get answers
                    </StyledGeneralButton>
                  </div>
                </StyledCenteredColumnWithMediaQueries>
              </div>
            )}
          </Spring>
          <StyledImgWrapper type={"double-card"}>
            <img
              src={
                currencyTheme === "ethereumStyle"
                  ? default_landing_double_image
                  : aeternity_landing_img
              }
              className="double-card-img"
              alt="landing_image"
            />
          </StyledImgWrapper>
        </StyledCardLayout>
      )}
    </VizSensor>
  );
};
