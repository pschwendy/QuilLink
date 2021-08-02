import './css/SideBar.css';
import {ListGroup, Container} from "react-bootstrap";

function SideBar() {
    return (
        /*<div>
            <div id="side-bar">
                This is the side bar
            </div>
        </div>*/
        <div>
        <Container fluid>
        <ListGroup className="options">
            <ListGroup.Item className="item" action href="/">
                Projects
            </ListGroup.Item>
            <ListGroup.Item className="item" action href="/explore">
                Explore
            </ListGroup.Item>
            <ListGroup.Item className="item" action href="/trending">
                Trending
            </ListGroup.Item>
            <ListGroup.Item className="item" action href="/notifications">
                Notifications
            </ListGroup.Item>
        </ListGroup>
        </Container>
        </div>
    );
}

export default SideBar;