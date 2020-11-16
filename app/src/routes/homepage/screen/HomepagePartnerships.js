// theirs
import React from 'react'
// styles
import { StyledGeneralHeadingTwo } from '../../../shared/styles/StyledGeneralHeadings'
import StyledGeneralRowWrapper from '../../../shared/styles/StyledGeneralRowWrapper'
import StyledGeneralColumnWrapper from '../../../shared/styles/StyledGeneralColumnWrapper'
import StyledGeneralParagraph from '../../../shared/styles/StyledGeneralParagraph'
// assets
import {
  hackToTheMoonSponsor,
  maticSponsor,
  startfleetSponsor
} from '../../../assets'

const HomepagePartnerships = () => {
  return (
    <StyledGeneralColumnWrapper rowHeight='100%'>
      <StyledGeneralHeadingTwo headingColor='#636262'>
        Partners {'&'} Accomplishments
      </StyledGeneralHeadingTwo>
      <StyledGeneralRowWrapper rowHeight='18rem'>
        <StyledGeneralColumnWrapper
          columnHeight='90%'
          columnJustify='space-between'
        >
          <div style={{ height: '60%' }}>
            <img src={maticSponsor} alt='matic-icon' />
          </div>
          <div style={{ height: '40%' }}>
            <StyledGeneralParagraph
              paragraphColor='#636262'
              paragraphFontSize='1.1rem'
              paragraphFontWeight='500'
              paragraphLineHeight='1.6'
            >
              Built on Matic’s sidechain <br /> to allow fast {'&'} affordable
              transactions
            </StyledGeneralParagraph>
          </div>
        </StyledGeneralColumnWrapper>
        <StyledGeneralColumnWrapper
          columnHeight='90%'
          columnJustify='space-between'
        >
          <div style={{ height: '60%' }}>
            <img src={hackToTheMoonSponsor} alt='hackToTheMoon-icon' />
          </div>
          <div style={{ height: '40%' }}>
            <StyledGeneralParagraph
              paragraphColor='#636262'
              paragraphFontSize='1.1rem'
              paragraphFontWeight='500'
              paragraphLineHeight='1.6'
            >
              Hacktothemoon track winners <br /> sponsored by Binance
            </StyledGeneralParagraph>
          </div>
        </StyledGeneralColumnWrapper>
        <StyledGeneralColumnWrapper
          columnHeight='90%'
          columnJustify='space-between'
        >
          <div style={{ height: '60%' }}>
            <img src={startfleetSponsor} alt='starfleet-icon' />
          </div>
          <div style={{ height: '40%' }}>
            <StyledGeneralParagraph
              paragraphColor='#636262'
              paragraphFontSize='1.1rem'
              paragraphFontWeight='500'
              paragraphLineHeight='1.6'
            >
              Top 10 finalist of <br /> Aeternity blockchain’s Starfleet
              Accelerator
            </StyledGeneralParagraph>
          </div>
        </StyledGeneralColumnWrapper>
      </StyledGeneralRowWrapper>
    </StyledGeneralColumnWrapper>
  )
}

export default HomepagePartnerships
