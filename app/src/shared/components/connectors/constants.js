import { CONNECTORS_ERROR } from '../../../constants/blockchain'

export const CONNECTION_ATTEMPT_TYPES = Object.freeze({
  UNINITIALIZED: 'UNINITIALIZED',
  INITIALIZED: 'INITIALIZED',
  DEFAULT_FAILED: {
    wasLoginSuccessful: false,
    error: CONNECTORS_ERROR.GENERIC_ERROR
  },
  DEFAULT_SUCCEEDED: {
    wasLoginSuccessful: true,
    error: false
  }
})

export const STEP_TYPES = Object.freeze({
  STEP_ONE: 1,
  STEP_TWO: 2,
  STEP_THREE: 3,
  STEP_FOUR: 4,
  STEP_FIVE: 5
})

export const ACTION_TYPES = Object.freeze({
  SELECT_CONNECTOR: 'SELECT_CONNECTOR',
  SELECT_NETWORK: 'SELECT_NETWORK',
  CONNECTION_ATTEMPT: 'CONNECTION_ATTEMPT',
  GO_BACK: 'GO_BACK'
})

export const initialState = Object.freeze({
  STEP: STEP_TYPES.STEP_ONE,
  SELECTED_CONNECTOR: undefined,
  SELECTED_NETWORK: undefined,
  CONNECTION_ATTEMPT: CONNECTION_ATTEMPT_TYPES.UNINITIALIZED
})
