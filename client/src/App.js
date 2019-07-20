import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';
import Libraries from './components/Libraries.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Libraries}/>
          <Route path="/:libraryId" component={singleLibrary} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
