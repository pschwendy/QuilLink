import {Card, Button} from "react-bootstrap";
import "./css/SignIn.css";
import { GoogleLogin } from 'react-google-login';
import { useEffect, Component, useState } from "react";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleUsername(event) {
        setUsername(event.target.value);
    }

    function handlePassword(event) {
        setPassword(event.target.value);
    }

    const callSignUp = () => {
        var data = {
            "username": username,
            "password": password,
        }

        fetch('/api/signup/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(ready => { 
            if(ready) {
                window.location.replace("/projects");
                console.log(ready);
            } else {
                console.log("error")
            }
        });
    }
    return (
        <div id="sign-in">
            <div id="sign-in-card">
                <Card id="the-card">
                    <Card.Body>
                        <div className="section">
                            <form>
                                <div><input className="sign-in-input" value={username} onChange={handleUsername} type='text' name="username" placeholder="Username"></input></div>
                                <div><input className="sign-in-input" value={password} onChange={handlePassword} type='password' name="password" placeholder="Password"></input></div>
                                <div><input className="sign-in-input" type='password' placeholder="Confirm Password"></input></div>
                                <Button className="signin-button" onClick={callSignUp}>Sign Up</Button>
                            </form>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default SignUp;