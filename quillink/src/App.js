import logo from './logo.svg';
import './App.css';

import Projects from './pages/Projects';
import Explore from './pages/Explore';
import DocEditor from './pages/DocEditer';
import NotificationsPage from "./pages/NotificationPage"
import SignIn from './pages/SignIn';

import SideBar from './components/SideBar';
import Notifications from './components/Notifications';


import { Container, Row, Col } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import './pages/css/main.css';

function App() {
  return (
    <div className="App">  
      <div style={{position: "relative"}}>
        <Switch>
        <Route exact path='/' component={SignIn}/>
          <Route exact path='/projects' component={Projects}/>
          <Route path='/explore' component={Explore}/>
          <Route path='/doc-editor' component={DocEditor}/>
          <Route path-="/notifications" component={NotificationsPage}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
