import React, { Fragment, createRef, useEffect, useRef } from "react";
import { FieldArray } from "formik";
import { MdClose } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { CampaignHeader } from "../styles/CampaignStyles";
import {
  WizardInputQuizForms,
  CustomInputField,
  CustomInputFastField,
} from "../styles/WizardFormStyles";

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
  const questionInputRef = useRef("projectQuestion");

  useEffect(() => {
    if (step === 3) {
      window.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          if (e.target.name != questionInputRef.current) {
            e.target.parentElement.parentElement.nextElementSibling.firstChild.firstChild.focus();
          }
        }
      });
    }

    const { projectQuestion, projectOptions } = errors;

    if (
      !projectQuestion &&
      !projectOptions &&
      touched.projectQuestion &&
      touched.projectOptions
    ) {
      dispatch({ type: "third_step" });
    }
  }, [dispatch, errors, step, touched]);
  if (step != 3) {
    return null;
  } else {
    const optionsArrayContainerRef = createRef();
    const onEnterClick = (onClickFunc) => (e) => {
      if (e.key === "Enter") {
        onClickFunc(e);
      }
    };

    return (
      <Fragment>
        <CampaignHeader>
          <h2>Ask a question!</h2>
          <p>Receive feedback from the crowd</p>
        </CampaignHeader>
        <WizardInputQuizForms>
          <div className="labelFieldContainer">
            <label htmlFor="projectQuestion">Your question:</label>
            <div className="inputAndErrorContainer">
              {edit ? (
                <CustomInputField
                  name="projectQuestion"
                  id="projectQuestion"
                  placeholder="project question"
                  readOnly
                />
              ) : (
                <CustomInputField
                  ref={questionInputRef}
                  name="projectQuestion"
                  id="projectQuestion"
                  placeholder="project question"
                />
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
                render={({ push, remove }) => (
                  <Fragment>
                    <div
                      className="quizOptionsContainer"
                      ref={optionsArrayContainerRef}
                    >
                      {values.projectOptions.length > 0 &&
                        values.projectOptions.map((elm, index) => (
                          <div className="inputAndErrorContainer">
                            <div
                              className="fieldAndIconContainer"
                              key={`wizardPublisherWizardArrayContainer${index}`}
                              onKeyPress={onEnterClick(() =>
                                push({ option: "" })
                              )}
                            >
                              <CustomInputFastField
                                name={`projectOptions.${index}.option`}
                                type="text"
                                readOnly
                                style={{ border: "none" }}
                              />
                              <MdClose
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
                          <div className="inputAndErrorContainer">
                            <div
                              className="fieldAndIconContainer"
                              key={`wizardPublisherWizardArrayContainer${index}`}
                              onKeyPress={onEnterClick(() =>
                                push({ option: "" })
                              )}
                            >
                              <CustomInputFastField
                                name={`projectOptions.${index}.option`}
                                type="text"
                                style={{ border: "none" }}
                              />
                              <MdClose
                                className="trashIcon"
                                size={20}
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
        </WizardInputQuizForms>
      </Fragment>
    );
  }
};
