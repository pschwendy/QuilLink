import logo from './logo.svg';
import './App.css';
import Projects from './pages/Projects';
import SideBar from './components/SideBar';
import Explore from './pages/Explore';
import Notifications from './components/Notifications';
import { Container, Row, Col } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import './pages/css/main.css'

function App() {
  return (
    <div className="App">
      <Container style={{position: "relative"}}>
      <div id="page">
        <Col sm={3} className="side-info">
          <SideBar/>
        </Col>
        <Col sm={6}>
          <Switch>
            <Route exact path='/' component={Projects}/>
            <Route path='/explore' component={Explore}/>
          </Switch>
        </Col>
        <Col sm={3} className="side-info">
          <Notifications/>
        </Col>
      </div>
      </Container>
    </div>
  );
}

export default App;
