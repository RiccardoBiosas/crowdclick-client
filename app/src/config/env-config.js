import {
  CrowdclickGoerliContract,
  CrowdclickMaticMumbaiContract
} from '../contracts'

const config = {
  providers: {
    portis: process.env.REACT_APP_PORTIS_ID
  },
  blockchain: {
    1: {
      chainName: 'mainnet',
      contracts: null,
      node: '',
      chainExplorer: 'https://etherscan.io/',
      chainExplorerTransactions: 'https://etherscan.io/tx/'
    },
    2: {
      chainName: 'ropsten',
      contracts: null,
      node: process.env.REACT_APP_INFURA_ROPSTEN,
      chainExplorer: 'https://ropsten.etherscan.io/',
      chainExplorerTransactions: 'https://ropsten.etherscan.io/tx/'
    },
    5: {
      chainName: 'goerli',
      contracts: CrowdclickGoerliContract,
      node: process.env.REACT_APP_INFURA_GOERLI,
      chainExplorer: 'https://goerli.etherscan.io/',
      chainExplorerTransactions: 'https://goerli.etherscan.io/tx/'
    },
    80001: {
      chainName: 'mumbai',
      contracts: CrowdclickMaticMumbaiContract,
      node: process.env.REACT_APP_INFURA_GOERLI,
      chainExplorer: 'https://mumbai-explorer.matic.today/',
      chainExplorerTransactions: 'https://mumbai-explorer.matic.today/tx/',
      widgetId: process.env.REACT_APP_MATIC_WIDGET_ID
    }
  }
}

export default config
