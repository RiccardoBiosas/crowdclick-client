import React from 'react'
import { Helmet } from 'react-helmet'

//Styled
import StyledGeneralButton from '../../styles/StyledGeneralButton'

const MaticWidgetWithdraw = () => {
  return (
    <div>
      <Helmet>
        <script
          src='https://wallet.matic.today/embeds/widget-button.js'
          data-script-name='matic-embeds'
        ></script>
      </Helmet>
      <StyledGeneralButton
        buttonColor='blue'
        buttonTextColor='#FFFFFF'
        buttonWidth='140'
        type='button'
        className='matic-widget-button'
        data-default-page='withdraw'
        data-wapp-id={process.env.REACT_APP_MATIC_WIDGET_ID}
      >
        Withdraw
      </StyledGeneralButton>
    </div>
  )
}

export default MaticWidgetWithdraw
