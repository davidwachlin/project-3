import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SingleLibrary from './components/singleLibrary'
import Libraries from './components/Libraries.jsx';
import Books from './components/Books'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Libraries}/>
          <Route path="/:libraryId/books" component={Books} />
          <Route path="/:libraryId" component={SingleLibrary} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
