// theirs
import React, { useState, useRef } from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// assets
import { MdKeyboardArrowDown } from 'react-icons/md'
import { navAuthFalseAction } from '../../../../redux/NavAuth/navAuthActions'
// styles
import {
  StyledArrowLayout,
  StyledDropdownLayout,
  StyledDropdownButton
} from '../../../styles/StyledDropdownLayout'
// utils
import crowdclickClient from '../../../../services/api/crowdclickService'
import { useHandleEventOutsideRef } from '../../../../hooks/useHandleEventOutsideRef'
// constants
import {
  USER_TASKS_LIST_ROUTE,
  PUBLISHER_DASHBOARD_ROUTE,
  HOME_ROUTE,
  TUTORIAL_ROUTE,
  USER_WITHDRAW_ROUTE
} from '../../../../constants/config/routes-config'
import { SCOPED_LOCAL_STORAGE_USER_PUBLIC_KEY } from '../../../../constants/localStorage'
import { splitTextWithEllipsis } from '../../../../utils'
import useCopyToClipboard from '../../../../hooks/useCopyToClipboard'
import WithWeb3Initializer from '../../../../hoc/withWeb3Initializer'
import ethereumHandler from '../../../../services/blockchain/ethereumHandler'

const AccountDropdown = ({ account }) => {
  const [dropdownStatus, setDropdownStatus] = useState(false)

  const [web3Singleton, setWeb3Singleton] = useState(() =>
    ethereumHandler.getWeb3Singleton()
  )
  const [clipboardtext, setValue] = useCopyToClipboard()
  const dropdownContainerRef = useRef()
  useHandleEventOutsideRef(dropdownContainerRef, () => setDropdownStatus(false))
  const dispatch = useDispatch()
  const history = useHistory()

  /** TODO: replace */
  const handleClick = async () => {
    await crowdclickClient.logout()
    window.localStorage.removeItem(SCOPED_LOCAL_STORAGE_USER_PUBLIC_KEY)
    dispatch(navAuthFalseAction)
    history.push(HOME_ROUTE)
  }

  return (
    <div style={{ position: 'relative' }} ref={dropdownContainerRef}>
      <StyledDropdownButton
        size='medium'
        dropdownBtnPadding='0 0 0 8px'
        onClick={() => setDropdownStatus(!dropdownStatus)}
      >
        <p
          role='button'
          style={{ cursor: 'pointer' }}
          onClick={() =>
            setValue(
              web3Singleton.account,
              `address copied: ${web3Singleton.account}`
            )
          }
        >
          {web3Singleton.account
            ? splitTextWithEllipsis(web3Singleton.account, 3)
            : 'ACCOUNT'}
        </p>
        <StyledArrowLayout>
          <MdKeyboardArrowDown size='28px' color='#206dff' className='arrow' />
        </StyledArrowLayout>
      </StyledDropdownButton>

      <StyledDropdownLayout
        size='medium'
        active={dropdownStatus}
        activeHeight='12.4rem'
        itemPadding='12px 0 8px 32px'
      >
        <li>
          <NavLink
            className='dropdown-item'
            to={TUTORIAL_ROUTE}
            activeStyle={{ color: '#206DFF', fontWeight: '900' }}
          >
            Tutorial
          </NavLink>
        </li>
        <li>
          <NavLink
            className='dropdown-item'
            to={USER_TASKS_LIST_ROUTE}
            activeStyle={{ color: '#206DFF', fontWeight: '900' }}
          >
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink
            className='dropdown-item'
            to={PUBLISHER_DASHBOARD_ROUTE}
            activeStyle={{ color: '#206DFF', fontWeight: '900' }}
          >
            Campaigns
          </NavLink>
        </li>
        <li>
          <NavLink
            className='dropdown-item'
            to={USER_WITHDRAW_ROUTE}
            activeStyle={{ color: '#206DFF', fontWeight: '900' }}
          >
            Withdraw
          </NavLink>
        </li>
        <li role='button' className='dropdown-item' onClick={handleClick}>
          Logout
        </li>
      </StyledDropdownLayout>
    </div>
  )
}

// const AccountDropdown = () => WithWeb3Initializer(WrappedAccountDropdown)

export default AccountDropdown
