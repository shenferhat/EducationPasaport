pragma solidity ^0.5.0;

/** @title Education Pasaport Upload. */
contract Upload {

    constructor() public {
        owner = msg.sender;
        //circuit breaker
        stopped = false;
    }

    // Ownership start
    address public owner;
    address public newOwner;

    event OwnershipTransferred(address indexed _from, address indexed _to);

    /** @dev Modifier function that restricts users from interacting with a certain function.
      */
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    /** @dev Transfers Ownership from old owner to new one.
      * @param _newOwner Address of the new owner.
      */
    function transferOwnership(address _newOwner) public stop_if_emergency onlyOwner {
        newOwner = _newOwner;
    }

    /** @dev Accepts ownership and frees new owners address. Triggers event to inform change of ownership.
      */
    function acceptOwnership() public {
        require(msg.sender == newOwner);
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
        newOwner = address(0);
    }
    // Ownership end

    /** @dev Uploads education pasaport information and file hash to blockchain network.
      * @param _name name of the sender.
      @param _surname surname of the sender.
      @param _email email of the sender.
      @param _studentID student id of the sender.
      @param dtc document type of uploaded file.
      @param loec level of education of the sender.
      @param fileHash hash of the sender's file.
      */
    function uploadEducationPasaport(string memory _name,
        string memory _surname,
        string memory _email,
        uint32  _studentID,
        documentType  dtc,
        levelOfEducation loec,
        string memory fileHash) stop_if_emergency enabledEvery(3 seconds) public {
        uploadEP(_name,_surname,_email,_studentID,dtc,loec);
        sendHash(fileHash);
    }

    /** @dev Enables and disables circuit breaking, circuit break pattern.
        */
    function toggle_active() onlyOwner public {
        stopped = !stopped;
    }

    /** @dev Modifier for stopping important functions.
        */
    modifier stop_if_emergency() { if (!stopped) _; }

    /** @dev Modifier function for functions that will work only when there is an emergency situation.
        */
    modifier emergency_only() { if (stopped) _; }

    // circuit breaker toggle variable
    bool stopped;

    //Rate limit
    uint enabledAt = now;

    /** @dev Modifier that defines a rate limit to a certain function.
    @param t time
        */
    modifier enabledEvery(uint t) {
        require(now >= enabledAt, "Access is denied. Rate limit exceeded.");
        enabledAt = now + t;

        _;
    }

    // Upgrade Contract

    address public backendContract;
    address[] public previousBackends;

    /** @dev Changes address of the smart contract for upgradability.
    @param newBackend address of the new backend smart contract.
    @return bool returns true if new and old backend are not same contract.
        */
    function changeBackend(address newBackend) onlyOwner stop_if_emergency public returns (bool)
    {
        if(newBackend != backendContract) {
            previousBackends.push(backendContract);
            backendContract = newBackend;
            return true;
        }

        return false;
    }

    // IPFS Hash Storage
    string ipfsHash;

    /** @dev Stores the file hash.
    @param x ipfs hash of the file
        */
    function sendHash(string memory x) public {
        ipfsHash = x;
    }

    /** @dev Gets stored file hash.
    @return x returns hash of the stored file.
    */
    function getHash() public view returns (string memory x) {
        return ipfsHash;
    }

    // Education Pasaport
    enum documentType {Diplomas,Certificates,Transcripts,ReportCards}
    enum levelOfEducation {PhD,Master,Bachelor,HighSchool,SecondarySchool,PrimarySchool}

    documentType documentTypeChoice;
    /** @dev Setter for document type
        @param x type of the document
       */
    function setDocumentType(documentType x) public { documentTypeChoice = x; }

    /** @dev Gets document type.
    @return documentTypeChoice returns selected document type.
    */
    function getDocumentType() public view returns(documentType) {return documentTypeChoice; }

    levelOfEducation levelOfEducationChoice;
    /** @dev Setter for level of education
        @param x level of education
       */
    function setLevelOfEducation(levelOfEducation x) public { levelOfEducationChoice = x; }

    /** @dev Gets Level Of Education.
    @return levelOfEducationChoice returns selected level of education.
    */
    function getLevelOfEducation() public view returns(levelOfEducation) {return levelOfEducationChoice; }

    string name;
    /** @dev Gets name.
    @return name returns name.
    */
    function getName() public view returns (string memory y) { return name; }

    /** @dev Setter for name
        @param x name of sender
       */
    function setName(string memory x) public { name = x; }

    string surname;

    /** @dev Gets surname.
    @return name returns surname.
    */
    function getSurname() public view returns (string memory y) { return surname; }


    /** @dev Setter for surname
        @param x surname of sender
       */
    function setSurName(string memory x) public { surname = x; }

    string email;

    /** @dev Gets Email.
    @return y returns Email.
    */
    function getEmail() public view returns (string memory y) { return email; }

    /** @dev Setter for email
        @param x email of sender
       */
    function setEmail(string memory x) public { email = x; }

    uint32 studentID;

    /** @dev Gets student id.
        @return y returns student id as uint32.
   */
    function getStudentID() public view returns (uint32 y) { return studentID; }

    /** @dev Setter for student id
        @param x student id of sender
       */
    function setStudentID(uint32 x) public { studentID = x; }


    /** @dev Uploads education pasaport information without file hash.
          * @param _name name of the sender.
          @param _surname surname of the sender.
          @param _email email of the sender.
          @param _studentID student id of the sender.
          @param dtc document type of uploaded file.
          @param loec level of education of the sender.
          */
    function uploadEP(string memory _name,string memory _surname,string memory _email,uint32 _studentID,documentType  dtc,levelOfEducation  loec) public {
        setName(_name);
        setSurName(_surname);
        setEmail(_email);
        setStudentID(_studentID);
        setDocumentType(dtc);
        setLevelOfEducation(loec);
    }

    // reject all ether

    /** @dev Rejects all ether that has been sent to this contract.
          */
    function() external { revert(); }
}
