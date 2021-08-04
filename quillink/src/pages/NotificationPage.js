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
    return (
        <div style={{display: 'flex', justifyContent: 'flex-start', flexGrow: '999'}}>
            <SideBar className="side-area"/>
            <div id="notification" style={{flexGrow:999}}className="main-page">
                <NotificationCard/>
                <NotificationCard/>
                <NotificationCard/>
            </div>

        </div>
    );
}

export default NotificationPage;