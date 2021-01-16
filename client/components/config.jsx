import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rules from 'rules.jsx';

class Config extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <Rules></Rules>
    )
  }
}

export default Config