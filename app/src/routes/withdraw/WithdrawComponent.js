// theirs
import React, { useState, useEffect, useCallback } from 'react'
// styles
import StyledGeneralCardLayout from '../../shared/styles/StyledGeneralCardLayout'
import StyledGeneralCardWrapper from '../../shared/styles/StyledGeneralCardWrapper'
import StyledGeneralSubmitButton from '../../shared/styles/StyledGeneralSubmitButton'

const WithdrawBalance = ({ contract, address, account }) => {
  console.log('withdraw balance', contract)
  const [userBalance, setUserBalance] = useState()
  const fetchBalance = useCallback(async () => {
    console.log('contract functions ', contract.functions)
    const balance = await contract.functions.balancesOfUser(account)
    console.log('USER BALACNE ON THE CONTRACT IS ', balance)

    setUserBalance(balance)
  })
  useEffect(() => {
    if (!userBalance) {
      fetchBalance()
    }
  }, [userBalance])
  return (
    <StyledGeneralCardLayout>
      <div>
        <h1>Withdraw Your Funds As A User</h1>
      </div>
      <StyledGeneralCardWrapper>
        {/* <p>Your current earnings: {userBalance || ''} </p> */}
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: '60%'
          }}
          // onSubmit={withdraw}
        >
          <label
            style={{ color: '#9EA0A5', fontWeight: 900 }}
            htmlFor='withdrawInput'
          >
            Amount in Ethereum
          </label>
          <input
            style={{
              width: '380px',
              background: '#FFFFFF 0% 0% no-repeat padding-box',
              height: '38px',
              borderRadius: '4px',
              border: ' 1px solid #E2E5ED'
            }}
            id='withdrawInput'
            type='number'
            // onChange={e => setUserInput(e.target.value)}
          />
          <StyledGeneralSubmitButton
            buttonWidth='380px'
            buttonColor='blue'
            buttonTextColor='white'
            type='submit'
          >
            Confirm withdrawal
          </StyledGeneralSubmitButton>
        </form>
      </StyledGeneralCardWrapper>
    </StyledGeneralCardLayout>
  )
}

export default WithdrawBalance
