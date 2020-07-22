import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { AUTH_LOGOUT_ENDPOINT } from '../../../config/api-config'
import { navAuthFalseAction } from '../../../redux/NavAuth/navAuthActions'
import { HOME_ROUTE } from '../../../config/routes-config'

const EthereumListener = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const checkAccountChange = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async () => {
        const logout = async () => {
          await axios.get(AUTH_LOGOUT_ENDPOINT)
        }
        logout()
        window.localStorage.removeItem('userPubKey')
        dispatch(navAuthFalseAction)
        history.push(HOME_ROUTE)
      })
    }
  }

  useEffect(() => {
    checkAccountChange()
  })

  return <></>
}
export default EthereumListener
