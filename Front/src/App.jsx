import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import NewUser from './components/NewUser';
import Login from './components/Login';
import Home from './components/Home';
import Homeadmin from './components/Homeadmin';
import NousSituer from './components/NousSituer';
import NousSitueradmin from './components/NousSitueradmin';
import GalleryList from './components/GalleryList';
import GalleryAdmin from './components/GalleryAdmin';
import Mention from './components/Mention';
import PrivateRoute from './components/PrivateRoute';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <div>
      <div className="">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/homeadmin" component={Homeadmin} exact />
            <Route path="/gallery" component={GalleryList} />
            <Route path="/mentionlegal" component={Mention} />
            <Route path="/galleryadmin" component={GalleryAdmin} />
            <Route path="/noussituer" component={NousSituer} />
            <PrivateRoute path="/noussitueradmin" component={NousSitueradmin} exact />
            <Route exact path="/Contact" component={Contact} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/newuser" component={NewUser} exact />
            <Route  component={PageNotFound} />
          </Switch>
          <Footer className="footer" />
        </Router>
      </div>
    </div>
  );
}

export default App;

