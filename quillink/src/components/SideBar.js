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
        <ListGroup>
            <ListGroup.Item action href="/">
                Projects
            </ListGroup.Item>
            <ListGroup.Item action href="/explore">
                Explore
            </ListGroup.Item>
            <ListGroup.Item action href="/trending">
                Trending
            </ListGroup.Item>
        </ListGroup>
        </Container>
        </div>
    );
}

export default SideBar;