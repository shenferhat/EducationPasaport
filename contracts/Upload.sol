pragma solidity ^0.5.0;

import "./IPFSHashStore.sol";
import "./EducationPasaport.sol";

contract Upload is IPFSHashStore, EducationPasaport {
    string teststr;
    function uploadEducationPasaport(string memory _name,string memory _surname,string memory _email,uint32  _studentID,documentType  dtc,levelOfEducation  loec,string memory fileHash) public {
        uploadEP(_name,_surname,_email,_studentID,dtc,loec);
        sendHash(fileHash);
    }

    function test(string memory x) public {
        teststr = x;
    }

    function getTest() public returns(string memory x){
        return teststr;
    }
}
