import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Config from './config.jsx'
// import * as Actions from './actions/actions.js'

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="main">
        <Config />
        <script src="jquery.min.js"></script>
        <script src="jquery.textfill.min.js"></script>
      </div>
    );
  }
}

{/* <form method="GET" action='/createroom'> */}
{/* <form method="POST" action='/joinroom'></form> */}

export default Main;
