import logo from './logo.svg';
import './App.css';
import Projects from './pages/Projects';
import SideBar from './components/SideBar';
import Explore from './pages/Explore'
import { Container, Row, Col } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import './pages/css/main.css'

function App() {
  return (
    <div className="App">
      <Container style={{position: "relative"}}>
      <div id="page">
        <Col sm={4}>
          <SideBar id="the-side-bar"/>
        </Col>
        <Col sm={8}>
        <Switch>
          <Route exact path='/' component={Projects}/>
          <Route path='/explore' component={Explore}/>
        </Switch>
        </Col>
      </div>
      </Container>
    </div>
  );
}

export default App;
