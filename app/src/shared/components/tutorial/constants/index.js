import React from 'react'
// styles
import { StyledGeneralHeadingTwo } from '../../../styles/StyledGeneralHeadings'
// assets
import {
  configureMaticMumbai,
  getEtherFromMaticFaucet
} from '../../../../assets'

export const maticWithEthereumSteps = [
  {
    step: 1,

    text: (
      <StyledGeneralHeadingTwo headingColor='#9D9FA4' headingFontSize='1.4rem'>
        <span style={{ fontWeight: 900, fontSize: '1.6rem' }}>Step 1:</span>{' '}
        Sign in & add Matic Mumbai Testnet to MetaMask.
      </StyledGeneralHeadingTwo>
    ),
    video: configureMaticMumbai
  },
  {
    step: 2,
    text: (
      <StyledGeneralHeadingTwo headingFontSize='1.4rem' headingColor='#9D9FA4'>
        <strong style={{ fontWeight: 900, fontSize: '1.6rem' }}>Step 2:</strong>{' '}
        Go to{' '}
        <a
          style={{ color: '#9D9FA4' }}
          href='https://faucet.matic.network/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Matic faucet{' '}
        </a>
        and receive Matic coin.
      </StyledGeneralHeadingTwo>
    ),

    video: getEtherFromMaticFaucet
  },
  {
    step: 3,
    text: (
      <StyledGeneralHeadingTwo headingColor='#9D9FA4' headingFontSize='1.4rem'>
        <span style={{ fontWeight: 900, fontSize: '1.6rem' }}>Step 3:</span>{' '}
        Ready to go! You can create a task, spend & test.
      </StyledGeneralHeadingTwo>
    ),
    video: getEtherFromMaticFaucet
  }
]
