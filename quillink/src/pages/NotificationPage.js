import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import ShareCard from '../components/ShareCard';
import './css/Projects.css';
import './css/main.css';
import Notifications from '../components/Notifications';
import NotificationCard from '../components/NotificationCard';
import SideBar from '../components/SideBar';
import "./css/NotificationPage.css"

function NotificationPage() {
    fetch('/api/checkvalidity')
    .then(res => res.json())
    .then(ready => { 
        if(!ready) {
            console.log("POOP");
            window.location.replace("/");
        }
    });
    return (
        <div id="page">
            <div style={{display: 'flex', justifyContent: 'flex-start', flexGrow: '999'}}>
                <SideBar 
                    className="side-area"
                    page={3}
                />
                <div id="notification" style={{flexGrow:4}}className="main-page">
                    <NotificationCard 
                        text = "Aarnav is cooler than petonyAarnav is cooler than petonyAarnav is cooler than petonyAarnav is cooler than petonyAarnav is cooler than petonyAarnav is cooler than petony" 
                        className = "carddd"/>
                    <NotificationCard 
                        text =" Peter is the coolest." 
                        className = "carddd"/>
                    <NotificationCard text = "Tony is adequete" className = "carddd"/>
                </div>
            </div>
        </div>
    );
}

export default NotificationPage;