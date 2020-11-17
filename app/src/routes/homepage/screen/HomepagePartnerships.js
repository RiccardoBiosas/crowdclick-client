// theirs
import React from 'react'
import '../styles/carousel.css'
import { Carousel } from 'react-responsive-carousel'
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
    <StyledGeneralColumnWrapper columnHeight='100%' columnWidth='100%'>
      <StyledGeneralHeadingTwo headingColor='#636262'>
        Partners {'&'} Accomplishments
      </StyledGeneralHeadingTwo>
      <Carousel autoPlay infiniteLoop width='100%' style={{ width: '100%' }}>
        {/* <StyledGeneralRowWrapper rowHeight='18rem'> */}
        <StyledGeneralColumnWrapper
          columnHeight='90%'
          columnJustify='space-between'
          style={{ backgroundColor: '#F3F6FE' }}
        >
          <div style={{ height: '60%' }}>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://matic.today/'
              style={{ display: 'inline-block' }}
            >
              <img src={maticSponsor} alt='matic-icon' />
            </a>
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
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://hacktothemoon.com/'
              style={{ display: 'inline-block' }}
            >
              <img src={hackToTheMoonSponsor} alt='hackToTheMoon-icon' />
            </a>
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
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.aeternitystarfleet.com/'
              style={{ display: 'inline-block' }}
            >
              <img src={startfleetSponsor} alt='starfleet-icon' />
            </a>
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
        {/* </StyledGeneralRowWrapper> */}
      </Carousel>
    </StyledGeneralColumnWrapper>
  )
}

export default HomepagePartnerships
