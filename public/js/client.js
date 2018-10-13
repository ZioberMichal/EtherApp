function Client() {

    this.init = async function () {
        if (window.ethereum) {
            console.log("Create Web3 base on ethereum ...");
            window.web3 = new Web3(ethereum);
            try {
                // Request account access if needed
                await ethereum.enable();
            } catch (e) {
                // User denied account access...
                console.log(e);
            }
        } else if (window.web3) {
            console.log("Legacy dapp browsers...");
            window.web3 = new Web3(web3.currentProvider);
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    };

    this.showProperties = function() {
        web3.eth.getAccounts(function (error, result) {
            $('#accountsValue').html(result);
        });
        $('#defaultAccountValue').html(web3.eth.defaultAccount);
    };

    this.showVersions = function () {
        $('#apiVersion').html(web3.version.api);

        web3.version.getEthereum(function(error, result){
            $('#ethereumVersion').html(result);
        });
        web3.version.getNetwork(function(error, result){
            $('#networkVersion').html(result);
        });

        console.log("Is connected: " + web3.isConnected());
    };

    this.sendTx = function () {
        // compiled solidity source code using https://chriseth.github.io/cpp-ethereum/
        var code = "603d80600c6000396000f3007c01000000000000000000000000000000000000000000000000000000006000350463c6888fa18114602d57005b6007600435028060005260206000f3";
        web3.eth.sendTransaction({data: code}, function(err, transactionHash) {
            if (!err)
                console.log(transactionHash); // "0x7f9fade1c0d57a7af66ab4ead7c2eb7b11a91385"
        });
    };

    this.getBalance = function () {
        web3.eth.getBalance(web3.eth.defaultAccount, web3.eth.defaultBlock, function (error, result) {
            console.log(`Balance for default account ${web3.eth.defaultAccount} is ${result.toNumber()}`);
        });
    };

    return this;
}
