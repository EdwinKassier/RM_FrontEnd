// frontend/src/App.js

import React, { Component } from "react";
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import Modal from "./components/Modal";
import axios from "axios";

import Main from './Main';

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}
export default App;
