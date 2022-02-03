import { useState, useEffect } from 'react';
import React from 'react'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
  } from "reactstrap";

//Axios for http requests
import axios from 'axios';

export default function FileUpload ()  {
  const [selectedFileID, setSelectedFileID] = useState(null);
  const [selectedFileStatement, setSelectedFileStatement] = useState(null);
  const [userEmail, setuserEmail] = useState(null);

  const [Request_List, setRequest_List] = useState("");


  //Everytime the selectedfile hook is updated, refresh the UI view
  useEffect(() => {
    console.log('Refreshing page')
    refreshList()

  }, []);


  //Every time the user uploads a file, run this block
  const onFileChange_ID = async (e) => {
    console.log(e.target.files[0])
    setSelectedFileID(e.target.files[0]);

  }

  //Every time the user uploads a file, run this block
  const onFileChange_Statement = async (e) => {
    console.log(e.target.files[0])
    setSelectedFileStatement(e.target.files[0]);

  }

  const handleChange = async(e) => {
    let { name, value } = e.target;
    setuserEmail(value)

  };

  const handleSubmit = (item) => {
    setSelectedFileStatement(null)
    setSelectedFileID(null)

    if (item.id) {
      axios
        .put(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then(res => refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/todos/", item)
      .then(res => refreshList());
  };


  //File upload function, using a REST style api over HTTP

  const uploadFile = async (e) => {
    e.preventDefault();

    try{

    let requests = Request_List.filter(item => item.email.includes(userEmail))
    //console.log(requests)
    var focus_request = requests[0]
    var required_documents = focus_request["description"]
    if(selectedFileID !== null){
      required_documents = required_documents.replace("ID", "")
    }
    
    if(selectedFileStatement != null){
      required_documents = required_documents.replace("Bank Statement", "")
    }

    focus_request["description"] = required_documents

    handleSubmit(focus_request)

    alert('Your files have been uploaded and your profile updated')

    

    return true
  }
  catch{
    alert('There has been an issue with your file upload, it is likely that your email doesn\'t exist in our request system')
    return false

  }
  }


  const refreshList = () => {
    axios
      .get("http://localhost:8000/api/todos/")
      .then(res => setRequest_List(res.data))
      .catch(err => console.log(err));

      console.log(Request_List)
  };
  






  return (
    <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Edwin Kassier Client RM App - File Upload</h1>
        <h4 className="text-white text-uppercase text-center my-4">(We are assuming the user has logged in already )</h4>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
            <div className="" style={{padding: "10px"}}>
                <button onClick={()=>window.location = '/'} className="btn btn-primary">
                  Navigate to RM Page
                </button>
              </div>
              <div className="my-5 tab-list" >
              <form>
        <Box mt={2} textAlign="center">
        <div className="" style={{padding: "40px"}}>
        <Input
                type="text"
                name="user_name"
                onChange={e => handleChange(e)}
                placeholder="What is your email address?"
                
              />
              </div>
      <input
        accept="application/pdf"
        type="file"
        id="id"
        style={{ display: 'none' }}
        onChange={e => onFileChange_ID(e)}
      />
      <input
        accept="application/pdf"
        type="file"
        id="bank_statement"
        style={{ display: 'none' }}
        onChange={e => onFileChange_Statement(e)}
      />
      

      <label htmlFor="id" style={{padding: "10px"}}>
        <Button variant="contained" color="primary" component="span">
          Upload ID PDF
        </Button>
      </label>
      <label htmlFor="bank_statement" style={{padding: "10px"}}>
        <Button variant="contained" color="primary" component="span">
          Upload Bank Statement PDF
        </Button>
      </label>
      </Box>

      <Box mt={2} textAlign="center">

<Button variant="contained" onClick={e=>uploadFile(e)}>Upload my files</Button>
</Box>
      </form>
      {selectedFileID && (
        <Box mt={2} textAlign="center">
          <div>PDF Preview for ID doc:</div>
          <p>File Name: {selectedFileID.name}</p>
          <p>File Type: {selectedFileID.type}</p>
          <p>Last Modified: {selectedFileID.lastModifiedDate.toDateString()}</p>


        </Box>
      )}

{selectedFileStatement && (
        <Box mt={2} textAlign="center">
          <div>PDF Preview for Statement doc:</div>
          <p>File Name: {selectedFileStatement.name}</p>
          <p>File Type: {selectedFileStatement.type}</p>
          <p>Last Modified: {selectedFileStatement.lastModifiedDate.toDateString()}</p>


        </Box>
      )}

              </div>
              

            </div>
          </div>
        </div>

      </main>
        
    );
};


