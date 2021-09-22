import { useState } from 'react';
import './css/SideBar.css';
import { Container, Card, Button} from "react-bootstrap";
import './css/Notifications.css';
import './css/WriterInfo.css';

function WriterInfo() {
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
                <div className="writer-info">
                    By Aarnav Undadkat
                    <div id="proj-title">The Ultimate Guide to BPA</div>
                    <br></br>
                    <div id="description">Hi, I'm Aarnav, president of BPA at Huron. From placing nationally to making board, this short novel entails everything you will need to know to become an ultimate BPA SUPERSTAR!</div>
                    <div id="blank-box"></div>
                    <div id="editor-info">
                        <div id="editors">Editors</div>
                        <hr></hr>
                        <div className="editor">
                            <div>Peter Schwendeman</div>
                            <div>@pschwendy</div>
                        </div>
                        <div className="editor">
                            <div>Tony Varkey</div>
                            <div>@theYNOT_varkey</div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    );
}

export default WriterInfo;