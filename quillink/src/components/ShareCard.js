import { Button, Card } from 'react-bootstrap';
import './css/ProjectCard.css';
import userImage from '../images/th.png';
function ShareCard(props) {
    return (
        //<Button>HOLA</Button>
        <Card className="project-card" style={{width: '100%'}}>
            <Card.Header className="profile-header">
                <img src={userImage} className="pfp"/>
                <div className="username">@username/email{props.username}</div>
            </Card.Header>
            <Card.Img variant="top"/>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                {props.description}
                </Card.Text>
                <div className="button-holder">
                    <a href="/lsadsd/view"><Button className="go-to" variant="primary">Go to Project</Button></a>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ShareCard;