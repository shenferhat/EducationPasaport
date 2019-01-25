import {Button, Form,DropdownButton,MenuItem,Row,Col,Grid } from 'react-bootstrap';
import React, { Component } from 'react';

import './App.css';
import web3 from './web3';
import ipfs from './ipfs';

import upload from './upload';

const optionsloe = ["PhD,Master","Bachelor","HighSchool","SecondarySchool","PrimarySchool"];
const optionsDocType = ["Diplomas","Certificates","Transcripts","ReportCards"];

class App extends Component {

    state = {
        ipfsHash:null,
        buffer:'',
        ethAddress:'',
        blockNumber:'',
        transactionHash:'',
        gasUsed:'',
        txReceipt: '',
        name:'john',
        surname:'wick',
        email:'dontkillmydog@babayaga.com',
        studentId:'43422342',
        levelOfEducation:0,
        documentTypeChoice:0,
        nameFromBlockchain:'',
        surnameFromBlockchain:'',
        emailFromBlockchain:'',
        studentIdFromBlockchain:0,
        levelOfEducationFromBlockchain:0,
        documentTypeChoiceFromBlockchain:0
    };
   
    captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)    
      };

    convertToBuffer = async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer});
    };

    onClickUploadFile = async () => {

    try{
        this.setState({blockNumber:"waiting.."});
        this.setState({gasUsed:"waiting..."});

        await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
          console.log(err,txReceipt);
          this.setState({txReceipt});
        }); //await for getTransactionReceipt

        await this.setState({blockNumber: this.state.txReceipt.blockNumber});
        await this.setState({gasUsed: this.state.txReceipt.gasUsed});

        this.setState({
            nameFromBlockchain : await upload.methods.getName().call(),
            surnameFromBlockchain : await upload.methods.getSurname().call(),
            emailFromBlockchain : await upload.methods.getEmail().call(),
            studentIdFromBlockchain:await upload.methods.getStudentID().call(),
            levelOfEducationFromBlockchain:await upload.methods.getLevelOfEducation().call(),
            documentTypeChoiceFromBlockchain:await upload.methods.getDocumentType().call()
        });
        console.log("name from bc:" + this.state.emailFromBlockchain);

      } //try
    catch(error){
        console.log(error);
      } //catch
  } //onClickUploadFile

    handleChangeName = async (event) => {
        this.setState({
            name: event.target.value
        });
        console.log(this.state.name);
    }

    handleChangeSurname = async (event) => {
        this.setState({
            surname: event.target.value
        });
        console.log(this.state.surname);
    }
    handleChangeEmail = async (event) => {
        this.setState({
            email: event.target.value
        });
        console.log(this.state.email);
    }
    handleChangeStudentID = async (event) => {
        this.setState({
            studentId: event.target.value
        });
        console.log(this.state.studentId);
    }

    handleSelectLoe(eventKey, event) {
        this.setState({ levelOfEducation: eventKey });
        console.log(this.state.levelOfEducation);
    }

    handleSelectDocumentType(eventKey, event) {
        this.setState({ documentTypeChoice: eventKey });
        console.log(this.state.documentTypeChoice);
    }


    onSubmit = async (event) => {
        if(this.state.buffer === undefined || this.state.buffer === '') {
            alert("Please select a file to upload");
            return;
        }

      event.preventDefault();

      //bring in user's metamask account address
      const accounts = await web3.eth.getAccounts();
     
      console.log('Current Metamask account: ' + accounts[0]);

      const ethAddress= await upload.options.address;
      this.setState({ethAddress});

      await ipfs.add(this.state.buffer, (err, ipfsHash) => {
        console.log(err,ipfsHash);
        this.setState({ ipfsHash:ipfsHash[0].hash });

            if(this.state.name !== undefined ||
                this.state.surname !== undefined ||
                this.state.email !== undefined ||
                this.state.studentId !== undefined ||
                this.state.levelOfEducation !== undefined ||
                this.state.documentTypeChoice !== undefined ) {

                upload.methods.uploadEducationPasaport(
                    this.state.name,
                    this.state.surname,
                    this.state.email,
                    this.state.studentId,
                    this.state.levelOfEducation,
                    this.state.documentTypeChoice,
                    this.state.ipfsHash)
                    .send({
                        from: accounts[0]
                    }, (error, transactionHash) => {
                        console.log(transactionHash);
                        this.setState({transactionHash});
                    });

            }


      })
    }; //onSubmit 
  
    render() {
      
      return (
        <div className="App">
          <header className="App-header">
            <h1> Education Documents Certifier</h1>
          </header>

          <hr />

            <h3> Upload Education Document</h3>
            <Form onSubmit={this.onSubmit}>
                <p/>
                <label>Photo Upload: </label>
                <input
                    type = "file"
                    onChange = {this.captureFile}
                />
                <br/>
                <p/>
                <label>Name: </label>
                <input type="text" value={this.state.name} name="name" placeholder="Enter text" onChange={this.handleChangeName}/>
                <br/>
                <p/>
                <label>Surname: </label>
                <input type="text" value={this.state.surname} name="surname" placeholder="Enter text" onChange={this.handleChangeSurname}/>
                <br/>
                <p/>
                <label>E-Mail: </label>
                <input type="text" value={this.state.email} name="email" placeholder="Enter text" onChange={this.handleChangeEmail}/>
                <br/>
                <p/>
                <label>Student ID: </label>
                <input type="text" value={this.state.studentId} name="studentId" placeholder="Enter text" onChange={this.handleChangeStudentID}/>
                <br/>
                <p/>
                <label>Level Of Education: </label>
                <DropdownButton
                    title={optionsloe[this.state.levelOfEducation]}
                    id="level-of-education"
                    onSelect={this.handleSelectLoe.bind(this)}
                >
                    {optionsloe.map((opt, i) => (
                        <MenuItem key={i} eventKey={i}>
                            {opt}
                        </MenuItem>
                    ))}
                </DropdownButton>
                <br/>
                <p/>
                <label>Document Type: </label>

                <DropdownButton
                    title={optionsDocType[this.state.documentTypeChoice]}
                    id="document-type"
                    onSelect={this.handleSelectDocumentType.bind(this)}
                >
                    {optionsDocType.map((opt2, j) => (
                        <MenuItem key={j} eventKey={j}>
                            {opt2}
                        </MenuItem>
                    ))}
                </DropdownButton>
                <br/>
                <br/>

                <Button
                    bsStyle="default"
                    type="submit">
                    Send it
                </Button>
            </Form>

            <hr/>

            <h3> Query Your Documents </h3>
            <Button onClick = {this.onClickUploadFile}> Get Transaction Receipt </Button>
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} md={4}>
                       IPFS File Hash:
                    </Col>
                    <Col xs={6} md={4}>
                        {this.state.ipfsHash}
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        Transaction Hash:
                    </Col>
                    <Col xs={6} md={4}>
                        {this.state.transactionHash}
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        Ethereum Address:
                    </Col>
                    <Col xs={6} md={4}>
                        {this.state.ethAddress}
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        Block Number:
                    </Col>
                    <Col xs={6} md={4}>
                        {this.state.blockNumber}
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        Gas Used:
                    </Col>
                    <Col xs={6} md={4}>
                        {this.state.gasUsed}
                    </Col>
                </Row>


                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        Name:
                    </Col>
                    <Col xs={6} md={4}>
                        {this.state.nameFromBlockchain}
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        Surname:
                    </Col>
                    <Col xs={6} md={4}>
                        {this.state.surnameFromBlockchain}
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        Email:
                    </Col>
                    <Col xs={6} md={4}>
                        {this.state.emailFromBlockchain}
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        Student ID:
                    </Col>
                    <Col xs={6} md={4}>
                        {this.state.studentIdFromBlockchain}
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        Level Of Education:
                    </Col>
                    <Col xs={6} md={4}>
                        {this.state.levelOfEducationFromBlockchain}
                    </Col>
                </Row>

                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        Document Type:
                    </Col>
                    <Col xs={6} md={4}>
                        {this.state.documentTypeChoiceFromBlockchain}
                    </Col>
                </Row>

            </Grid>

     </div>
      );
    }
}

export default App;
