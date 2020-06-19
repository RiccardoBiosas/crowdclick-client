import React, { useState, useRef } from 'react'
import { useHistory, } from 'react-router-dom'
import { useDispatch} from "react-redux" 
import {
  DropdownContainer,
  DropdownContainerList,
  DropdownContainerListItem,
  DropdownMainComponent,
  ArrowContainer,
  StyledNavLink
} from './styles/DropdownComponentStyles'
import { useHandleEventOutsideRef } from '../../../hooks/useHandleEventOutsideRef'
import axios from "axios"
import { AUTH_LOGOUT_ENDPOINT } from '../../../config/api-config'


import { navAuthFalseAction } from '../../../redux/NavAuth/navAuthActions'
import { USER_TASKS_ROUTE, PUBLISHER_DASHBOARD_ROUTE } from '../../../config/routes-config'
axios.defaults.withCredentials = true



export const AccountDropdown = () => {
  const [dropdownStatus, setDropdownStatus] = useState(false)

  const dispatch = useDispatch()
  let history = useHistory()
  const dropdownContainerRef = useRef()

  useHandleEventOutsideRef(dropdownContainerRef, () => setDropdownStatus(false))

  const handleClick = () => {
    const logout = async() => {
      const resp = await axios.get(AUTH_LOGOUT_ENDPOINT)
 
      window.localStorage.removeItem("userPubKey")
      dispatch(navAuthFalseAction)
      history.push("/")      

    }
    logout()
  }



  return (
      <DropdownContainer ref={dropdownContainerRef} size={'medium'}>
        <DropdownMainComponent
          onClick={() => setDropdownStatus(!dropdownStatus)}
        >
          <div>
            <p>ACCOUNT</p>
          </div>
          <ArrowContainer>
            <div className='arrow down' />
          </ArrowContainer>
        </DropdownMainComponent>
        <DropdownContainerList active={dropdownStatus}>
          {/* <DropdownContainerListItem onClick={() => setRedirectState({redirect: true, path: "/publisher-dashboard"})}>publisher</DropdownContainerListItem>
              <DropdownContainerListItem onClick={() => setRedirectState({redirect: true, path: "/wizard"})}>new task</DropdownContainerListItem> */}
          {/* <DropdownContainerListItem
            onClick={() =>
              history.push("/user-tasks")
            }
          >
            Tasks
          </DropdownContainerListItem> */}
          
          {/* <DropdownContainerListItem
            onClick={() =>
              history.push("/publisher-dashboard")
            }
          >
            Campaigns
          </DropdownContainerListItem> */}
          <StyledNavLink to={USER_TASKS_ROUTE} activeStyle={{color: "#206DFF", fontWeight: "900"}}>
            Tasks
          </StyledNavLink>
          <StyledNavLink to={PUBLISHER_DASHBOARD_ROUTE} activeStyle={{color: "#206DFF", fontWeight: "900"}}>
            Campaigns
          </StyledNavLink>
          <DropdownContainerListItem
            onClick={handleClick}
          >
            Logout
          </DropdownContainerListItem>
        </DropdownContainerList>
      </DropdownContainer>
  )
}
