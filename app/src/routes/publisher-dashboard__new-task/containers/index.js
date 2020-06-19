import React, { Fragment, useState, useReducer, useEffect } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import web3 from "web3";
import { Prompt, matchPath, Redirect } from "react-router-dom";
import { PublisherWizardFormCampaignDescription } from "../screen/PublisherWizardFormCampaignDescription";
import { PublisherWizardFormCampaignPublisherBudget } from "../screen/PublisherWizardFormCampaignBudget";
import { PublisherWizardFormCampaignQuiz } from "../screen/PublisherWizardFormCampaignQuiz";
import { PublisherWizardFormCampaignPreview } from "../screen/PublisherWizardFormCampaignPreview";
import { PublisherWizardFormCampaignPayment } from "../screen/PublisherWizardFormCampaignPayment";
import { GlobalButton } from "../../../shared/GlobalButton";
import {
  WizardFormParentContainer,
  WizardFormLayoutContainer,
  WizardFormButtonsContainer,
  WizardFormNavbar,
} from "../styles/WizardFormContainerStyles";
import { useHandleKeydownEvent } from "../../../hooks/useHandleKeydownEvent";
import { TASK_ENDPOINT, COINGECKO_API } from "../../../config/api-config";
import { PublisherWizardFormValidationSchema } from "../validationSchema/wizardFormValidationSchema";
import { Temporary_CampaignOutcome } from "../screen/TemporaryComponent/Temporary_CampaignOutcome";

axios.defaults.withCredentials = true;

const empty_initial_values = {
  projectName: "",
  projectDescription: "",
  projectURL: "",
  pricePerClick: null,
  campaignBudget: null,
  projectQuestion: "",
  projectOptions: [{ option: "" }],
};

const initial_state = {
  first_step_no_error: false,
  second_step_no_error: false,
  third_step_no_error: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "first_step":
      return { ...state, first_step_no_error: true };
    case "second_step":
      return { ...state, second_step_no_error: true };
    case "third_step":
      return { ...state, third_step_no_error: true };
  }
};

export const PublisherWizardFormContainer = ({
  initial_values,
  edit,
  id,
  drizzle,
  drizzleState,
}) => {
  const [step, setStep] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [isError, setIsError] = useState(false);
  const [respStatus, setRespStatus] = useState();
  const [state, dispatch] = useReducer(reducer, initial_state);
  const [ethPrice, setEthPrice] = useState();
  const [transactionId, setTransationId] = useState();
  const totalSteps = 6; //move to constant

  const fetchEthPrice = async () => {
    const resp = await axios.get(
      `${COINGECKO_API}simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`,
      { withCredentials: false }
    );
    setEthPrice(resp);
  };

  const keyEventHandler = (e) => {
    if (e.key === "ArrowRight") {
      if (step < 3) {
        setStep(step + 1);
      } else {
        return;
      }
    }
  };

  useEffect(() => {
    setIsError(false);

    if (step === 5 && !ethPrice) {
      fetchEthPrice();
    }

    if (edit) {
      window.addEventListener("keydown", keyEventHandler);
    }

    return () => {
      window.removeEventListener("keydown", keyEventHandler);
    };
  }, [step, edit, keyEventHandler, ethPrice]);

  useHandleKeydownEvent(
    "ArrowRight",
    () =>
      !edit
        ? step < totalSteps
          ? step === 1
            ? state.first_step_no_error
              ? setStep(step + 1)
              : null
            : step === 2
            ? state.second_step_no_error
              ? setStep(step + 1)
              : null
            : step === 3
            ? state.third_step_no_error
              ? setStep(step + 1)
              : null
            : null
          : null
        : null,
    state
  );

  useHandleKeydownEvent(
    "ArrowLeft",
    () => (step > 1 ? setStep(step - 1) : null),
    step
  );
  return (
    <Fragment>
      <WizardFormParentContainer>
        <h1>Bring traffic, quantitative and qualitative feedback.</h1>
        <WizardFormLayoutContainer>
          <WizardFormNavbar>
            <div>
              <button
                className="stepBack"
                onClick={() => (step > 1 ? setStep(step - 1) : null)}
              >
                Back
              </button>
            </div>
            <div>
              <button
                className="closePublisherDashboard"
                onClick={() => setRedirect(true)}
              >
                x
              </button>
            </div>
          </WizardFormNavbar>
          <Formik
            initialValues={
              initial_values ? initial_values : empty_initial_values
            }
            validationSchema={PublisherWizardFormValidationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              // alert(JSON.stringify(values, null, 2))

              const {
                projectName,
                projectDescription,
                projectURL,
                pricePerClick,
                campaignBudget,
                projectQuestion,
                projectOptions,
              } = values;

              const filteredProjectOptionsWithoutEmptyStrings = projectOptions.filter(
                (x) => x.option !== ""
              );

              try {
                if (!edit) {
                 
                  const currentEthPrice = ethPrice.data.ethereum.usd;
                  
                  const budgetToEth = values.campaignBudget / currentEthPrice;
                  const rewardToEth = values.pricePerClick / currentEthPrice;
                  const budgetToWei = web3.utils.toWei(budgetToEth.toString());
                  const rewardToWei = web3.utils.toWei(rewardToEth.toString());
                  const txId = await drizzle.contracts.CrowdclickEscrow.methods[
                    "openTask"
                  ].cacheSend(budgetToWei, rewardToWei, {
                    from: drizzleState.accounts[0],
                    value: budgetToWei,
                    gas: 500000,                    
                  });
                  setTransationId(txId);   

                  if (txId) {
                    const res = await axios.post(TASK_ENDPOINT, {
                      title: projectName,
                      description: projectDescription,
                      website_link: projectURL,
                      reward_per_click: pricePerClick,
                      time_duration: "00:00:30",
                      spend_daily: campaignBudget,
                      questions: [
                        {
                          title: projectQuestion,
                          options: filteredProjectOptionsWithoutEmptyStrings.map(
                            (x) => {
                              return { title: x.option };
                            }
                          ),
                        },
                      ],
                    });

                    let respStatus = res ? res.status : "failed";
                    setRespStatus(respStatus);
                    setStep(step + 1);
                  }
                } else {
                  const res = await axios.patch(`${TASK_ENDPOINT}${id}/`, {
                    title: projectName,
                    description: projectDescription,
                    website_link: projectURL,
                    reward_per_click: pricePerClick,
                    time_duration: "00:00:30",
                    spend_daily: campaignBudget,
                    // questions: [
                    //   {
                    //     title: projectQuestion,
                    //     options: projectOptions.map(x => {
                    //       return { title: x.option }
                    //     })
                    //   }
                    // ]
                  });
                  let respStatus = res ? res.status : "failed";
                  setRespStatus(respStatus);
                  setStep(step + 1);
                }
              } catch (err) {
                let errorResponse = err.response.status;
                setRespStatus(errorResponse);
                setStep(step + 1);
  
              }
            }}
          >
            {({ values, errors, touched, isValidating, isSubmitting }) => {
              return (
                <Fragment>
                  <Form>
                    <PublisherWizardFormCampaignDescription
                      step={step}
                      errors={errors}
                      touched={touched}
                      dispatch={dispatch}
                      isError={isError}
                    />
                    <PublisherWizardFormCampaignPublisherBudget
                      step={step}
                      values={values}
                      errors={errors}
                      touched={touched}
                      dispatch={dispatch}
                      isError={isError}
                    />
                    <PublisherWizardFormCampaignQuiz
                      step={step}
                      values={values}
                      errors={errors}
                      touched={touched}
                      dispatch={dispatch}
                      edit={edit}
                      isError={isError}
                    />
                    <PublisherWizardFormCampaignPreview
                      step={step}
                      errors={errors}
                      touched={touched}
                      values={values}
                      isValidating={isValidating}
                      isSubmitting={isSubmitting}
                    />
                    <PublisherWizardFormCampaignPayment
                      step={step}
                      values={values}
                      drizzle={drizzle}
                      drizzleState={drizzleState}
                      setStep={setStep}
                      transactionId={transactionId}
                      setRespStatus={setRespStatus}
                    />
                    <Temporary_CampaignOutcome
                      step={step}
                      respStatus={respStatus}
                    />
                  </Form>

                  {step < totalSteps - 1 ? (
                    <WizardFormButtonsContainer>
                      <GlobalButton
                        buttonColor={"blue"}
                        buttonTextColor={"#FFFFFF"}
                        buttonWidth={280}
                        onClick={() => {
                          const {
                            projectName,
                            projectDescription,
                            projectURL,
                            pricePerClick,
                            campaignBudget,
                            projectQuestion,
                            projectOptions,
                          } = errors;

                          //test

                          if (edit) {
                            setStep(step + 1);
                          } else {
                            switch (step) {
                              case 1:
                                if (
                                  !projectName &&
                                  !projectDescription &&
                                  !projectURL &&
                                  touched.projectName &&
                                  touched.projectDescription &&
                                  touched.projectURL
                                ) {
                                  setStep(step + 1);
                                  setIsError(false);

                                  // }
                                } else {
                                  setIsError(true);
                                }
                                break;
                              case 2:
                                if (
                                  !pricePerClick &&
                                  !campaignBudget &&
                                  touched.pricePerClick &&
                                  touched.campaignBudget
                                ) {
                                  setIsError(false);
                                  setStep(step + 1);
                                } else {
                                  setIsError(true);
                                }
                                break;
                              case 3:
                                if (
                                  !projectQuestion &&
                                  !projectOptions &&
                                  touched.projectQuestion &&
                                  touched.projectOptions
                                ) {
                                  setIsError(false);
                                  setStep(step + 1);
                                } else {
                                  setIsError(true);
                                }
                                break;
                              case 4:
                                if (
                                  !projectQuestion &&
                                  !projectOptions &&
                                  touched.projectQuestion &&
                                  touched.projectOptions
                                ) {
                                  setStep(step + 1);
                                }
                                break;
                              default:
                                return null;
                            }
                          }
                        }}
                      >
                        Next step
                      </GlobalButton>

                      <p>
                        Step {step} of {totalSteps}
                      </p>
                    </WizardFormButtonsContainer>
                  ) : null}
                </Fragment>
              );
            }}
          </Formik>
        </WizardFormLayoutContainer>
      </WizardFormParentContainer>
      {redirect && <Redirect to="/publisher-dashboard" />}
    </Fragment>
  );
};
