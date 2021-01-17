import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rule from './rule.jsx'

class Rules extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    const { rules, updateRule } = this.props;
    const rulesArray = [];
    let n = 0;
    const rulePairs = Object.entries(rules);
    for(let i = 0; i < rulePairs.length; i++){
      rulesArray.push(<Rule key={`Rule-${i}`} updateRule={updateRule} name={rulePairs[i][0]} value={rulePairs[i][1]}></Rule>)
    }
    
    return(
      <div id="ruleBox">
        {rulesArray}
      </div>
    )
  }
}

export default Rules;
