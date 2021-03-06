// theirs
import React, { useEffect } from "react";
// styles
import {
  StyledWizardInputForms,
  StyledCustomTextareaField,
  StyledCustomInputField,
} from "../styles/WizardFormStyles";
import { StyledGeneralHeadingTwo } from "../../../shared/styles/StyledGeneralHeadings";
import StyledGeneralParagraph from "../../../shared/styles/StyledGeneralParagraph";

export const PublisherWizardFormCampaignDescription = ({
  step,
  errors,
  touched,
  dispatch,
  isError,
}) => {
  useEffect(() => {
    const { projectName, projectDescription, projectURL } = errors;
    if (
      !projectName &&
      !projectDescription &&
      !projectURL &&
      touched.projectName &&
      touched.projectDescription &&
      touched.projectURL
    ) {
      dispatch({ type: "first_step" });
    }
  }, [dispatch, errors, touched]);

  if (step !== 1) {
    return null;
  } else {
    return (
      <>
        <div>
          <StyledGeneralHeadingTwo headingFontSize="24px">
            Tell us about your project!
          </StyledGeneralHeadingTwo>
          <StyledGeneralParagraph paragraphColor="#9ea0a5" paragraphFontSize="16px">
            Introduce your project to the crowd
          </StyledGeneralParagraph>
        </div>
        <StyledWizardInputForms>
          <div className="labelFieldContainer">
            <label htmlFor="projectName">Project title:</label>
            <div className="inputAndErrorContainer">
              <StyledCustomInputField
                type="text"
                name="projectName"
                id="projectName"
                placeholder="project name"
                component="input"
              />
              {errors.projectName && touched.projectName ? (
                <span
                  style={{ color: `${isError ? "red" : ""}` }}
                  className="errorMessage"
                >
                  {errors.projectName}
                </span>
              ) : null}
            </div>
          </div>
          <div className="labelFieldContainer">
            <label htmlFor="projectDescription">
              Project description (max 100 characters):
            </label>
            <div className="inputAndErrorContainer">
              <StyledCustomTextareaField
                type="text"
                name="projectDescription"
                id="projectDescription"
                placeholder="project description"
                component="textarea"
              />
              {errors.projectDescription && touched.projectDescription ? (
                <span
                  style={{ color: `${isError ? "red" : ""}` }}
                  className="errorMessage"
                >
                  {errors.projectDescription}
                </span>
              ) : null}
            </div>
          </div>

          <div className="labelFieldContainer">
            <label htmlFor="projectURL">Project URL:</label>
            <div className="inputAndErrorContainer">
              <StyledCustomInputField
                type="text"
                name="projectURL"
                id="projectURL"
                placeholder="your project URL"
                component="input"
              />
              {errors.projectURL && touched.projectURL ? (
                <span
                  style={{ color: `${isError ? "red" : ""}` }}
                  className="errorMessage"
                >
                  {errors.projectURL}
                </span>
              ) : null}
            </div>
          </div>
        </StyledWizardInputForms>
      </>
    );
  }
};
