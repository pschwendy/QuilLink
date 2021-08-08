import {Card, Button} from "react-bootstrap";
import { useState } from 'react';
import "./css/NotificationCard.css";
function NotificationCard(props){
    const [isDestroyed, destroy] = useState(false);

    var destroyOnClick = () => {
        destroy(true);
    };

    return(
            <Card style={isDestroyed === true ? {display: 'none'} : {"margin-top":"20px"}}>
                <Card.Body class="flex">
                    <div class="half">
                    <Card.Text>
                    {props.text}
                    </Card.Text>
                    </div>
                    <div class="half">
                    <Button onClick={destroyOnClick} className="dismiss-button noti-button" variant="primary" size="sm">Dismiss</Button>
                    <Button className="noti-button" variant="primary" size="sm">Open</Button>
                    </div>
                </Card.Body>
            </Card>

    );


}

export default NotificationCard;