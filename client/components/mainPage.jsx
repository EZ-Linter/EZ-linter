import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Config from './config.jsx';
// import * as Actions from './actions/actions.js'
import ExportBtn from './ExportBtn.jsx';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="main">
        {/* <ExportBtn config={/* should receive config object from state once it's pulled up */} /> */}
        <Config />
      </div>
    );
  }
}

{
  /* <form method="GET" action='/createroom'> */
}
{
  /* <form method="POST" action='/joinroom'></form> */
}

export default Main;
