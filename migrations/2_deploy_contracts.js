var IPFSHashStore = artifacts.require("./IPFSHashStore.sol");

module.exports = function(deployer) {
    deployer.deploy(IPFSHashStore);
};
