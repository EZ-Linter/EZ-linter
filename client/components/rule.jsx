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
    let opacity = "30%";
    // rgb val of '$black2'
    let backgroundColor = "rgb(0,0,0,0.4)";
    if (ruleValue === 1) {
      opacity = "100%";
      // hex val of '$orange'
      backgroundColor = "#e57a10";
    } 
    else if (ruleValue === 2) {
      opacity = "100%";
      // hex val of'$red'
      backgroundColor = "#8f1a00";
    }

    return(
      <div className="rule" onClick={() => updateRule(ruleName)} style={{ 'background-color': backgroundColor, 'opacity': opacity }}>
        <h3 id="ruleText">{`${ruleName}`}</h3>
      </div>
    )
  }
}

export default Rule;
