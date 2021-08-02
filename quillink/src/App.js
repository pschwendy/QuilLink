import logo from './logo.svg';
import './App.css';
import Projects from './pages/Projects';
import SideBar from './components/SideBar';
import { Container, Row, Col } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import './pages/css/main.css'

function App() {
  return (
    <div className="App">
      <Container style={{position: "relative"}}>
      <div id="page">
        <SideBar id="the-side-bar"/>
        <Switch>
          <Route exact path='/' component={Projects}/>
        </Switch>
      </div>
      </Container>
    </div>
  );
}

export default App;
