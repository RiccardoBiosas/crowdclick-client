// theirs
import React from 'react'
import PackmanLoader from 'react-spinners/PacmanLoader'
// styles
import { StyledGeneralHeadingTwo } from '../../../shared/styles/StyledGeneralHeadings'
import StyledGeneralSubmitButton from '../../../shared/styles/StyledGeneralSubmitButton'
import StyledGeneralParagraph from '../../../shared/styles/StyledGeneralParagraph'
// assets
import Copy from '../../../assets/images/copy.svg'
// constants
import config from '../../../config/env-config'
import { WALLETS } from '../../../utils/blockchain/ethereumHandler'
import { metamaskIcon, portisLogo } from '../../../assets'
// import CopyToClipboard from "../../../shared/copyToClipboard/CopyToClipboard";

export const PublisherWizardFormCampaignPayment = ({
  step,
  address,
  txHash,
  currentNetwork,
  currentWallet,
  edit
}) => {
  if (step !== 5) {
    return null
  } else {
    const copyToClickboard = txt => {
      const temporaryInput = document.createElement('input')
      document.body.appendChild(temporaryInput)
      temporaryInput.setAttribute('value', txt)
      temporaryInput.select()
      document.execCommand('copy')
      document.body.removeChild(temporaryInput)
    }
    const blockchainExplorer =
      config.blockchain[currentNetwork].chainExplorerTransactions || null
    const chainName = config.blockchain[currentNetwork].chainName || null

    // if (!txHash) {
    return (
      <>
        <div>
          <StyledGeneralHeadingTwo headingFontSize='24px'>
            You're almost done! Just deposit ETH
          </StyledGeneralHeadingTwo>
          {/* <StyledGeneralParagraph
            paragraphColor='#9ea0a5'
            paragraphFontSize='16px'
          >
            Here is your total campaign cost
          </StyledGeneralParagraph> */}
        </div>
        <div
          style={{
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <p>The ETH will be deposited on:</p>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                border: '1px solid #E2E5ED',
                height: '38px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {address}
            </div>
            {/* <CopyToClipboard condition={true} contentToCopy={address} successTxt={"address copied!"} failureTxt={"nothing was copied!"} /> */}
            <button
              style={{
                background: 'none',
                outline: 'none',
                border: 'none',
                marginLeft: '6px'
              }}
              type='button'
              onClick={() => copyToClickboard(address)}
            >
              <img src={Copy} alt='copy' />
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '1rem'
            }}
          >
            {!txHash ? (
              <>
                <div>
                  {currentWallet === WALLETS.PORTIS ? (
                    <img
                      style={{ width: '120px' }}
                      src={portisLogo}
                      alt='wallet-logo'
                    />
                  ) : (
                    <img
                      style={{ width: '120px' }}
                      src={metamaskIcon}
                      alt='wallet-logo'
                    />
                  )}
                </div>
                <div>
                  {currentWallet === WALLETS.PORTIS ? (
                    <StyledGeneralSubmitButton
                      type='submit'
                      buttonColor={
                        'linear-gradient(90deg, #b06aec 0%, #7839d5 100%)'
                      }
                      buttonTextColor={'#FFFFFF'}
                      buttonWidth={280}
                    >
                      Pay with Portis
                    </StyledGeneralSubmitButton>
                  ) : (
                    <StyledGeneralSubmitButton
                      type='submit'
                      buttonColor={'orange'}
                      buttonMargin={'34px 0px 0px 0px'}
                      buttonTextColor={'#FFFFFF'}
                      buttonWidth={280}
                      // onClick={openTask}
                    >
                      Pay with Metamask
                    </StyledGeneralSubmitButton>
                  )}
                </div>
              </>
            ) : (
              <>
                <div style={{ height: '100px' }}>
                  <PackmanLoader color='#206DFF' size={30} />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <p style={{ fontWeight: 900, color: '#9ea0a5' }}>
                    Check your transaction on {chainName} chain explorer:
                  </p>
                  <div>
                    <a
                      href={`${blockchainExplorer}${txHash}`}
                      style={{ color: '#9ea0a5' }}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {`${blockchainExplorer}${txHash}`}
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    )
  }
}
