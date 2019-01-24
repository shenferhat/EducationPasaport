var IPFSHashStore = artifacts.require("./IPFSHashStore.sol");
var EducationPasaport = artifacts.require("./EducationPasaport.sol");

module.exports = function(deployer) {
    deployer.deploy(IPFSHashStore);
    deployer.deploy(EducationPasaport);
};
