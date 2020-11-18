import React from 'react'
// styles
import { StyledGeneralHeadingTwo } from '../../../styles/StyledGeneralHeadings'
// assets
import {
  configureMaticMumbai,
  getEtherFromMaticFaucet
} from '../../../../assets'
import StyledGeneralParagraph from '../../../styles/StyledGeneralParagraph'

export const maticWithEthereumSteps = [
  {
    step: 1,

    text: (
      <>
        <StyledGeneralHeadingTwo
          headingColor='#9D9FA4'
          headingFontSize='1.3rem'
        >
          <span style={{ fontWeight: 900, fontSize: '1.4rem' }}>Step 1:</span>{' '}
          Sign in {'&'} add Matic Mumbai Testnet to MetaMask. <br />
        </StyledGeneralHeadingTwo>
        <StyledGeneralParagraph
          paragraphColor='#9D9FA4'
          paragraphLineHeight='1.4'
          paragraphMargin='0'
        >
          Add the following URL as a custom RPC on your metamask:{' '}
          <span style={{ fontWeight: 900 }}>
            https://rpc-mumbai.matic.today
          </span>
          <br />
          Read more on the{' '}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://docs.matic.network/docs/develop/metamask/testnet/'
            style={{ textDecoration: 'none', fontWeight: '900' }}
          >
            official matic tutorial
          </a>
        </StyledGeneralParagraph>
      </>
    ),
    video: configureMaticMumbai
  },
  {
    step: 2,
    text: (
      <StyledGeneralHeadingTwo headingFontSize='1.3rem' headingColor='#9D9FA4'>
        <strong style={{ fontWeight: 900, fontSize: '1.4rem' }}>Step 2:</strong>{' '}
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
      <StyledGeneralHeadingTwo headingColor='#9D9FA4' headingFontSize='1.3rem'>
        <span style={{ fontWeight: 900, fontSize: '1.4rem' }}>Step 3:</span>{' '}
        Ready to go! You can create a task, spend & test.
      </StyledGeneralHeadingTwo>
    ),
    video: getEtherFromMaticFaucet
  }
]
