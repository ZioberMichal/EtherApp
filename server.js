const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');

if (typeof web3 !== 'undefined') {
    console.log("Use currentProvider:" + web3.currentProvider);
    web3 = new Web3(web3.currentProvider);
} else {
    var url = "http://localhost:8545";
    // set the provider you want from Web3.providers
    console.log(`Connect to ${url} ...`);
    web3 = new Web3(new Web3.providers.HttpProvider(url));
}
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var handler = function (blockNr, res) {
    var data = {};
    data.blockTransactions = [];
    web3.eth.getBlockNumber(function (error, result) {
        console.log("getBlockNumber->Error: " + error);
        console.log("getBlockNumber->Result: " + result);
        data.blockNumber = result;
    });
    web3.eth.getAccounts(function (error, result) {
        console.log("getAccounts->Error: " + error);
        console.log("getAccounts->Result: " + result);
        data.accounts = result;
    });
    web3.eth.getGasPrice(function (error, result) {
        console.log("getGasPrice->Error: " + error);
        console.log("getGasPrice->Result: " + result);
        data.gasPrice = result;
    });
    web3.eth.getBlock(blockNr, function (error, result) {
        console.log("getBlock->Error: " + error);
        console.log("getBlock->Result: " + result);
        data.blockData = result;
        web3.eth.getBlockTransactionCount(result.hash, function (error, numberOfTransactions) {
            console.log("getBlockTransactionCount->Result: " + numberOfTransactions);
            data.blockData.numberOfTransactions = numberOfTransactions;
            data.blockDataKeys = data.blockData ? Object.keys(data.blockData) : [];
        });
        if (result.transactions && result.transactions.length > 0) {
            for (var i = 0; i < result.transactions.length; i++) {
                web3.eth.getTransaction(result.transactions[i], function (error, result) {
                    console.log("getTransaction->Error: " + error);
                    console.log("getTransaction->Result: " + JSON.stringify(result));
                    data.blockTransactions.push({
                        keys : Object.keys(result),
                        data : result
                    });
                });
            }
        }

        data.blockNr = result.number;
    });

    data.blockNr = blockNr;
    data.version = JSON.stringify(web3.version);

    setTimeout(function () {
        res.render('index', data);
    }, 1000);
};

app.get('/', function (req, res) {
    handler(1, res);
});

app.get('/blocks', function (req, res) {
    handler(req.query.id, res);
});

app.post('/', function (req, res) {
    handler(req.body.blockNr, res);
});

app.listen(3000, function () {
    console.log('Port 3000!')
});
