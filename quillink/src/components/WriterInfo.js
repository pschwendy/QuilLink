import { useState } from 'react';
import './css/SideBar.css';
import { Container, Card, Button} from "react-bootstrap";
import './css/Notifications.css';
import './css/WriterInfo.css';
import { propTypes } from 'react-bootstrap/esm/Image';

function WriterInfo(props) {
    const [toggle, SetToggle] = useState(true);
    const ToggleProjects = () => {
        SetToggle(true);
    };
    const ToggleReviewing = () => {
        SetToggle(false);
    };

    const requestEdit = () => {
        console.log("requesting edit")
        fetch('/api/requestEdit', {
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                projectpk: props.projectpk
            })
        });
    };

    return (
        <div id="notif-bar">
            <div id="inner-notif">
                <div className="writer-info">
                    By {props.writer}
                    <div id="proj-title">{props.title}</div>
                    <br></br>
                    <div id="description">{props.description}</div>
                    <div id="blank-box"></div>
                    <div id="editor-info">
                        <div id="editors">Editors</div>
                        <hr></hr>
                        <div className="editor">
                            <a href="/profile">
                                <div>Peter Schwendeman</div>
                                <div>@pschwendy</div>
                            </a>
                        </div>
                        <div className="editor">
                            <a href="/profile">
                                <div>Tony Varkey</div>
                                <div>@theYNOT_varkey</div>
                            </a>
                        </div>
                        <hr></hr>
                        <div onClick={requestEdit} className="editor">
                        { props.requested === true ?
                            <div>
                                Edit Requested
                            </div>
                            : 
                            <div>
                                Request to edit
                            </div>
                        }
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    );
}

export default WriterInfo;