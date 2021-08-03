import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import './css/ProjectCard.css';

function ProjectCard(props) {
    return (
        //<Button>HOLA</Button>
        <Card className="project-card" style={{width: '100%'}}>
            <Card.Img variant="top"/>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                {props.description}
                </Card.Text>
                <div className="button-holder">
                    <Button className="go-to" variant="primary">Go to Project</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ProjectCard;