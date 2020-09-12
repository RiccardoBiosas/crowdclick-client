import CrowdclickEscrow from './contracts/goerli/CrowdclickEscrow.json' //TODO: use a config file to import the contract ABI from the correct network

const options = {
  web3: {
    block: false,
 
  },
  contracts: [CrowdclickEscrow],
  events: {
    
  },
  
};

export default options;
