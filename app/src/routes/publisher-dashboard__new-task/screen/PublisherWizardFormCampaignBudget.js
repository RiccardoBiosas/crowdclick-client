import React, { Fragment, useEffect } from "react";
import { StyledGeneralHeadingTwo } from "../../../shared/styles/StyledGeneralHeadings";
import { WizardInputForms, CustomInputField } from "../styles/WizardFormStyles";
import { whatIsXPercentOfY } from "../../../utils/isWhatPercentage";
import StyledGeneralParagraph from "../../../shared/styles/StyledGeneralParagraph";

const errorMessageStyle = {
  position: "absolute",
  top: "20%",
  marginLeft: "10px",
  whiteSpace: "nowrap",
};

const fixedTimeLabelStyle = {
  fontWeight: 600,
  color: "#9ea0a5",
  margin: "8px 0",
};

const fixedTimeStyle = {
  background: "#ffffff 0% 0% no-repeat padding-box",
  border: "1px solid #e2e5ed",
  borderRadius: "4px",
  width: "360px",
  height: "40px",
  paddingLeft: "8px",
  color: "#3e3f42",
  fontWeight: 400,
  display: "flex",
  alignItems: "center",
};

export const PublisherWizardFormCampaignPublisherBudget = ({
  step,
  values,
  errors,
  touched,
  dispatch,
  isError,
}) => {
  useEffect(() => {
    const { pricePerClick, campaignBudget } = errors;
    if (
      !pricePerClick &&
      !campaignBudget &&
      touched.pricePerClick &&
      touched.campaignBudget
    ) {
      dispatch({ type: "second_step" });
    }
  }, [dispatch, errors, touched]);

  if (step !== 2) {
    return null;
  } else {
    return (
      <Fragment>
        <div>
          <StyledGeneralHeadingTwo headingFontSize="24px">
            Plan your budget!
          </StyledGeneralHeadingTwo>
          <StyledGeneralParagraph paragraphColor="#9ea0a5" paragraphFontSize="16px">
            Select your price per click
          </StyledGeneralParagraph>
        </div>
        <WizardInputForms>
          <div className="labelFieldContainer">
            <label htmlFor="pricePerClick">Rewards per click:</label>
            <div style={{ position: "relative" }}>
              <CustomInputField
                name="pricePerClick"
                id="pricePerClick"
                placeholder="0.8"
                component="input"
                type="number"
              />
              <span style={{ position: "relative", right: "20px" }}>$</span>
              {errors.pricePerClick && touched.pricePerClick ? (
                <span
                  style={{
                    ...errorMessageStyle,
                    color: `${isError ? "red" : ""}`,
                  }}
                >
                  {errors.pricePerClick}
                </span>
              ) : null}
            </div>
          </div>

          <div className="labelFieldContainer">
            <label htmlFor="campaignBudget">
              Max budget to spend (in total):
            </label>
            <div style={{ position: "relative" }}>
              <CustomInputField
                name="campaignBudget"
                id="campaignBudget"
                placeholder="20"
                component="input"
                type="number"
              />
              <span style={{ position: "relative", right: "20px" }}>$</span>
              {errors.campaignBudget && touched.campaignBudget ? (
                <span
                  style={{
                    ...errorMessageStyle,
                    color: `${isError ? "red" : ""}`,
                  }}
                >
                  {errors.campaignBudget}
                </span>
              ) : null}
            </div>

            <div className="computationsContainer">
              <p style={{ fontSize: "10.5px" }}>
                Your budget (minus 20% fees):{" "}
                <span style={{ fontWeight: 600 }}>
                  {whatIsXPercentOfY(values.campaignBudget, 80).toFixed(2)}$
                </span>
                . Expected to reach:{" "}
                <span style={{ fontWeight: 600 }}>
                  {values.pricePerClick && values.pricePerClick > 0
                    ? Math.floor(
                        whatIsXPercentOfY(values.campaignBudget, 80) /
                          values.pricePerClick
                      )
                    : 0}{" "}
                  people
                </span>
              </p>
            </div>
          </div>

          <div>
            <p style={fixedTimeLabelStyle}>Time duration (fixed):</p>
            <div style={fixedTimeStyle}>30 seconds</div>
          </div>
        </WizardInputForms>
      </Fragment>
    );
  }
};
