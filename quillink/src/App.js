import logo from './logo.svg';
import './App.css';
import Projects from './pages/Projects';
import SideBar from './components/SideBar';
import { Container, Row, Col } from 'react-bootstrap';
import './pages/css/main.css'

function App() {
  return (
    <div className="App">
      <Container style={{position: "relative"}}>
      <div id="page">
        <SideBar id="the-side-bar"/>
        <Projects className="main-page"/>
      </div>
      </Container>
    </div>
  );
}

export default App;
