import React, { Component } from 'react'
import { Routes ,Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { useParams } from "react-router-dom";

import RmPage from './RmPage.js';
import FilePage from './FileUpload.js';


class Main extends Component {
    constructor(props) {
      super(props);
    }
    render() {
        return(

    <div>
<Routes>
    <Route path='/' element={<RmPage />}></Route>
      <Route path='/file_upload' element={<FilePage/>}></Route>
      </Routes>
  </div>
        )
        };
}

export default Main;