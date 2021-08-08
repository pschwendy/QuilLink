import { useState } from 'react';
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
    return (
        <div id="notif-bar">
            <div id="inner-notif">
                <Card id="notification-center">
                    <span className="notif-toggler bolded">
                        <div onClick={ToggleProjects} className={toggle === true ?  "toggled toggle": "toggle"} id="first-toggle">
                            <div className = ""> <a> My Projects </a> </div> 
                        </div>
                        <div onClick={ToggleReviewing} className={toggle === true ?  "toggle": "toggled toggle"}>
                            <div className = "" > <a> Reviewing </a> </div>
                        </div>
                    </span>
                    <div id="project-list">
                        { toggle === true ? 
                        <div>
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
                        </div>
                        }
                    </div>
                </Card>`
            </div>
        </div>
    );
}

export default Notifications;