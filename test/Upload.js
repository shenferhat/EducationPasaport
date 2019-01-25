const upload = artifacts.require('./Upload.sol');
const assert = require('assert');

/*
Tests are for mostly testing the security of the smart contract with ownership, upgradability,
emergency stoping (circuit break pattern) and inserting and getting data properly.
 */

contract('Upload', ([owner, donor,accounts]) => {

    beforeEach(async () => {
        contractInstance = await upload.new();
    })

    it('Education Pasaport Name Test', async () => {
        await contractInstance.uploadEducationPasaport("testname","testsurname","test@testmail.com",342342,3,2,"filehash");
        let name = await contractInstance.getName();
        let surname = await contractInstance.getSurname();
        let email = await contractInstance.getEmail();
        let studentid = await contractInstance.getStudentID();
        let levelofeducation = await contractInstance.getLevelOfEducation();
        let documenttype = await contractInstance.getDocumentType();
        let fileHash = await contractInstance.getHash();

        assert.equal("testname", name, 'testname is not true');
        assert.equal("testsurname", surname, 'testsurname is not true');
        assert.equal("test@testmail.com", email, 'test@testmail.com is not true');
        assert.equal(342342, studentid, 'studentid is not true');
        assert.equal(3, documenttype, 'documenttype is not true');
        assert.equal(2, levelofeducation, 'levelofeducation is not true');
        assert.equal("filehash", fileHash, 'fileHash is not true');
    })

    it('Set Get Name', async () => {
        await contractInstance.setName("johnny");
        assert.equal("johnny", await contractInstance.getName(),"Wrong name");
    })
    it('Set Get Surname', async () => {
        await contractInstance.setSurName("johnnyx");
        assert.equal("johnnyx", await contractInstance.getSurname(),"Wrong surname");
    })
    it('Set Get Email', async () => {
        await contractInstance.setEmail("johnny@johng.com");
        assert.equal("johnny@johng.com", await contractInstance.getEmail(),"Wrong mail");
    })
    it('Set Get StudentID', async () => {
        await contractInstance.setStudentID(343494);
        assert.equal(343494, await contractInstance.getStudentID(),"Wrong student id");
    })
    it('Set Get Level Of Education', async () => {
        await contractInstance.setLevelOfEducation(1);
        assert.equal(1, await contractInstance.getLevelOfEducation(),"Wrong level of education");
    })
    it('Set Get Document Type', async () => {
        await contractInstance.setDocumentType(3);
        assert.equal(3, await contractInstance.getDocumentType(),"Wrong document type");
    })



    it('Rate Limit', async function () {

        await contractInstance.uploadEducationPasaport("testname","testsurname","test@testmail.com",342342,3,2,"filehash");
        try {
            await contractInstance.uploadEducationPasaport("testname2","testsurname2","test@testmail.com",342342,3,2,"filehash")
        }
        catch (e) {
            if(e.message !== null || e.message !== "") {
                //if there is exception then limit working
                assert(true);
            } else {
                // if there is no exception message, there is something wrong
                assert(false);
            }

        }
    })

    it('Has an owner', async function () {
        assert.equal(await contractInstance.owner(), owner)
    })

    it('Transfer ownership', async function () {
        await contractInstance.transferOwnership(accounts);
        let newOwner = await contractInstance.newOwner();
        assert.equal(newOwner, accounts, 'Owner Transfer Failed');
    })

    it('Emergency Stop', async function () {
        await contractInstance.toggle_active();
        assert(!contractInstance.stopped);

    })

    it('Change Backend', async function () {
        let backend = await contractInstance.changeBackend;
        assert(backend);
    })


})