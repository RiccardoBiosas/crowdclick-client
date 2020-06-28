import React, {useState} from "react";
import VizSensor from "react-visibility-sensor";
import default_landing_double_image from "../../../assets/homepage/img1.svg";
import aeternity_landing_img from "../../../assets/images/aeternity_landing-page.svg";
import { GlobalButton } from "../../../shared/GlobalButton";

import {
  ImgWrapper,
  CardMainHeading,
  CardLayout,
  CardsParagraph,
  CenteredColumnWithMediaQueries,
  
} from "../styles/HomepageStyles";
import { Spring } from "react-spring/renderprops";
import { useHistory } from "react-router-dom";
import {
  REGISTER_FALLBACK_ROUTE,
  PUBLISHER_WIZARD_ROUTE,
  USER_TASKS_LIST_ROUTE,
} from "../../../config/routes-config";

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
    if (!window.localStorage.getItem("userPubKey")) {
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
        <CardLayout>
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
                <CenteredColumnWithMediaQueries>
                  <CardMainHeading type={"break-paragraph"} mainHeadline={40}>
                    Click. Answer. Earn.
                  </CardMainHeading>
                  <CardsParagraph>
                    Go on interesting sites, click to answer
                    {currencyTheme === "ethereumStyle"
                      ? " & earn ETH"
                      : " & earn AE"}
                  </CardsParagraph>
                  <div>
                    <GlobalButton
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
                    </GlobalButton>
                  </div>
                </CenteredColumnWithMediaQueries>
                <CenteredColumnWithMediaQueries containerMargin="0 0 48px 0">
                  <CardMainHeading type={"break-paragraph"} mainHeadline={40}>
                    Traffic. Feedback. Grow.
                  </CardMainHeading>
                  <CardsParagraph>Publish your site, set a reward and ask a question.</CardsParagraph>
                  <CardsParagraph>Get traffic and first impression feedback.</CardsParagraph>
                  <div>
                    <GlobalButton
                      onClick={() => handleRedirect("publisher")}
                      buttonWidth="135"
                      buttonMargin="30px 0 0 0"
                      buttonColor={
                        currencyTheme === "ethereumStyle" ? "blue" : "darkBlue"
                      }
                      buttonTextColor={"#FFFFFF"}
                    >
                      Get answers
                    </GlobalButton>
                  </div>
                </CenteredColumnWithMediaQueries>
              </div>
            )}
          </Spring>
          <ImgWrapper type={"double-card"}>
            <img
              src={
                currencyTheme === "ethereumStyle"
                  ? default_landing_double_image
                  : aeternity_landing_img
              }
              className="double-card-img"
              alt="landing_image"
            />
          </ImgWrapper>
        </CardLayout>
      )}
    </VizSensor>
  );
};
