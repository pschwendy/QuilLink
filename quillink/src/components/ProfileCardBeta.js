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
                </Card.Body>
            </Card>

    );


}

export default NotificationCard;