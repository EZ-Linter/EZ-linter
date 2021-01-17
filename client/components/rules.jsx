import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rule from './rule.jsx'

class Rules extends Component{
  constructor(props){
    super(props);
  }
  
  render() {
    // destructuring properties passed down from props
    const { rules, updateRule } = this.props;

    // for each rule/value pair, create a rule component
    const rulesArray = [];
    const rulePairs = Object.entries(rules);
    for(let i = 0; i < rulePairs.length; i++) {
      rulesArray.push(
        <Rule 
          key={`Rule-${i}`}
          updateRule={updateRule}
          ruleName={rulePairs[i][0]}
          ruleValue={rulePairs[i][1]}
        />
      );
    }
    
    return(
        <div id="ruleContainer">
          <h2>Rules</h2>
          <div id="ruleGrid">
            {rulesArray}
          </div>
        </div>
    )
  }
}

export default Rules;
