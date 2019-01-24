pragma solidity ^0.5.0;

contract EducationPasaport {
    enum documentType {Diplomas,Certificates,Transcripts,ReportCards}
    enum levelOfEducation {PhD,Master,Bachelor,HighSchool,SecondarySchool,PrimarySchool}

    documentType documentTypeChoice;
    function setDocumentType(documentType x) public { documentTypeChoice = x; }
    function getDocumentType() public view returns(documentType) {return documentTypeChoice; }

    levelOfEducation levelOfEducationChoice;
    function setLevelOfEducation(levelOfEducation x) public { levelOfEducationChoice = x; }
    function getLevelOfEducation() public view returns(levelOfEducation) {return levelOfEducationChoice; }

    string name;
    function getName() public view returns (string memory y) { return name; }
    function setName(string memory x) public { name = x; }

    string surname;
    function getSurname() public view returns (string memory y) { return surname; }
    function setSurName(string memory x) public { surname = x; }

    string email;
    function getEmail() public view returns (string memory y) { return email; }
    function setEmail(string memory x) public { email = x; }

    uint32 studentID;
    function getStudentID() public view returns (uint32 y) { return studentID; }
    function setStudentID(uint32 x) public { studentID = x; }

    function uploadEP(string memory _name,string memory _surname,string memory _email,uint32 _studentID,documentType  dtc,levelOfEducation  loec) public {
        setName(_name);
        setSurName(_surname);
        setEmail(_email);
        setStudentID(_studentID);
        setDocumentType(dtc);
        setLevelOfEducation(loec);
    }
}
