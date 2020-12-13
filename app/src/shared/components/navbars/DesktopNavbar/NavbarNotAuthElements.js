// theirs
import React from 'react'
// assets
import { TelegramIcon } from '../../../../assets/index'
import { TUTORIAL_ROUTE } from '../../../../constants/config/routes-config'
// styles
import {
  StyledFirstDivGroup,
  StyledTelegramLink,
  StyledRouterLink
} from './styles/DesktopNavbarStyles'

export const NavbarNotAuthElements = () => {
  return (
    <StyledFirstDivGroup>
      <div>
        <StyledRouterLink
          to={TUTORIAL_ROUTE}
        >
          How it works
        </StyledRouterLink>
      </div>
      <StyledTelegramLink
        styledTextColor={'#FFFFFF'}
        styledWidth={140}
        target='_blank'
        href='https://t.me/crowdclick'
        rel='noopener noreferrer'
      >
        Launch on <TelegramIcon size={24} />
      </StyledTelegramLink>
    </StyledFirstDivGroup>
  )
}
