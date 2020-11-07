import CrowdclickEscrowMaticMumbai from './contracts/maticMumbai/CrowdclickEscrow' //
import CrowdclickEscrowGoerli from './contracts/goerli/CrowdclickEscrow'
import { Drizzle } from '@drizzle/store'

const options = {
  web3: {
    block: false
  },
  contracts: [CrowdclickEscrowGoerli],
  events: {}
}

export default options

export const returnDrizzleOptions = contracts => {
  console.log('contracts in reutnrdrizlzeoptions is ', contracts)
  const myOptions = {
    web3: {
      block: false
    },
    contracts: contracts,
    events: {}
  }
  const drizzle = new Drizzle(myOptions)
  console.log('drizzle is in reutnrdrizzeooptions', drizzle)
  return drizzle
}
