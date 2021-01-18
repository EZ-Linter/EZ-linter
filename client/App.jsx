import React, { Component } from 'react';
import Main from './components/mainPage.jsx';
import { BrowserRouter as Router, Switch, Route, Link, useParams} from 'react-router-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div id="entry">
          <header id="title">
            <h1>EZ-linter</h1>
          </header>
          <Switch>
            <Route path="/shared/:id" children={<MainRenderer />} />
            <Route path="/" children={<Main />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function MainRenderer() {
  const { id: sharedConfigId } = useParams();
  return <Main sharedConfigId={sharedConfigId} />
}