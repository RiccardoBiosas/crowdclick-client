const CrowdclickEscrow = artifacts.require('CrowdclickEscrow')
const { assert } = require('chai')
const { convertFromWeiToEthereum, approximateEquality } = require('../helpers')

const mockCampaigns = [
  {
    ethBudget: '0.4',
    ethReward: '0.03',
    campaignUrl: 'https://ethereum.org/en/'
  }
]

contract('Crowdclick escrow contract', accounts => {
  const contractOwner = accounts[0]
  const publisher = accounts[1]
  const user = accounts[2]
  let crowdclickEscrowContractInstance

  before(async () => {
    crowdclickEscrowContractInstance = await CrowdclickEscrow.deployed()
  })

  it('should show 0 as the initial contract balance of the publisher', async () => {
    const publisherContractWeiBalance = await crowdclickEscrowContractInstance.balanceOfPublisher(
      publisher
    )
    const publisherContractEtherereumBalance = convertFromWeiToEthereum(
      publisherContractWeiBalance
    )
    assert.equal(publisherContractEtherereumBalance, 0)
  })

  it('should show 0 as the initial balance of the user', async () => {
    const userContractWeiBalance = await crowdclickEscrowContractInstance.balanceOfPublisher(
      user
    )
    const userContractEtherereumBalance = convertFromWeiToEthereum(
      userContractWeiBalance
    )
    assert.equal(userContractEtherereumBalance, 0)
  })

  it("should show the publisher's contract balance as equal to the budget of the first publisher's task being created", async () => {
    const campaign = mockCampaigns[0]
    const budgetToWei = web3.utils.toWei(campaign.ethBudget)
    const rewardToWei = web3.utils.toWei(campaign.ethReward)
    await crowdclickEscrowContractInstance.openTask(
      budgetToWei,
      rewardToWei,
      campaign.campaignUrl,
      {
        from: publisher,
        value: budgetToWei
      }
    )
    const publisherContractWeiBalance = await crowdclickEscrowContractInstance.balanceOfPublisher(
      publisher
    )
    const publisherContractEtherereumBalance = convertFromWeiToEthereum(
      publisherContractWeiBalance
    )
    assert.equal(
      publisherContractEtherereumBalance,
      parseFloat(campaign.ethBudget, 10)
    )
  })

  it("should forward the reward for the task previously created and increase the user's contract balance by an amount equal to the campaign's reward", async () => {
    const campaign = mockCampaigns[0]
    await crowdclickEscrowContractInstance.forwardRewards(
      user,
      publisher,
      campaign.campaignUrl,
      {
        from: contractOwner
      }
    )
    const userContractWeiBalance = await crowdclickEscrowContractInstance.balanceOfUser(
      user
    )
    const userContractEtherereumBalance = convertFromWeiToEthereum(
      userContractWeiBalance
    )
    assert.equal(userContractEtherereumBalance, '0.03')
  })

  it("should show the publisher's contract balance as the initially allocated campaign budget minus the previously forwarded reward", async () => {
    const campaign = mockCampaigns[0]
    const publisherContractWeiBalance = await crowdclickEscrowContractInstance.balanceOfPublisher(
      publisher
    )
    const publisherContractEtherereumBalance = convertFromWeiToEthereum(
      publisherContractWeiBalance
    )
    const userContractWeiBalance = await crowdclickEscrowContractInstance.balanceOfUser(
      user
    )
    const userContractEtherereumBalance = convertFromWeiToEthereum(
      userContractWeiBalance
    )
    const expectedPublisherContractEthereumBalance =
      parseFloat(campaign.ethBudget) - userContractEtherereumBalance

    assert.equal(
      publisherContractEtherereumBalance,
      expectedPublisherContractEthereumBalance
    )
  })

  it("should allow the user to withdraw the earned balance and show the user's ethereum wallet balance as the initial balance plus the withdrawn balance minus the gas fee estimate", async () => {
    const userInitialWalletBalance = await web3.eth.getBalance(user)
    const weiBalanceToWithdraw = '0.03'
    const ethbalanceToWithdraw = web3.utils.toWei(weiBalanceToWithdraw)
    await crowdclickEscrowContractInstance.withdrawUserBalance(
      ethbalanceToWithdraw,
      { from: user }
    )
    const userFinalBalance = await web3.eth.getBalance(user)
    const expectedBalance =
      parseFloat(userInitialWalletBalance, 10) +
      parseFloat(ethbalanceToWithdraw, 10)
    const userFinalBalanceToEthereum = convertFromWeiToEthereum(
      userFinalBalance
    )
    const expectedBalanceToEthereum = convertFromWeiToEthereum(
      expectedBalance.toString()
    )
    assert.isTrue(
      approximateEquality(userFinalBalanceToEthereum, expectedBalanceToEthereum)
    )
  })

  it("should allow the publisher to withdraw the remaining allocated budget from the campaign and update the publisher's wallet balance as the remaining allocated budget on the given campaign minus the reward previously forwarded", async () => {
    const campaign = mockCampaigns[0]
    const publisherInitialWalletWeiBalance = await web3.eth.getBalance(
      publisher
    )
    const publisherInitialWalletEthereumBalance = convertFromWeiToEthereum(
      publisherInitialWalletWeiBalance
    )

    await crowdclickEscrowContractInstance.withdrawFromCampaign(
      campaign.campaignUrl,
      {
        from: publisher
      }
    )

    const publisherFinalWalletWeiBalance = await web3.eth.getBalance(publisher)
    const publisherFinalWalletEthereumBalance = convertFromWeiToEthereum(
      publisherFinalWalletWeiBalance
    )
    const publisherExpectedFinalEthereumBalance =
      parseFloat(publisherInitialWalletEthereumBalance, 10) +
      parseFloat(campaign.ethBudget, 10) -
      parseFloat(campaign.ethReward, 10)

    assert.isTrue(
      approximateEquality(
        publisherExpectedFinalEthereumBalance,
        publisherFinalWalletEthereumBalance
      )
    )
  })
})
