import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rule from './rule.jsx'

class Rules extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div class="rule" onclick={changeRuleStatus}>
        <h3>NAME</h3>
      </div>
    )
  }
}

export default Rules;