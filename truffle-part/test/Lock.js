// Importujemy kontrakt do testów za pomocą artifacts.require
const Lock = artifacts.require('./Lock.sol');

// 8/ Piszemy prosty test dla kontraktu
contract('Lock', accounts => {
    it('should return an owner', async () => {
        const instance = await Lock.deployed();
        const owner = await instance.owner.call();

        assert.equal(owner, accounts[0])
    });
    it('test1', async () => {
        const instance = await Lock.deployed();
        await instance.lock({value:5});
        const s = await instance.locked(accounts[0]);

        assert.equal(s[0], 5);
        await instance.withdraw();

    })
});
