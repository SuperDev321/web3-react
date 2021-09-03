import React from 'react';
import { HashRouter as Router,Route,Switch } from 'react-router-dom';
import './App.css';
import './assets/css/style.css';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/home/index';
import Gallery from './pages/Gallery';

const getBasename = path => path.substr(0, path.lastIndexOf('/'));
function App() {
  return (
    <div>
      <Router basename={getBasename(window.location.pathname)}>
        <Header/>
          <ScrollToTop />
          <Switch>
            <Route exact path='/'component={Home}/>
            <Route exact path='/gallery'component={Gallery}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;

