// theirs
import React, { useState, useRef, useReducer, useEffect } from 'react'
import { Link } from 'react-router-dom'
// components
import Connectors from './Connectors'
// styles
import {
  StyledArrowLayout,
  StyledDropdownButton
} from '../../styles/StyledDropdownLayout'
import { StyledConnectDropdownLayout } from './styles/StyledDropdown'
// utils
import { useHandleEventOutsideRef } from '../../../hooks/useHandleEventOutsideRef'
// assets
import { DropdownDownwardArrow } from '../../../assets'
// classes
import ethereumHandler from '../../../services/blockchain/ethereumHandler'
// constants
import { WALLETS } from '../../../constants/blockchain'
import {
  CONNECTION_ATTEMPT_TYPES,
  STEP_TYPES,
  initialState,
  ACTION_TYPES
} from './constants'

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.GO_BACK:
      return {
        ...state,
        STEP: STEP_TYPES.STEP_ONE,
        SELECTED_CONNECTOR: undefined,
        SELECTED_NETWORK: undefined,
        CONNECTION_ATTEMPT: CONNECTION_ATTEMPT_TYPES.UNINITIALIZED
      }
    case ACTION_TYPES.SELECT_CONNECTOR:
      if (action.payload === WALLETS.METAMASK) {
        return {
          ...state,
          STEP: STEP_TYPES.STEP_THREE,
          SELECTED_CONNECTOR: action.payload,
          CONNECTION_ATTEMPT: CONNECTION_ATTEMPT_TYPES.INITIALIZED
        }
      } else {
        return {
          ...state,
          STEP: STEP_TYPES.STEP_TWO,
          SELECTED_CONNECTOR: action.payload,
          CONNECTION_ATTEMPT: CONNECTION_ATTEMPT_TYPES.INITIALIZED
        }
      }
    case ACTION_TYPES.SELECT_PROVIDER:
      return {
        ...state,
        STEP: STEP_TYPES.STEP_THREE,
        SELECTED_NETWORK: action.payload,
        CONNECTION_ATTEMPT: CONNECTION_ATTEMPT_TYPES.INITIALIZED
      }
    case ACTION_TYPES.CONNECTION_ATTEMPT:
      return {
        ...state,
        STEP: STEP_TYPES.STEP_FOUR,
        CONNECTION_ATTEMPT: action.payload
      }
    default:
      return {
        ...state,
        CONNECTION_ATTEMPT: CONNECTION_ATTEMPT_TYPES.DEFAULT_FAILED
      }
  }
}

const runConnectorHook = async (selectedConnector, chainId) => {
  switch (selectedConnector) {
    case WALLETS.METAMASK:
      return ethereumHandler.initMetamask()
    case WALLETS.PORTIS:
      return ethereumHandler.initPortisAndLogin(chainId)
    case WALLETS.WALLETCONNECT:
      return ethereumHandler.initWalletConnect(chainId)
    default:
      return // error not supported wallet with error utils
  }
}

/** abstract dropdown logic into separate component */
const ConnectorsWizard = () => {
  const [dropdownStatus, setDropdownStatus] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (state.STEP === STEP_TYPES.STEP_THREE) {
      const runConnectorHookWrapper = async () => {
        try {
          const response = await runConnectorHook(
            state.SELECTED_CONNECTOR,
            state.SELECTED_NETWORK
          )
          dispatch({ type: ACTION_TYPES.CONNECTION_ATTEMPT, payload: response })
        } catch (error) {
          console.error(error)
        }
      }
      runConnectorHookWrapper()
    }
  }, [state])

  /**
   * @param {string} connector   *
   * dispatch provider on click
   */
  const dispatchConnector = connector => {
    dispatch({ type: ACTION_TYPES.SELECT_CONNECTOR, payload: connector })
  }

  /**************************************
   * closes and resets the state to the
   * first step if user clicks outside
   * the dropdown
   ***************************************
   */
  const resetAndCloseDropdown = () => {
    setDropdownStatus(false)
    dispatch({ type: ACTION_TYPES.GO_BACK })
  }

  /**************************************
   * if dropdown is open it calls resetAndCloseDropdown
   * otherwise it open the dropdown
   ***************************************
   */
  const handleDropdown = () => {
    if (dropdownStatus) {
      resetAndCloseDropdown()
    } else {
      setDropdownStatus(true)
    }
  }

  const dropdownContainerRef = useRef()
  useHandleEventOutsideRef(dropdownContainerRef, () => resetAndCloseDropdown())

  return (
    <div style={{ position: 'relative' }} ref={dropdownContainerRef}>
      <StyledDropdownButton
        size='medium'
        dropdownBtnPadding='0 0 0 8px'
        style={{ backgroundColor: '#00E15D', fontWeight: 900, color: 'white' }}
        onClick={() => handleDropdown()}
      >
        <p>Sign up</p>
        <StyledArrowLayout>
          <DropdownDownwardArrow
            size='28px'
            color='#206dff'
            className='arrow'
          />
        </StyledArrowLayout>
      </StyledDropdownButton>

      <StyledConnectDropdownLayout
        size='large'
        active={dropdownStatus}
        itemPadding='12px 0 8px 32px'
      >
        <Connectors
          dispatchConnector={dispatchConnector}
          state={state}
          dispatch={dispatch}
        />
        <div
          style={{
            position: 'absolute',
            zIndex: '1',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
          }}
        >
          <Link
            to='/learn-more'
            style={{
              margin: '0px 8px 04px 0px',
              color: '#767676',
              fontSize: '13px',
              fontWeight: '500'
            }}
          >
            Learn more here
          </Link>
        </div>
      </StyledConnectDropdownLayout>
    </div>
  )
}

export default ConnectorsWizard
