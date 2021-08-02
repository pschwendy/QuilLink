import logo from './logo.svg';
import './App.css';

import Projects from './pages/Projects';
import Explore from './pages/Explore';
import DocEditor from './pages/DocEditer';

import SideBar from './components/SideBar';
import Notifications from './components/Notifications';

import { Container, Row, Col } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import './pages/css/main.css'

function App() {
  return (
    <div className="App">
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700;800&display=swap" rel="stylesheet"></link>
      <style>
        {`
        .bolded{
          font-family: 'Raleway', sans-serif;
          font-weight: 700;
        }
        .btn{
          background-color: #454ADE !important;
          border-color: #454ADE !important;
          font-weight: 700 !important;
        }

        .active{
          background-color: #454ADE !important;
        }

        *{
          font-family: 'Raleway', sans-serif;
        }


        `}
        
      </style>
      
      <Container style={{position: "relative"}}>
      <div id="page">
        <Col sm={3} className="side-info bolded">
          <SideBar/>
        </Col>
        <Col sm={6}>
          <Switch>
            <Route exact path='/' component={Projects}/>
            <Route path='/explore' component={Explore}/>
            <Route path='/doc-editor' component={DocEditor}/>
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
