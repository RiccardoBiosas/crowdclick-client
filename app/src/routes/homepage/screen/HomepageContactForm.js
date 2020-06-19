 import React from 'react'
import axios from 'axios'
import { 
  ContactFormContainer,
  ContactHeading,
  FlexContactFormContainer,
  ContactFormImgContainer,
  InputFormContainer,
  ContactFormButton,
  SpinnerContainer
} from '../styles/HomepageContactFormStyles'
import Stay_in_the_loop from '../../../assets/homepage/img4.svg'
import aeternity_stay_in_the_loop from '../../../assets/images/aeternity_stay_in_the_loop.svg'
import { Checkmark } from '../../../shared/Checkmark'
import { ReactComponent as SvgSuccess } from '../../../assets/SVG/Success.svg';
import { ReactComponent as SvgFailure } from '../../../assets/SVG/Failure.svg';
import { SUBSCRIBE_ENDPOINT } from '../../../config/api-config'


export default class HomepageContactForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      input: '',
      userEmail: '',
      showNotification: false,
      successfulPostReq: null
    }
    this.interval = null    
  }


  handleChange = e => {
    const text = e.target.value
    this.setState({
      input: text
    })
  }

  forwardEmail = async userEmail => {
    try {
      const response = await axios.post(
        SUBSCRIBE_ENDPOINT,
        {
          email: userEmail
        }
      )
      this.setState({ successfulPostReq: true, showNotification: true })
    } catch (error) {
      console.error(error)
      this.setState({ successfulPostReq: false, showNotification: true })
    }
  }

  handleClick = async () => {
    await this.setState({
      userEmail: this.state.input,
      input: ''
    })
    await this.forwardEmail(this.state.userEmail)
  }

  handleKeyDown = async e => {
    if (e.keyCode === 13) {
      await this.setState({
        userEmail: this.state.input,
        input: ''
      })
      await this.forwardEmail(this.state.userEmail)
    }
  }

  componentDidUpdate () {
    if (this.state.showNotification) {
      this.interval = setTimeout(() => {
        this.setState({
          successfulPostReq: null,
          showNotification: false
        })
      }, 3000)
    }
  }

  render () {

    return (
        <ContactFormContainer currencyTheme={this.props.currencyTheme} id="temporaryContactFormFooterID">
          <ContactFormImgContainer>
            <img
              src={
                this.props.currencyTheme === 'ethereumStyle'
                  ? Stay_in_the_loop
                  : aeternity_stay_in_the_loop
              }  
              alt="cryptocurrency theme"            
            />
          </ContactFormImgContainer>

          <FlexContactFormContainer>
            <ContactHeading>
              <h3>Launch Coming Soon…</h3>
              <label htmlFor='subscribeForm'>Get notified about the launch & updates</label>
            </ContactHeading>        
            <SpinnerContainer>
              {this.state.showNotification && (
                <Checkmark type={"block"}>
                  {
                    this.state.successfulPostReq ? <SvgSuccess /> : <SvgFailure />
                  }
                </Checkmark>
              )}
            </SpinnerContainer>


            <InputFormContainer>
              { this.state.showNotification &&  (
                <Checkmark type={"inline"}>
                  {
                    this.state.successfulPostReq ? <SvgSuccess /> : <SvgFailure />
                  }
                </Checkmark>
              )}

              <input
                id='subscribeForm'
                placeholder='Email Address'
                onChange={this.handleChange}
                value={this.state.input}
                onKeyDown={this.handleKeyDown}
                className='inputContactForm'
                autoComplete='off'
              />

              <ContactFormButton
                currencyTheme={this.props.currencyTheme}
                onClick={this.handleClick}
              >
                Get Started
              </ContactFormButton>
            </InputFormContainer>
          </FlexContactFormContainer>
        </ContactFormContainer>
    )
  }
}

