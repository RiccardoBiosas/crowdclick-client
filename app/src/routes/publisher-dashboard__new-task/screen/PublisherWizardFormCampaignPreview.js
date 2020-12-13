// theirs
import React from 'react'
// components
import DataFetcher from '../../../shared/components/DataFetcher'
// styles
import { StyledWizardPreviewLayout } from '../styles/WizardFormStyles'
import { StyledGeneralHeadingTwo } from '../../../shared/styles/StyledGeneralHeadings'
// utils
import currencyApi from '../../../services/api/currencyService/api'

export const PublisherWizardFormCampaignPreview = ({ step, values }) => {
  const currentDate = new Date()
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

    return (
      <DataFetcher
        loadingIconCustomStyles={{ height: '40vh' }}
        action={currencyApi.fetchEthToUSD}
      >
        {data => (
          <>
            <div>
              <StyledGeneralHeadingTwo headingFontSize='24px'>
                Your Campaign Preview
              </StyledGeneralHeadingTwo>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <StyledWizardPreviewLayout>
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
                    <p>ETH: {pricePerClick / data} </p>
                    <span style={{ fontSize: '10px' }}>
                      converted at {currentDate.toLocaleString()}
                    </span>
                  </div>
                  <div className='valuesContainer'>
                    <h4>Budget</h4>
                    <p>{campaignBudget}$</p>
                    <p>ETH {campaignBudget / data} </p>
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
              </StyledWizardPreviewLayout>
            </div>
          </>
        )}
      </DataFetcher>
    )
  }
}
