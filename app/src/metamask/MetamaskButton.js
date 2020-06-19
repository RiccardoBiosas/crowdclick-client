import React, { Component, Fragment } from 'react'
import Web3 from 'web3'
import Web3Utils from 'web3-utils'
import { connect } from 'react-redux'
import axios from 'axios'
import { GlobalButton } from '../shared/GlobalButton'
import { AUTH_ENDPOINT } from '../config/api-config'
import{ createPortal } from 'react-dom'
import { MetamaskModal } from './MetamaskModal'
import {  navAuthTrueAction } from '../redux/NavAuth/navAuthActions'

axios.defaults.withCredentials = true

const modalRoot = document.getElementById('portal-root')

class MetamaskButton extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentAddress: null,
      showInstallMetamaskModal: false
    }
    this.handleModal = this.handleModal.bind(this)
  }


  checkMetamask = async () => {
    let account
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)

      try {
        account = await window.ethereum.enable()
          // window.web3.setProvider('http://localhost:8545');

      } catch (error) {
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      // alert("To be a user please install Metamask browser extension to continue. Our Web 3.0 application doesn’t collect any user data and is completely safe to protect your identity.")
      this.setState({
        showInstallMetamaskModal: true
      })
    }

    if (account) {
      console.log("CURRENT METAMASK ACCOUNT", account)
      this.setState({
        currentAddress: account
      })
      console.log('auth endpoint', AUTH_ENDPOINT)
      const nonceData = await axios.get(AUTH_ENDPOINT)
      const nonce = nonceData.data.nonce
        ? nonceData.data.nonce
        : nonceData.data.username
      const coinbase = await window.web3.eth.getCoinbase(console.log)

      const sig = await window.web3.eth.sign(
        // Web3Utils.sha3(nonce.data.nonce),
        Web3Utils.sha3(nonce),
        coinbase,
        console.log
      )

      const response = await axios.post(AUTH_ENDPOINT, {
        user_address: coinbase,
        user_signature: sig
      })

      if (response.data.is_authenticated === true) {
  
        this.props.signedNavbar()
        window.localStorage.setItem('userPubKey', `"${coinbase}"`)
        if(this.props.cb_login) {
          this.props.cb_login()
        }
      }
    }
  }

  checkAccount = () => {
    window.ethereum.on('accountsChanged', accounts => {
      this.setState({
        currentAddress: accounts[0]
      })
    })
  }

  handleModal() {
    this.setState({
      showInstallMetamaskModal: false
    })
  }


 

  render () {

    const {btnColor, btnWidth, btnText} = this.props

    return (
      <Fragment>
        {this.state.showInstallMetamaskModal && createPortal(<MetamaskModal handleModalCallback={this.handleModal} />, modalRoot )}
        <GlobalButton
          buttonColor={btnColor}
          buttonTextColor={'#FFFFFF'}
          buttonWidth={btnWidth}
          onClick={this.checkMetamask}
        >
          connect
        </GlobalButton>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    signedNavbar: () => dispatch(navAuthTrueAction)
  }
  
}


export default connect(null, mapDispatchToProps)(MetamaskButton)



