import React from 'react'
import { Helmet } from 'react-helmet'

//Styled
import StyledGeneralButton from '../../styles/StyledGeneralButton'

const MaticWidgetAll = () => {
  return (
    <div>
      <Helmet>
        <script
          src='https://wallet.matic.today/embeds/widget-button.js'
          data-script-name='matic-embeds'
        ></script>
      </Helmet>
      <StyledGeneralButton
        buttonWidth='100'
        buttonColor='blue'
        buttonTextColor='white'
        type='button'
        className='matic-widget-button'
        data-default-page='home'
        data-wapp-id={process.env.REACT_APP_MATIC_WIDGET_ID}
      >
        Send
      </StyledGeneralButton>
    </div>
  )
}

export default MaticWidgetAll