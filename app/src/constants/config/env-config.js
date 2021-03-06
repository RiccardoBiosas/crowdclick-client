import { CrowdclickEscrowAbi } from '../abis'

// const IFRAME_TIME = isProduction ? '20' : '10'

const config = {
  app: {
    isProduction: process.env.REACT_APP_IS_PRODUCTION || false
  },
  ux: {
    iframeTime: process.env.REACT_APP_IFRAME_TIME || 4,
    floatingPrecision: 6
  },
  providers: {
    portis: process.env.REACT_APP_PORTIS_ID
  },
  blockchain: {
    contracts: CrowdclickEscrowAbi,
    1: {
      chainName: 'mainnet',
      contracts: null,
      contractsAddress: {
        crowdclickEscrowAddress: null
      },
      node: '',
      chainExplorer: 'https://etherscan.io/',
      chainExplorerTransactions: 'https://etherscan.io/tx/'
    },
    2: {
      chainName: 'ropsten',
      contracts: null,
      contractsAddress: {
        crowdclickEscrowAddress: null
      },
      node: process.env.REACT_APP_INFURA_ROPSTEN,
      chainExplorer: 'https://ropsten.etherscan.io/',
      chainExplorerTransactions: 'https://ropsten.etherscan.io/tx/'
    },
    5: {
      chainName: 'goerli',
      contracts: CrowdclickEscrowAbi,
      contractsAddress: {
        crowdclickEscrowAddress: '0xC0499652EAb163462d3f4d4EEB2FE30fd181e6db'
      },
      node: process.env.REACT_APP_INFURA_GOERLI,
      chainExplorer: 'https://goerli.etherscan.io/',
      chainExplorerTransactions: 'https://goerli.etherscan.io/tx/'
    },
    80001: {
      chainName: 'mumbai',
      contracts: CrowdclickEscrowAbi,
      contractsAddress: {
        crowdclickEscrowAddress: '0x81c4DCbBc60762923e4Ba3320e52f1E4201b989F'
      },
      node: process.env.REACT_APP_INFURA_GOERLI,
      chainExplorer: 'https://mumbai-explorer.matic.today/',
      chainExplorerTransactions: 'https://mumbai-explorer.matic.today/tx/',
      widgetId: process.env.REACT_APP_MATIC_WIDGET_ID
    }
  }
}

export default config
