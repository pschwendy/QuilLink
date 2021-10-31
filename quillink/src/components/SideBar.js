import './css/SideBar.css';
import { useState } from 'react';
import {ListGroup, Container} from "react-bootstrap";
import contract from '../images/contract.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faSearch, faArrowUp, faBell, faUser} from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import userImage from '../images/th.png';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift().replace(/%20/g, " ");
}

function SideBar(props) {
    console.log(document.cookie);
    const collapsed = props.collapsed;
    console.log(collapsed);
    const [removeNames, setRemoveNames] = useState(window.innerWidth);
    const editSideBar = () => {
        setRemoveNames(window.innerWidth);
    }
    window.addEventListener('resize', editSideBar);
    return (
        <div class="questionable-stuff" id="side-area" style={removeNames < 800 || collapsed ? {'max-width':'68px'} : {'max-width':'200px'}}>
            <div id="inner-side" style={removeNames < 800 || collapsed ? {width:'88px'} : {width:'200px'} }>
                <div id="side-bar">
                    <div style={{position: "relative"}}>
                        <ListGroup className="options" variant="flush">
                            <a className="logo" action href='/'>
                                <img style={removeNames < 800 || collapsed ?  {width: '30px', height: '30px', verticalAlign: "middle"} :  {width: '50px', height: '50px'}} src={contract}/>
                            </a>
                            <ListGroup.Item className={props.page === 0 ? "active item" : "item"} action href="/projects">
                                <div className="sidebar-icon">
                                    <FontAwesomeIcon style={removeNames < 800 || collapsed ? {verticalAlign: "middle"}: {}} icon={faPencilAlt} />
                                </div>
                                <div className={removeNames < 800 || collapsed ? "sidebar-name disappear" : "sidebar-name"} >
                                    Projects
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item className={props.page === 1 ? "active item" : "item"} action href="/explore">
                                <div className="sidebar-icon"><FontAwesomeIcon style={removeNames < 800 || collapsed ? {verticalAlign: "middle"}: {}} icon={faSearch} /></div>
                                <div className={removeNames < 800 || collapsed ? "sidebar-name disappear" : "sidebar-name"}>Explore</div> 
                            </ListGroup.Item>
                            <ListGroup.Item className={props.page === 2 ? "active item" : "item"} action href="/trending">
                                <div className="sidebar-icon"><FontAwesomeIcon style={removeNames < 800 || collapsed ? {verticalAlign: "middle"}: {}} icon={faArrowUp}/></div>
                                <div className={removeNames < 800 || collapsed ? "sidebar-name disappear" : "sidebar-name"}>Trending</div>
                            </ListGroup.Item>
                            <ListGroup.Item className={props.page === 3 ? "active item" : "item"} action href="/notifications">
                                <div className="sidebar-icon"><FontAwesomeIcon style={removeNames < 800 || collapsed ? {verticalAlign: "middle"}: {}} icon={faBell}/></div>
                                <div className={removeNames < 800 || collapsed ? "sidebar-name disappear" : "sidebar-name"}>Notifications</div>
                            </ListGroup.Item>
                            <ListGroup.Item className={props.page === 4 ? "active item" : "item"} action href="/profile">
                                <div className="sidebar-icon"><FontAwesomeIcon style={removeNames < 800 || collapsed ? {verticalAlign: "middle"}: {}} icon={faUser}/></div>
                                <div className={removeNames < 800 || collapsed ? "sidebar-name disappear" : "sidebar-name"}>Profile</div>
                            </ListGroup.Item>
                        </ListGroup>
                        <div id="profile-area">
                            <a href="/profile" className="a-in">
                                <div className="profile">
                                    <img src={userImage} className="profile-pic"/>
                                    <div className={removeNames < 800 || collapsed ? "disappear" : "inner-profile"}>
                                        <span className="profile-text">{getCookie("name")}</span>
                                        <span className="profile-text">@{getCookie("username")}</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;