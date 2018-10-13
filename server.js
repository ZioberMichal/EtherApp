const express = require('express');
const bodyParser = require('body-parser');
var deferred = require('deferred');
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
        data.blockDataKeys = result ? Object.keys(result) : [];
    });

    data.blockNr = blockNr;
    data.version = JSON.stringify(web3.version);

    setTimeout(function () {
        res.render('index', data);
    }, 1000);

    console.log(Object.keys(web3.eth));
};

app.get('/', function (req, res) {
    handler(1, res);
});

app.post('/', function (req, res) {
    handler(req.body.blockNr, res);
});

app.listen(3000, function () {
    console.log('Port 3000!')
});
