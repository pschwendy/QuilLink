import {Card, Button} from "react-bootstrap";
import {useState} from 'react';
import "./css/NotificationCard.css";
function NotificationCard(){

    return(

            <Card style={{"margin-top":"20px", "margin-right":"20vw"}}>
                <Card.Body class="flex">
                    <div class="half">
                    <Card.Text>
                    A condescending person left a review of your work.
                    </Card.Text>
                    </div>
                    <div class="half">
                    <Button className="dismiss-button noti-button" variant="primary" size="sm">Dismiss</Button>
                    <Button className="noti-button" variant="primary" size="sm">Open</Button>
                    </div>
                </Card.Body>
            </Card>

    );


}

export default NotificationCard;