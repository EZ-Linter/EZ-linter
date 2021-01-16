import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rule from './rule.jsx'

class Rules extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id="ruleBox">
        <Rule></Rule>
      </div>
    )
  }
}

export default Rules;
