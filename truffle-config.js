const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config()


module.exports = {

  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, process.env.INFURA_ROPSTEN)
      },
      network_id: 3
    },
    goerli: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, process.env.INFURA_GOERLI),
      network_id: 5
    },
    maticMumbai: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://rpc-mumbai.matic.today`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skyDryRun: true
    },
  },
  mocha: {

  },
  compilers: {
    solc: {
      version: "0.5.0"
    }
  }

};
