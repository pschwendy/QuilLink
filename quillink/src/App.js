import logo from './logo.svg';
import './App.css';

import Projects from './pages/Projects';
import Explore from './pages/Explore';
import DocEditor from './pages/DocEditer';
import NotificationsPage from "./pages/NotificationPage"
import ProfilePage from "./pages/ProfilePage"
import SignIn from './pages/SignInP2';
import DocViewer from './pages/DovViewer';
import SideBar from './components/SideBar';
import Notifications from './components/Notifications';


import { Container, Row, Col } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import './pages/css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import SignUp from './pages/SignUp';
import Trending from './pages/Trending';


function App() {
  return (
    <div className="App">  
      <div className="container mx-auto">
        <Switch>
          <Route exact path='/' component={SignIn}/>
          <Route path="/sign-up" component={SignUp}/>
          <Route exact path='/projects' component={Projects}/>
          <Route path='/explore' component={Explore}/>
          <Route path='/:document/edit' component={DocEditor}/>
          <Route path='/:document/view' component={DocViewer}/>
          <Route path="/trending" component={Trending}/>
          <Route path="/notifications" component={NotificationsPage}/>
          <Route path="/profile" component={ProfilePage}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
