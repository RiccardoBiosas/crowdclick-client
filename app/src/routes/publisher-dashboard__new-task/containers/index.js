// theirs
import React, { Fragment, useState, useReducer, useEffect, useCallback } from "react";
import { Formik, Form } from "formik";
import { ethers } from 'ethers';
// import { Prompt, matchPath, Redirect } from "react-router-dom";
import { Redirect } from "react-router-dom";
// components
import { PublisherWizardFormCampaignDescription } from "../screen/PublisherWizardFormCampaignDescription";
import { PublisherWizardFormCampaignPublisherBudget } from "../screen/PublisherWizardFormCampaignBudget";
import { PublisherWizardFormCampaignQuiz } from "../screen/PublisherWizardFormCampaignQuiz";
import { PublisherWizardFormCampaignPreview } from "../screen/PublisherWizardFormCampaignPreview";
import { PublisherWizardFormCampaignPayment } from "../screen/PublisherWizardFormCampaignPayment";
import PublisherWizardCampaignOutcome  from "../screen/PublisherWizardCampaignOutcome";
// styles
import StyledGeneralButton  from "../../../shared/styles/StyledGeneralButton";
import  StyledCardNavbar  from "../../../shared/styles/StyledCardNavbar";
import StyledGeneralCardLayout from "../../../shared/styles/StyledGeneralCardLayout";
import StyledGeneralCardWrapper from "../../../shared/styles/StyledGeneralCardWrapper";
import StyledGeneralColumnWrapper from "../../../shared/styles/StyledGeneralColumnWrapper";
// utils
import { useHandleKeydownEvent } from "../../../hooks/useHandleKeydownEvent";
import crowdclickClient from "../../../utils/api/crowdclick";
import { coingeckoClient } from "../../../utils/api/coingecko";
import  PublisherWizardFormValidationSchema  from "../validationSchema/wizardFormValidationSchema";
// constants
import { PUBLISHER_DASHBOARD_ROUTE } from "../../../config/routes-config";
import config from "../../../config/env-config";

const empty_initial_values = {
  projectName: "",
  projectDescription: "",
  projectURL: "",
  pricePerClick: 0,
  campaignBudget: 0,
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
    default:
      break
  }
};

const PublisherWizardFormCampaignContainer = ({
  initial_values,
  edit,
  id,
  contract,
  address,
  account,
  currentNetwork,
  currentWallet
}) => {
  const [step, setStep] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [isError, setIsError] = useState(false);
  const [respStatus, setRespStatus] = useState();
  const [state, dispatch] = useReducer(reducer, initial_state);
  const [campaignData, setCampaignData] = useState();
  const [wasCampaignDataForwarded, setWasCampaignDataForwarded] = useState(false)
  const [txHash, setTxHash] = useState();
  const [isBroadcasted, setIsBroadcasted] = useState(false); // current not being used
  const [receipt, setReceipt] = useState();
  const totalSteps = 6; //move to constant

  const getReceipt = async () => {
    setIsBroadcasted(true);
    // const provider = ethers.getDefaultProvider('goerli');
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    const resp = await provider.waitForTransaction(txHash);
    setReceipt(resp);
  };



  const postCampaign = useCallback(async() => {
    try {
      const {
        projectName,
        projectDescription,
        projectURL,
        pricePerClick,
        campaignBudget,
        projectQuestion,
        projectOptions,
      } = campaignData;
  
      const filteredProjectOptionsWithoutEmptyStrings = projectOptions.filter(
        (x) => x.option !== ""
      );
      const networkName = config.blockchain[currentNetwork].chainName
  
      const res = await crowdclickClient.postTask({
        title: projectName,
        description: projectDescription,
        website_link: projectURL,
        reward_per_click: pricePerClick,
        time_duration: "00:00:30",
        spend_daily: campaignBudget,
        chain: networkName,
        questions: [
          {
            title: projectQuestion,
            options: filteredProjectOptionsWithoutEmptyStrings.map((x) => {
              return { title: x.option };
            }),
          },
        ],
      });  
      let respStatus = res.status;
      setRespStatus(respStatus);
    } catch(err) {
      console.error(err)
    }
   
  }, [campaignData])

  useEffect(() => {    
    if (txHash && !respStatus) {
      getReceipt();
    }
    if (receipt && !respStatus && !wasCampaignDataForwarded) {
      setWasCampaignDataForwarded(true)
      postCampaign();
    }
    if (respStatus && step < totalSteps) {
      setStep(step + 1);      
    }
    if (edit) {
      window.addEventListener("keydown", keyEventHandler);
    }
    return () => {
      window.removeEventListener("keydown", keyEventHandler);
    };
  }, [respStatus, txHash, receipt, isBroadcasted]);

  const keyEventHandler = useCallback((e) => {
    if (e.key === "ArrowRight") {
      if (step < 3) {
        setStep(step + 1);
      } else {
        return;
      }
    }
  }, [step])


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
      <StyledGeneralCardLayout>
        <div>
          <h1>Bring traffic, quantitative and qualitative feedback.</h1>
        </div>
        <StyledGeneralCardWrapper>
          <StyledCardNavbar>
            <div>
              <button
                type='button'
                className="stepBack"
                onClick={() => (step > 1 ? setStep(step - 1) : null)}
              >
                Back
              </button>
            </div>
            <div>
              <button
                type='button'
                className="closeCard"
                onClick={() => setRedirect(true)}
              >
                x
              </button>
            </div>
          </StyledCardNavbar>
          <Formik
            initialValues={
              initial_values ? initial_values : empty_initial_values
            }
            validationSchema={PublisherWizardFormValidationSchema}
            onSubmit={async (values) => {
              const {
                projectName,
                projectDescription,
                projectURL,
                pricePerClick,
                campaignBudget,      
              } = values;

              try {
                if (!edit) {
                  console.log('budget is ',  values.campaignBudget , 'reward is ',  values.pricePerClick, 'url is ', projectURL )
                  const ethPrice = await coingeckoClient.getEthToUSD()
                  const currentEthPrice = ethPrice.data.ethereum.usd;
                  const budgetToEth = values.campaignBudget / currentEthPrice;
                  const rewardToEth = values.pricePerClick / currentEthPrice;
                  const budgetToWei = ethers.utils.parseEther(budgetToEth.toFixed(6).toString());
                  const rewardToWei = ethers.utils.parseEther(rewardToEth.toFixed(6).toString());                  
                  console.log('budget to wei is ', budgetToWei, ' reward to wei is ', rewardToWei, ' project url is ', projectURL)
                  const transaction = await contract.functions.openTask(
                    budgetToWei,
                    rewardToWei,
                    projectURL,
                    {
                      value: budgetToWei,
                      gasLimit: 1000000,
                    }
                  );
                  if(transaction) {
                    setTxHash(transaction.hash);
                  }

                  setCampaignData(values);
                  
  
                } else {
                  const res = await crowdclickClient.patchTask(id, {
                    title: projectName,
                    description: projectDescription,
                    website_link: projectURL,
                    reward_per_click: pricePerClick,
                    time_duration: "00:00:30",
                    spend_daily: campaignBudget,       
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
                      edit={edit}
                      values={values}                 
                      setStep={setStep}
                      address={address}
                      isBroadcasted={isBroadcasted}
                      txHash={txHash}
                      currentNetwork={currentNetwork}
                      currentWallet={currentWallet}                    
                    />
                    <PublisherWizardCampaignOutcome
                      step={step}
                      edit={edit}
                      respStatus={respStatus}
                    />
                  </Form>

                  {step < totalSteps - 1 ? (
                    <StyledGeneralColumnWrapper columnJustify="flex-end">
                      <StyledGeneralButton
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
                      </StyledGeneralButton>

                      <p style={{ color: "#9ea0a5", fontSize: "16px" }}>
                        Step {step} of {totalSteps}
                      </p>
                    </StyledGeneralColumnWrapper>
                  ) : null}
                </Fragment>
              );
            }}
          </Formik>
        </StyledGeneralCardWrapper>
      </StyledGeneralCardLayout>
      {redirect && <Redirect to={PUBLISHER_DASHBOARD_ROUTE} />}
    </Fragment>
  );
};

export default PublisherWizardFormCampaignContainer