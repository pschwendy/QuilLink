import {Card, Button} from "react-bootstrap";
import "./css/SignIn.css";

function SignIn() {
    return (
        <div id="sign-in">
            <div id="sign-in-card">
                <Card id="the-card">
                    <Card.Body>
                        <div className="section">
                            <div><input type='text' placeholder="Email"></input></div>
                            <div><input type='text' placeholder="Password"></input></div>
                            <Button className="signin-button">Sign In</Button>
                        </div>
                        <hr></hr>
                        <div className="section">
                            <Button className="gsignin">Sign In With Google</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default SignIn;