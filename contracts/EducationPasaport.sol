pragma solidity ^0.5.0;

contract EducationPasaport {
    constructor() {

    }

    enum documentType {Diplomas,Certificates,Transcripts,ReportCards}
    enum levelOfEducation {PhD,Master,Bachelor,HighSchool,SecondarySchool,PrimarySchool}

    documentType documentTypeChoice;
    levelOfEducation levelOfEducationChoice;

    string name;
    string surname;
    string email;
    uint32 studentID;
}
