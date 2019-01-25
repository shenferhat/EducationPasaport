Education Pasaport
=============

### What does your project do?
Education pasaport system that done with Ethereum and IPFS, upload your education pasaport and owner information to Ethereum Blockchain.

#### How to set it up
For development in Ubuntu:
```sh
$ ganache-cli -m "hamster motion negative shoulder rose belt reject pilot idea crumble mirror immune"
```
Starting ganache-cli with seed because under "src/upload.js" address and "abi"  should remain same. Save a private key from ganache-cli we will need that on Metamask.
```sh
$ truffle compile
```
If there is a problem when compiling with truffle try removing build folder.

```sh
$ truffle migrate --network development
```
This should migrate contracts to ganache-cli network.

#### If you want to be sure after migration
After migration go to bottom of the "/build/contracts/Upload.json" in networks section there should be an address field. That is the address of contract copy it and paste it to  const address variable at the top of "/src/upload.js", also copy the ABI from Upload.json to upload.js    

#### Setting up Metamask

  - After running ganache click on metamask extension and select "Localhost 8545" network.
  - Import the private key with "Import Account" button.
  - If everything is correct you should have 100 ETH in local network.

#### Development Server to Serve the front end interface
At the first run:
```sh
$ npm install
$ npm start
```
Other runs:
```sh
$ npm start
```

#### How to Test
For testing smart contract:
```sh
$ truffle test
```

#### What tests are covering
Tests are for mostly testing the security of the smart contract with ownership, upgradability, emergency stoping (circuit break pattern) and inserting and getting data properly.

#### Rinkeby
https://rinkeby.etherscan.io/address/0xd064d4e91c959f2898ac9b8d2bca2c61b770b392#code

#### Oracle
![alt text](https://upload.wikimedia.org/wikipedia/en/f/f0/The_Oracle_%28i%29.gif)

"src/ipfs.js" "ipfs.infura.io" 

#### Known Bugs

- Sometimes when registering second document metamask 
can throw exception. 
- Sometimes Metamask shows document register price as 0 ETH and this causes an error.
- New version browsers may cause problem.

Both of this bugs can be dealt with by refreshing or using Incognito Mode with Metamask enabled.
Chrome's caching is a problem so using CTRL + F5 fixes a lot of things.

### Todos

 - Write MORE Tests

License
----

GNU / GPL
**Free Software, Hell Yeah!**

### Screen Shot

![alt text](https://raw.githubusercontent.com/shenferhat/EducationPasaport/master/ss.png)
