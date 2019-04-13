import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import withRoot from './withRoot';
import Home from './components/Home';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Header from './components/Shared/Header';
import Footer from './components/Shared/Footer';
import NotFound from './components/Shared/NotFound';

const Root = () => {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: '70vh' }}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/skills' component={Skills} />
          <Route path='/portfolio' component={Portfolio} />
          <Route path='/contact' component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default withRoot(Root);
