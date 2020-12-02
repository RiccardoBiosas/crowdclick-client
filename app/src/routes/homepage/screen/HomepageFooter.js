// theirs
import React from 'react'
// styles
import { StyledFooterLayout } from '../styles/HomepageFooterStyles'
// assets
import { FaMedium, FaGithub, FaTelegram } from 'react-icons/fa'
import Logo from '../../../assets/images/Logo.svg'

export const HomepageFooter = () => {
  return (
    <StyledFooterLayout>
      <div className='logo-container'>
        <img src={Logo} alt='crowdclick-logo' />
      </div>

      <div className='logos-container'>
        <a
          href='https://t.me/crowdclick'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaTelegram className='footerIcon' />
        </a>
        <a
          href='https://medium.com/crowdclick'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaMedium className='footerIcon' />
        </a>

        <a
          href='https://github.com/crowd-tools/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaGithub className='footerIcon' />
        </a>
      </div>
    </StyledFooterLayout>
  )
}
