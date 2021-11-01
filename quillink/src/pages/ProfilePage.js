import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import ShareCard from '../components/ShareCard';
import './css/Projects.css';
import './css/main.css';
import Notifications from '../components/Notifications';
import ProfileCardBeta from '../components/ProfileCardBeta';
import SideBar from '../components/SideBar';
import "./css/NotificationPage.css";
import userImage from '../images/th.png';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift().replace(/%20/g, " ");
}

function NotificationPage(props) {
    const [removeNames, setRemoveNames] = useState(window.innerWidth);
    const collapsed = props.collapsed;
    const [projectsReviewed, setProjectsReviewed] = useState([]);
    const [projectsCreated, setProjectsCreated] = useState([])
    fetch('/api/checkvalidity')
    .then(res => res.json())
    .then(ready => { 
        if(!ready) {
            console.log("POOP");
            window.location.replace("/");
        }
    });

    fetch("/api/userStats").then(res => {
        console.log(res);
        res.json().then(data => {
            setProjectsCreated("✏️ Projects created: " + data.projectsCreated);
            setProjectsReviewed("📚 Projects reviewed: " + data.projectsReviewed);
        });
    });

    return (
        <div id="page">
            <div style={{display: 'flex', justifyContent: 'flex-start', flexGrow: '999'}}>
                <SideBar 
                    className="side-area"
                    page={4}
                />
                <div id="notification" style={{flexGrow:4}}className="main-page">
                    <div style={{display: 'flex', justifyContent: 'flex-start', flexGrow: '999'}}>
                        <div style={{flexGrow: 2}}>
                            <div style={{marginTop: "20px"}}>
                                <a href="/profile" className="a-in">
                                    <div className="profile">
                                        <img src={userImage} style={{width: "100px",height: "100px",borderRadius: "100%" ,objectFit: "cover"}}/>
                                        <div>
                                            <span className="profile-text">{getCookie("name")}</span>
                                            <br/>
                                            <span className="profile-text">@{getCookie("username")}</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div style={{flexGrow:4}}>
                            <ProfileCardBeta 
                                text = "Tony Varkey" 
                                className = "carddd"/>
                            <ProfileCardBeta 
                                text ={projectsCreated}
                                className = "carddd"/>
                            <ProfileCardBeta text = {projectsReviewed} className = "carddd"/>
                        </div>
                    </div>
                    <div style={{marginTop: "50px", height: "500px"}}>
                        <h2>Want to see how good you are at typing?</h2>
                        <iframe
                            src="https://typing-speed-test.aoeu.eu/?iframe=1;lang=en"
                            style={{border: 0, marginTop: "50px"}}
                        ></iframe>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificationPage;