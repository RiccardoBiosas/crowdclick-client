import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router-dom'
import  StyledGlobalButton  from '../shared/styles/StyledGlobalButton'






export const useRedirectWithProps = (route, btnColor, btnText, params) => {
  const [redirect, setRedirect] = useState(false)

  return (
    <Fragment>
      <StyledGlobalButton
        buttonColor={btnColor}
        buttonMargin={'0px 20px 20px 0px'}
        buttonTextColor={'#FFFFFF'}
        buttonWidth={200}
        onClick={() => setRedirect(true)}
      >
        {btnText}
      </StyledGlobalButton>
      {redirect && <Redirect push to={{
        pathname: route,        
        state: {...params}
      }} />}
    </Fragment>
  )
}
