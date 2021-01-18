import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rule from './rule.jsx'
import ApplyAll from './applyAll.jsx'

class Rules extends Component{
  constructor(props){
    super(props);
  }
  
  render() {
    // destructuring properties passed down from props
    const { rules, updateRule } = this.props;
    // for each rule/value pair, create a rule
    // add <ApplyAll/> as first element
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
        <div className="Container">
          <div className="Title" id="rulesTitle">
            <div id="row">
              <h2>{'>'}</h2>
              <h2>Rules</h2>
            </div>
            <div id="row">
              <h3>Apply Style Guide</h3>
              <h3>{'<'}</h3>
            </div>
          </div>
          <div className="Grid">
            {rulesArray}
          </div>
        </div>
    )
  }
}

export default Rules;
