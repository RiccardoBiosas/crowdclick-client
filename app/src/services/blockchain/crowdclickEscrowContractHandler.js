import Contract from 'web3-eth-contract'
import config from '../../constants/config/env-config'
import { parseWeiToEtherString } from '../../utils'

const crowdclickEscrowContractAbi = config.blockchain.contracts

/** enforce singleton */
export class CrowdclickEscrowContractHandler {
  constructor (_contractAddress, _web3Provider, _currentAccount) {
    console.groupCollapsed('CrowdclickEscrowContractHandler constructor')
    console.log('_contractAddress: ', _contractAddress)
    console.log('_web3provider ', _web3Provider)
    console.log('_currentAccount: ', _currentAccount)
    console.groupEnd()

    this.currentAccount = _currentAccount.toLowerCase()
    Contract.setProvider(_web3Provider)
    this.contract = new Contract(crowdclickEscrowContractAbi, _contractAddress)
  }

  async openTask (budgetToWei, rewardToWei, projectURL) {
    const transaction = await this.contract.methods
      .openTask(budgetToWei, rewardToWei, projectURL)
      .send({
        from: this.currentAccount
      })

    return transaction
  }

  async balanceOfUser () {
    const balance = await this.contract.methods
      .balancesOfUser(this.currentAccount)
      .call({
        from: this.currentAccount
      })
    return parseWeiToEtherString(balance)
  }

  async balanceOfPublisher () {
    const balance = await this.contract.methods
      .balancesOfPublisher(this.currentAccount)
      .call({
        from: this.currentAccount
      })
    return parseWeiToEtherString(balance)
  }

  async withdrawUserBalance (balanceToWei, address) {
    // const transaction = await this.contract.functions.withdrawUserBalance(
    //   balanceToWei
    // )
    const transaction = await this.contract.methods
      .withdrawUserBalance(balanceToWei)
      .send({
        from: this.currentAccount
      })
    return transaction
  }

  async withdrawFromCampaign (projectURL) {
    // const transaction = await this.contract.functions.withdrawFromCampaign(
    //   projectURL
    // )
    // return transaction
    const transaction = await this.contract.methods
      .withdrawUserBalance(projectURL)
      .send({
        from: this.currentAccount
      })
    return transaction
  }
}
