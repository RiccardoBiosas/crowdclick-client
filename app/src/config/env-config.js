export const config = {
    blockchain: {        
        matic: {
            maticWidgetID: process.env.REACT_APP_MATIC_WIDGET_ID
        },
        etherscan: {
            ROPSTEN_ETHERSCAN: 'https://ropsten.etherscan.io/',
            ROPSTEN_ETHERSCAN_TX: 'https://ropsten.etherscan.io/tx/',
            GOERLI_ETHERSCAN: 'https://goerli.etherscan.io/',
            GOERLI_ETHERSCAN_TX: 'https://goerli.etherscan.io/tx/'
        }
        
    }
}