const CrowdclickEscrow = artifacts.require('CrowdclickEscrow')

module.exports = function(deployer) { 
  deployer.deploy(CrowdclickEscrow)
};
