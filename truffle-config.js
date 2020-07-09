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
    }

  },
  compilers: {
    solc: {
      version: "0.5.0"
    }
  }

};
