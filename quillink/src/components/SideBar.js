import './css/SideBar.css';
import { useState } from 'react';
import {ListGroup, Container} from "react-bootstrap";
import contract from '../images/contract.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faSearch, faArrowUp, faBell } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';

function SideBar() {
    const [removeNames, setRemoveNames] = useState(window.innerWidth);
    const editSideBar = () => {
        setRemoveNames(window.innerWidth);
    }
    window.addEventListener('resize', editSideBar);
    return (
        <div class="questionable-stuff" id="side-area" style={removeNames > 800 ? {'max-width':'200px'} : {'max-width':'68px'}}>
            <div id="inner-side" style={removeNames > 800 ? {width:'200px'} : {width:'88px'}}>
                <div id="side-bar">
                    <ListGroup className="options" variant="flush">
                        <a className="logo" action href='/'>
                            <img style={removeNames > 800 ? {width: '50px', height: '50px'} : {width: '30px', height: '30px'}} src={contract}/>
                        </a>
                        <ListGroup.Item className="item" action href="/projects">
                            <div className="sidebar-icon">
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </div>
                            <div className={removeNames > 800 ? "sidebar-name" : "sidebar-name disappear"} >
                                Projects
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="item" action href="/explore">
                            <div className="sidebar-icon"><FontAwesomeIcon icon={faSearch} /></div>
                            <div className={removeNames > 800 ? "sidebar-name" : "sidebar-name disappear"}>Explore</div> 
                        </ListGroup.Item>
                        <ListGroup.Item className="item" action href="/trending">
                            <div className="sidebar-icon"><FontAwesomeIcon icon={faArrowUp}/></div>
                            <div className={removeNames > 800 ? "sidebar-name" : "sidebar-name disappear"}>Trending</div>
                        </ListGroup.Item>
                        <ListGroup.Item className="item" action href="/notifications">
                            <div className="sidebar-icon"><FontAwesomeIcon icon={faBell}/></div>
                            <div className={removeNames > 800 ? "sidebar-name" : "sidebar-name disappear"}>Notifications</div>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
        </div>
    );
}

export default SideBar;