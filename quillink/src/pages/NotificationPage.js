import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import ShareCard from '../components/ShareCard';
import './css/Projects.css';
import './css/main.css';
import Notifications from '../components/Notifications';
import NotificationCard from '../components/NotificationCard';

function NotificationPage() {
    return (
        <div style={{display: 'flex', justifyContent: 'flex-start', flexGrow: '999'}}>
            <div id="notification" className="main-page">
                <NotificationCard/>
            </div>
            <Notifications className="side-info" />
        </div>
    );
}

export default NotificationPage;