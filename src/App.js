import {Button, Form,FormControl } from 'react-bootstrap';
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import ipfs from './ipfs';
import storehash from './storehash';

class App extends Component {
 
    state = {
        ipfsHash:null,
        buffer:'',
        ethAddress:'',
        blockNumber:'',
        transactionHash:'',
        gasUsed:'',
        txReceipt: '',
        nameValue:'',
        surnameValue:''
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

        // get Transaction Receipt in console on click
        // See: https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt
        await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
          console.log(err,txReceipt);
          this.setState({txReceipt});
        }); //await for getTransactionReceipt

        await this.setState({blockNumber: this.state.txReceipt.blockNumber});
        await this.setState({gasUsed: this.state.txReceipt.gasUsed});    
      } //try
    catch(error){
        console.log(error);
      } //catch
  } //onClickUploadFile

    handleChange = async (event) => {
        this.setState({
            nameValue: event.target.value
        });
    }


    onSubmit = async (event) => {
      event.preventDefault();

      //bring in user's metamask account address
      const accounts = await web3.eth.getAccounts();
     
      console.log('Current Metamask account: ' + accounts[0]);

      //obtain contract address from storehash.js
      const ethAddress= await storehash.options.address;
      this.setState({ethAddress});

      //save document to IPFS,return its hash#, and set hash# to state
      //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add 
      await ipfs.add(this.state.buffer, (err, ipfsHash) => {
        console.log(err,ipfsHash);
        //setState by setting ipfsHash to ipfsHash[0].hash 
        this.setState({ ipfsHash:ipfsHash[0].hash });

            storehash.methods.sendHash(this.state.ipfsHash).send({
              from: accounts[0]
            }, (error, transactionHash) => {
              console.log(transactionHash);
              this.setState({transactionHash});
            }); //storehash



      }) //await ipfs.add 
    }; //onSubmit 
  
    render() {
      
      return (
        <div className="App">
          <header className="App-header">
            <h1> Education Documents Certifier</h1>
          </header>

          <hr />

            <h3> Choose Education Document</h3>
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
                <input type="text" value={this.state.nameValue} name="firstname" placeholder="Enter text" onChange={this.handleChange}/>
                <br/>
                <p/>
                <label>Surname: </label>
                <input type="text" value={this.state.surnameValue} name="surname" placeholder="Enter text" onChange={this.handleChange}/>
                <br/>

                <Button
                    bsStyle="primary"
                    type="submit">
                    Send it
                </Button>
            </Form>

            <hr/>
            <Button onClick = {this.onClickUploadFile}> Get Transaction Receipt </Button>
            {this.state.ipfsHash}
            {this.state.ethAddress}
            {this.state.transactionHash}
            {this.state.blockNumber}
            {this.state.gasUsed}
     </div>
      );
    } //render
}

export default App;
