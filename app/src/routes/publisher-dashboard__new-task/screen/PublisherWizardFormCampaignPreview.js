import React, { useState, useEffect, Fragment } from 'react'
import { CampaignHeader } from '../styles/CampaignStyles'
import { WizardPreviewContainer } from '../styles/WizardFormStyles'
import { GlobalButton } from '../../../shared/GlobalButton'
import { useFetch } from '../../../hooks/useFetch'
import { LoadingIcon } from '../../../shared/LoadingIcon'
import { COINGECKO_API } from '../../../config/api-config'

export const PublisherWizardFormCampaignPreview = ({
  step,
  values,
  isValidating,
  isSubmitting
}) => {
  const [submissionAttempt, setSubmissionAttempt] = useState(false)
  const [hoverState, setHoverState] = useState(false)


  const resp = useFetch(
    `${COINGECKO_API}simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`,
    { withCredentials: false }
  )
  const currentDate = new Date()


  useEffect(() => {
    if (step === 4 && isSubmitting) {
      setSubmissionAttempt(true)
    }
  }, [step, isSubmitting])
  if (step !== 4) {
    return null
  } else {
    const {
      projectName,
      projectDescription,
      projectURL,
      pricePerClick,
      campaignBudget,
      projectQuestion,
      projectOptions
    } = values

    if (!resp.response) {
      return <LoadingIcon />
    }
    return (
      <Fragment>
        <CampaignHeader>
          <h2>Your Campaign Preview</h2>
        </CampaignHeader>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WizardPreviewContainer>
            <div>
              <div className='valuesContainer'>
                <h4>Project name</h4>
                <p>{projectName}</p>
              </div>
              <div className='valuesContainer'>
                <h4>Project description</h4>
                <p>{projectDescription}</p>
              </div>
              <div className='valuesContainer'>
                <h4>Project URL</h4>
                <p>{projectURL}</p>
              </div>
            </div>

            <div>
              <div className='valuesContainer'>
                <h4>Reward per click</h4>
                <p>USD: {pricePerClick}$</p>
                <p>ETH: {pricePerClick / resp.response.data.ethereum.usd} </p>
                <span style={{ fontSize: '10px' }}>
                  converted at {currentDate.toLocaleString()}
                </span>
              </div>
              <div className='valuesContainer'>
                <h4>Budget</h4>
                <p>{campaignBudget}$</p>
                <p>ETH {campaignBudget / resp.response.data.ethereum.usd} </p>
                <span style={{ fontSize: '10px' }}>
                  converted at {currentDate.toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <div className='valuesContainer'>
                <h4>Question</h4>
                <p>{projectQuestion}</p>
              </div>
              <div className='valuesContainer'>
                <h4>Answers</h4>
                {projectOptions.map((x, i) => (
                  <p key={`optionsPreview${i}`}>
                    {i + 1}) {x.option}
                  </p>
                ))}
              </div>
            </div>
          </WizardPreviewContainer>
        </div>
        {/* <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            height: '160px'
          }}
        >
           <GlobalButton
            buttonColor={'blue'}
            buttonTextColor={'#FFFFFF'}
            buttonWidth={280}
            type='submit'
            onMouseOver={() => setHoverState(true)}
            onMouseOut={() => setHoverState(false)}
          >
            Submit my project!
          </GlobalButton> 
          {submissionAttempt && hoverState && <p style={{position: 'absolute', fontWeight: 900, color: '#206DFF', bottom: '60px', whiteSpace: 'nowrap'}}>Check the errors in the previous steps!</p>}
        </div> */}
      </Fragment>
    )
  }
}
