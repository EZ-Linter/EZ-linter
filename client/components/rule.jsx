import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Rule extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="rule" onClick={() => this.props.updateRule(this.props.name, this.props.value)}>
        <h3>{`${this.props.name}, ${this.props.value}`}</h3>
      </div>
    )
  }
}

export default Rule;
