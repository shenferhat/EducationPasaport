pragma solidity ^0.5.0;

//0xb84b12e953f5bcf01b05f926728e855f2d4a67a9  contract address on rinkeby
//deployed using remix 

contract IPFSHashStore {
    string ipfsHash;

    function sendHash(string memory x) public {
        ipfsHash = x;
    }

    function getHash() public view returns (string memory x) {
        return ipfsHash;
    }
}