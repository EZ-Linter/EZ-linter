import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Rule extends Component{
  constructor(props){
    super(props);
  }

  render() {
    // destructuring properties passed down from props
    const { updateRule, ruleName, ruleValue } = this.props;

    // determining the background-color of rule based on ruleValue
    let color = 'white';
    if (ruleValue === 1) color = 'rgba(226, 102, 31, 0.6)';
    if (ruleValue === 2) color = 'rgba(245, 60, 60, 0.6)';

    return(
      <div className="rule" onClick={() => updateRule(ruleName)} style={{ 'color': `${color}` }}>
        <h3>{`${ruleName}, ${ruleValue}`}</h3>
      </div>
    )
  }
}

export default Rule;
