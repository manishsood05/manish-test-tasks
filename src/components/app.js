import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/home/index';
import Pokemon from './pages/pokemon/index';
//import About from '../about';

const App = () => (
    <main>
      <Route exact path="/" component={Home} />
      <Route path="/pokemon" component={Pokemon} />
    </main>
);

export default App;
