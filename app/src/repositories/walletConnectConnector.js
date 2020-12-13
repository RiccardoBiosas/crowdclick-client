import WalletConnectProvider from '@walletconnect/web3-provider'

const walletConnectProvider = new WalletConnectProvider({
  infuraId: process.env.REACT_APP_INFURA_GOERLI_ID
})

// const mumbaiWalletConnectProvider = new WalletConnectProvider({
//   infuraId: process.env.REACT_APP_MATIC_NODE
// })

const walletConnectConnectors = () => {
  return
}

export default walletConnectProvider
