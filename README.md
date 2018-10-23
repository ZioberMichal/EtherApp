How to start:
1. Install [Node.js](https://nodejs.org/en/)
2. Download [parity client](https://github.com/paritytech/parity-ethereum/releases)
3. Install Metamask plugin and create an account.
4. Download this project
5. Run parity with no parameters. You need to wait until parity will download block chain from test network.
6. You can start NodeJS server: `node server.js`
7. Open `http://localhost:3000/` page. If everything is done properly and you use default settings you should see some basic data from local block chain.


How to run parity with remote block chain:

./target/release/parity --chain=ropsten --jsonrpc-cors="all" --jsonrpc-apis="all" --jsonrpc-interface=all
