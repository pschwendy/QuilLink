import { useEffect, useState } from 'react';
import './css/SideBar.css';
import { Container, Card, Button} from "react-bootstrap";
import './css/Notifications.css';

function Notifications() {
    const [toggle, SetToggle] = useState(true);
    const ToggleProjects = () => {
        SetToggle(true);
    };
    const ToggleReviewing = () => {
        SetToggle(false);
    };

    function AcceptRequest(projectpk, user) {
        console.log("project: " + projectpk);
        console.log("user: " + user);
        fetch("/api/acceptRequest", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: user,
                projectpk: projectpk
            })
        })
        .then(res => res.json)
        .then(result => {
            if(result) {
                fetchNotifs();
            }
        })
    }

    function DeclineRequest(projectpk, user) {
        console.log("project: " + projectpk);
        console.log("user: " + user);
        fetch("/api/declineRequest", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: user,
                projectpk: projectpk
            })
        })
        .then(res => res.json)
        .then(result => {
            if(result) {
                fetchNotifs();
            }
        })
    }

    const [notifications, SetNotifs] = useState([]);
    const fetchNotifs = () => {
        fetch("/api/checkRequests")
        .then(res => res.json())
        .then(notifs => {
            console.log(notifs);
            const internotifs = [];
            for(var project of notifs) {
                for(var notif of project.requests) {
                    const projectpk = project.pk;
                    internotifs.push(
                        <div className="notification">
                            {notif} requested to review your project "{project.title}"{' '}
                            <div style={{float: "right"}}><Button className="pull-right" size="sm" style={{backgroundColor: "green !important"}} variant="success" onClick={() => {AcceptRequest(projectpk, notif);}}>Accept</Button>{'   '}<Button onClick={() => {DeclineRequest(projectpk, notif);}} className="pull-right" size="sm" variant="primary">Decline</Button></div>
                        </div>
                    )
                }
            }
            SetNotifs(internotifs);
        });
    }
    useEffect(() => {
        fetchNotifs();
        const interval = setInterval(() => {
            console.log("fetching requests");
            fetchNotifs();
            
        }, 20 * 1000);
        return () => clearInterval(interval);
    }, [])
    
    return (
        <div id="notif-bar">
            <div id="inner-notif">
                <Card id="notification-center">
                    <span className="notif-toggler bolded">
                        {/*<div onClick={ToggleProjects} className={toggle === true ?  "toggled toggle": "toggle"} id="first-toggle">
                            <div className = ""> <a> My Projects </a> </div> 
                        </div>
                        <div onClick={ToggleReviewing} className={toggle === true ?  "toggle": "toggled toggle"}>
                            <div className = "" > <a> Reviewing </a> </div>
    </div>*/}
                        <div className="toggled toggle">Review Requests</div>
                    </span>
                    <div id="project-list">
                    {notifications}
                        { /*toggle === true ? 
                        <div>
                            {notifications}
                            <div className="notification">
                            David made 8 comments on your project <Button className="pull-right" size="sm" variant="primary">Open</Button>
                            </div>
                            <div className="notification">
                                David made 8 comments on your project
                            </div>
                            <div className="notification">
                                David made 8 comments on your project
                            </div>
                        </div>
                        : 
                        <div className="notification">
                            David made 8 comments on Tim's project
                        </div>*/
                        }
                    </div>
                </Card>`
            </div>
        </div>
    );
}

export default Notifications;