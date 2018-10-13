var Migrations = artifacts.require("./Migrations.sol");

var Lock = artifacts.require('./Lock.sol');

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  // Tutaj deployujemy nasz kontrakt.
  deployer.deploy(Lock);
};
