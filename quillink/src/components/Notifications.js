import { useState } from 'react';
import './css/SideBar.css';
import { Card, Button} from "react-bootstrap";
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
            <Card id="notification-center">
                <span className="notif-toggler bolded">
                    <div onClick={ToggleProjects} className="toggle" id="first-toggle">
                        <div className={toggle === true ?  "toggled": ""}> My Projects</div> 
                    </div>
                    <div onClick={ToggleReviewing} className="toggle">
                        <div className={toggle === true ?  "": "toggled"}> Reviewing</div>
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
            </Card>
        </div>
    );
}

export default Notifications;