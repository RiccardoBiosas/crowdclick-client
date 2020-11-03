export const config = {
  blockchain: {
    ethereum: {
      goerli: process.env.REACT_APP_INFURA_GOERLI,
      ropsten: process.env.REACT_APP_INFURA_ROPSTEN
    },
    matic: {
      maticWidgetID: process.env.REACT_APP_MATIC_WIDGET_ID,
      mumbai: '',
      mumbaiVirgilNode: ''
    },
    blockchainExplorer: {
      etherscan: {
        ROPSTEN_ETHERSCAN: 'https://ropsten.etherscan.io/',
        ROPSTEN_ETHERSCAN_TX: 'https://ropsten.etherscan.io/tx/',
        GOERLI_ETHERSCAN: 'https://goerli.etherscan.io/',
        GOERLI_ETHERSCAN_TX: 'https://goerli.etherscan.io/tx/'
      },
      maticExplorer: {
        mumbaiExplorer: 'https://mumbai-explorer.matic.today/'
      }
    }
  }
}
