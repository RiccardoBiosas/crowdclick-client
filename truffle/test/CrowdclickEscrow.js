const CrowdclickEscrow = artifacts.require('CrowdclickEscrow')
const { assert } = require('chai')
const { convertFromWeiToEthereum, approximateEquality } = require('../helpers')

const mockCampaigns = [
  {
    taskBudget: '0.4',
    taskReward: '0.03',
    currentBudget: '0.4',
    url: 'https://ethereum.org/en/',
    isActive: true
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
    const budgetToWei = web3.utils.toWei(campaign.taskBudget)
    const rewardToWei = web3.utils.toWei(campaign.taskReward)
    await crowdclickEscrowContractInstance.openTask(
      budgetToWei,
      rewardToWei,
      campaign.url,
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
      parseFloat(campaign.taskBudget, 10)
    )
  })

  it("should forward the reward for the task previously created and increase the user's contract balance by an amount equal to the campaign's reward", async () => {
    const campaign = mockCampaigns[0]
    await crowdclickEscrowContractInstance.forwardRewards(
      user,
      publisher,
      campaign.url,
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
      parseFloat(campaign.taskBudget) - userContractEtherereumBalance

    assert.equal(
      publisherContractEtherereumBalance,
      expectedPublisherContractEthereumBalance
    )
  })

  it("should allow the user to withdraw the earned balance and show the user's ethereum wallet balance as the initial balance plus the withdrawn balance minus the gas fee estimate", async () => {
    const campaign = mockCampaigns[0]
    const userInitialWalletBalance = await web3.eth.getBalance(user)
    const taskRewardToEth = web3.utils.toWei(campaign.taskReward)
    await crowdclickEscrowContractInstance.withdrawUserBalance(
      taskRewardToEth,
      { from: user }
    )
    const expectedBalance =
      parseFloat(userInitialWalletBalance, 10) + parseFloat(taskRewardToEth, 10)
    const expectedBalanceToEthereum = convertFromWeiToEthereum(
      expectedBalance.toString()
    )

    const userFinalBalance = await web3.eth.getBalance(user)
    const userFinalBalanceToEthereum = convertFromWeiToEthereum(
      userFinalBalance
    )
    assert.isTrue(
      approximateEquality(userFinalBalanceToEthereum, expectedBalanceToEthereum)
    )
  })

  it('should show the correct campaign stats given the url associated to the campaign', async () => {
    const campaign = mockCampaigns[0]
    const expectedCampaign = {
      ...campaign,
      currentBudget: (+campaign.currentBudget - +campaign.taskReward).toString()
    }

    const fetchedCampaign = await crowdclickEscrowContractInstance.lookupTask(
      expectedCampaign.url,
      {
        from: publisher
      }
    )

    const fetchedCampaignToEthereum = {
      taskBudget: convertFromWeiToEthereum(
        fetchedCampaign.taskBudget
      ).toString(),
      taskReward: convertFromWeiToEthereum(
        fetchedCampaign.taskReward
      ).toString(),
      currentBudget: convertFromWeiToEthereum(
        fetchedCampaign.currentBudget
      ).toString(),
      url: fetchedCampaign.url,
      isActive: fetchedCampaign.isActive
    }
    assert.deepEqual(fetchedCampaignToEthereum, expectedCampaign)
  })

  /** publisher's withdraw sets campaign's active field to false */
  it("should allow the publisher to withdraw the remaining allocated budget from the campaign and update the publisher's wallet balance as the remaining allocated budget on the given campaign minus the reward previously forwarded", async () => {
    /** we get the initial wallet balance
     * convert it to ethereum
     * calculate the sum of initial wallet balance and the remaining task budget
     */
    const campaign = mockCampaigns[0]

    const publisherInitialWalletWeiBalance = await web3.eth.getBalance(
      publisher
    )
    const publisherInitialWalletEthereumBalance = convertFromWeiToEthereum(
      publisherInitialWalletWeiBalance
    )

    const publisherExpectedFinalEthereumBalance =
      parseFloat(publisherInitialWalletEthereumBalance, 10) +
      parseFloat(campaign.taskBudget, 10) -
      parseFloat(campaign.taskReward, 10)

    /** we perform the withdrawal and check the actual balance after performing withdrawfromcampaign */
    await crowdclickEscrowContractInstance.withdrawFromCampaign(campaign.url, {
      from: publisher
    })
    const publisherWalletBalanceAfterWithdraw = await web3.eth.getBalance(
      publisher
    )
    const publisherWalletBalanceAfterWithdrawToEthereum = convertFromWeiToEthereum(
      publisherWalletBalanceAfterWithdraw
    )

    assert.isTrue(
      approximateEquality(
        publisherExpectedFinalEthereumBalance,
        publisherWalletBalanceAfterWithdrawToEthereum
      )
    )
  })
})
