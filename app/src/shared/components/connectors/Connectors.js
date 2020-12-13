// theirs
import React from 'react'
// components
import MetamaskConnector from '../connectors/metamaskConnector'
import WalletConnectConnector from './walletConnectConnector'
import PortisConnector from './portisConnector'
// styles
import StyledImageButton from '../../styles/StyledImageButton'
import StyledGeneralColumnWrapper from '../../styles/StyledGeneralColumnWrapper'
import StyledGeneralParagraph from '../../styles/StyledGeneralParagraph'
// assets
import {
  goerliLogo,
  maticSponsor,
  PackmanLoadingAnimation
} from '../../../assets'
// constants
import { STEP_TYPES, ACTION_TYPES, CONNECTION_ATTEMPT_TYPES } from './constants'

const Connectors = ({ dispatchConnector, state, dispatch }) => {
  if (state.STEP === STEP_TYPES.STEP_ONE) {
    return (
      <>
        <MetamaskConnector handleCallback={dispatchConnector} />
        <WalletConnectConnector handleCallback={dispatchConnector} />
        <PortisConnector handleCallback={dispatchConnector} />
      </>
    )
  }
  if (state.STEP === STEP_TYPES.STEP_TWO) {
    return (
      <>
        <StyledImageButton
          srcImage={goerliLogo}
          altAttribute='goerli-logo'
          styledWidth='7rem'
          style={{
            zIndex: 2
          }}
          onClick={() =>
            dispatch({ type: ACTION_TYPES.SELECT_PROVIDER, payload: 5 })
          }
        />
        <StyledImageButton
          srcImage={maticSponsor}
          altAttribute='matic-logo'
          styledWidth='4.8rem'
          style={{
            zIndex: 2
          }}
          onClick={() =>
            dispatch({ type: ACTION_TYPES.SELECT_PROVIDER, payload: 80001 })
          }
        />
      </>
    )
  }
  if (state.STEP === STEP_TYPES.STEP_THREE) {
    return (
      <StyledGeneralColumnWrapper columnJustify='space-around'>
        <div>
          <PackmanLoadingAnimation color='blue' size={14} />
        </div>
        <div>
          <StyledGeneralParagraph paragraphColor='#272833CC'>
            waiting for the signature ...
          </StyledGeneralParagraph>
        </div>
      </StyledGeneralColumnWrapper>
    )
  }
  if (state.STEP === STEP_TYPES.STEP_FOUR) {
    return (
      <StyledGeneralColumnWrapper>
        {!state.CONNECTION_ATTEMPT.wasLoginSuccessful && (
          <StyledGeneralParagraph paragraphColor='#272833CC'>
            {state.CONNECTION_ATTEMPT.error}
          </StyledGeneralParagraph>
        )}
      </StyledGeneralColumnWrapper>
    )
  }
  return (
    <StyledGeneralParagraph paragraphColor='#272833CC'>
      {CONNECTION_ATTEMPT_TYPES.DEFAULT_FAILED.error}
    </StyledGeneralParagraph>
  )
}

export default Connectors
