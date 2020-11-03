// theirs
import React, { Fragment, createRef, useEffect, useRef } from "react";
import { FieldArray } from "formik";
import { IoMdClose } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
// styles
import {
  StyledWizardInputQuizForms,
  StyledCustomInputField,
  StyledCustomInputFastField,
} from "../styles/WizardFormStyles";
import { StyledGeneralHeadingTwo } from "../../../shared/styles/StyledGeneralHeadings";
import StyledGeneralParagraph from "../../../shared/styles/StyledGeneralParagraph";

const errorMessageStyle = {
  position: "absolute",
  top: "20%",
  left: "360px",
  marginLeft: "10px",
  whiteSpace: "nowrap",
};

export const PublisherWizardFormCampaignQuiz = ({
  step,
  values,
  errors,
  touched,
  dispatch,
  edit,
  hoverState,
  isError,
}) => {
  const { projectQuestion, projectOptions } = errors;
  const questionInputRef = useRef();
  const optionsArrayContainerRef = createRef();

  useEffect(() => {
    if (step === 3) {
      window.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          if (e.target.name !== questionInputRef.current) {
            e.target.parentElement.parentElement.nextElementSibling.firstChild.firstChild.focus();
          }
        }
      });
    }

    if (
      !projectQuestion &&
      !projectOptions &&
      touched.projectQuestion &&
      touched.projectOptions
    ) {
      dispatch({ type: "third_step" });
    }
  }, [dispatch, errors, projectOptions, projectQuestion, step, touched]);
  if (step !== 3) {
    return null;
  } else {
    const onEnterClick = (onClickFunc) => (e) => {
      if (e.key === "Enter") {
        onClickFunc(e);
      }
    };

    return (
      <Fragment>
        <div>
          <StyledGeneralHeadingTwo headingFontSize="24px">
            Ask a question!
          </StyledGeneralHeadingTwo>
          <StyledGeneralParagraph paragraphColor="#9ea0a5" paragraphFontSize="16px">
            Receive feedback from the crowd
          </StyledGeneralParagraph>
        </div>
        <StyledWizardInputQuizForms>
          <div className="labelFieldContainer">
            <label htmlFor="projectQuestion">Your question:</label>
            <div className="inputAndErrorContainer">
              {edit ? (
                <StyledCustomInputField
                  name="projectQuestion"
                  id="projectQuestion"
                  placeholder="project question"
                  readOnly
                />
              ) : (
                <span ref={questionInputRef}>
                  <StyledCustomInputField
                    name="projectQuestion"
                    id="projectQuestion"
                    placeholder="project question"
                  />
                </span>
              )}

              {errors.projectQuestion && touched.projectQuestion ? (
                <span
                  style={{ color: `${isError ? "red" : ""}` }}
                  className="errorMessage"
                >
                  {errors.projectQuestion}
                </span>
              ) : null}
            </div>
          </div>

          <div className="labelFieldContainer">
            <label className="projectOptionsLabel" htmlFor="projectOptions">
              Multiple choice answer:
            </label>
            {edit ? (
              <FieldArray
                name="projectOptions"
                readOnly
                render={({ push }) => (
                  <Fragment>
                    <div
                      className="quizOptionsContainer"
                      ref={optionsArrayContainerRef}
                    >
                      {values.projectOptions.length > 0 &&
                        values.projectOptions.map((elm, index) => (
                          <div
                            className="inputAndErrorContainer"
                            key={`wizardPublisherWizardArrayContainer${index}`}
                          >
                            <div
                              className="fieldAndIconContainer"
                              onKeyPress={onEnterClick(() =>
                                push({ option: "" })
                              )}
                            >
                              <StyledCustomInputFastField
                                name={`projectOptions.${index}.option`}
                                type="text"
                                readOnly
                                style={{ border: "none" }}
                              />
                              <IoMdClose
                                className="trashIcon"
                                size={20}
                                data-index={index}
                                disabled
                              />
                            </div>

                            {errors.projectOptions &&
                            typeof errors.projectOptions != "string" &&
                            errors.projectOptions[index] &&
                            touched.projectOptions &&
                            touched.projectOptions[index] ? (
                              <span
                                style={{
                                  ...errorMessageStyle,
                                  color: `${isError ? "red" : ""}`,
                                }}
                              >
                                {errors.projectOptions[index]
                                  ? errors.projectOptions[index].option
                                  : null}
                              </span>
                            ) : null}
                          </div>
                        ))}
                    </div>

                    <div style={{ position: "relative" }}>
                      <button
                        className="addOptionButton"
                        type="button"
                        onClick={() => push({ option: "" })}
                        disabled
                      >
                        <IoMdAdd className="addOptionButtonIcon" /> Add an
                        answer
                      </button>

                      {errors.projectOptions &&
                      errors.projectOptions[0] &&
                      touched.projectOptions ? (
                        <span style={errorMessageStyle}>
                          {typeof errors.projectOptions === "string"
                            ? errors.projectOptions
                            : errors.projectOptions[0].option}
                        </span>
                      ) : null}
                    </div>
                  </Fragment>
                )}
              />
            ) : (
              <FieldArray
                name="projectOptions"
                render={({ push, remove }) => (
                  <Fragment>
                    <div
                      className="quizOptionsContainer"
                      ref={optionsArrayContainerRef}
                    >
                      {values.projectOptions.length > 0 &&
                        values.projectOptions.map((elm, index) => (
                          <div
                            className="inputAndErrorContainer"
                            key={`wizardPublisherWizardArrayContainer${index}`}
                          >
                            <div
                              className="fieldAndIconContainer"
                              onKeyPress={onEnterClick(() =>
                                push({ option: "" })
                              )}
                            >
                              <StyledCustomInputFastField
                                name={`projectOptions.${index}.option`}
                                type="text"
                                style={{ border: "none" }}
                              />
                              <IoMdClose
                                className="trashIcon"
                                size={"20px"}
                                onClick={() => remove(index)}
                                data-index={index}
                              />
                            </div>

                            {errors.projectOptions &&
                            typeof errors.projectOptions != "string" &&
                            errors.projectOptions[index] &&
                            touched.projectOptions &&
                            touched.projectOptions[index] ? (
                              <span
                                style={{
                                  ...errorMessageStyle,
                                  color: `${isError ? "red" : ""}`,
                                }}
                              >
                                {errors.projectOptions[index]
                                  ? errors.projectOptions[index].option
                                  : null}
                              </span>
                            ) : null}
                          </div>
                        ))}
                    </div>

                    <div style={{ position: "relative" }}>
                      <button
                        className="addOptionButton"
                        type="button"
                        onClick={() => push({ option: "" })}
                      >
                        <IoMdAdd className="addOptionButtonIcon" /> Add an
                        answer
                      </button>

                      {errors.projectOptions &&
                      errors.projectOptions[0] &&
                      touched.projectOptions ? (
                        <span
                          style={{
                            ...errorMessageStyle,
                            color: `${isError ? "red" : ""}`,
                          }}
                        >
                          {typeof errors.projectOptions === "string"
                            ? errors.projectOptions
                            : errors.projectOptions[0].option}
                        </span>
                      ) : null}
                    </div>
                  </Fragment>
                )}
              />
            )}
          </div>
        </StyledWizardInputQuizForms>
      </Fragment>
    );
  }
};
