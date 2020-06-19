import React, { Fragment, useState } from 'react'
import { Redirect, useHistory } from 'react-router'
import {ReactComponent as Placeholder} from "../../../assets/Iframe/ETH-Reward.svg"
import {
  WizardFormParentContainer,
  WizardFormLayoutContainer,
  WizardFormButtonsContainer,
} from '../../publisher-dashboard__new-task/styles/WizardFormContainerStyles'
import { CampaignHeader } from '../../publisher-dashboard__new-task/styles/CampaignStyles'
import MetamaskButton from '../../../metamask/MetamaskButton'
import { USER_TASKS_ROUTE, PUBLISHER_WIZARD_ROUTE } from '../../../config/routes-config'


export const SignupFallback = (props) => {
  console.log('signup fallback props', props)
  const [redirect, setRedirect] = useState(false)
  const history = useHistory()



  const login = () => {
    setRedirect(true)   
  }
  return (
    <Fragment>
      <WizardFormParentContainer style={{height: "420px"}}>
        <h1>Click. Answer. Earn.</h1>
        <WizardFormLayoutContainer>
          {/* <ProgressBar totalSteps={4} step={step} /> */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <div>
              <button
                style={{
                  paddingRight: '20px',
                  paddingTop: '14px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer'
                }}
                onClick={() => history.push('/#')}
              >
                x
              </button>
            </div>
          </div>
          <CampaignHeader>
            <h2>Connect with your Public Key through Metamask</h2>
            {/* <p>Rewards will go into this account.</p> */}
          </CampaignHeader>
          <div>
            <Placeholder />
          </div>


          <WizardFormButtonsContainer>
            <div>
              <MetamaskButton
                btnColor={'orange'}
                btnWidth={240}
                cb_login={login}
                btnText={'connect to metamask'}
              />

              <p>
                You can download metamask
                <a
                  href='https://metamask.io/'
                  rel="noopener noreferrer"
                  target='_blank'
                  style={{ paddingLeft: '6px' }}
                >
                  here
                </a>
              </p>
            </div>

            <p>Step 1 of 2</p>
          </WizardFormButtonsContainer>
        </WizardFormLayoutContainer>
      </WizardFormParentContainer>
      {redirect && <Redirect to={props.location.state.next_redirect === "publisher" ? PUBLISHER_WIZARD_ROUTE : USER_TASKS_ROUTE} />}
    </Fragment> 
  )
}
