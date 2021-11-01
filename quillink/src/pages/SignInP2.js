import {Card, Button} from "react-bootstrap";
import "./css/SignIn.css";
import { GoogleLogin } from 'react-google-login';
import { useEffect, Component } from "react";
import logo from '../images/logo.jpg';

const client_id = "938287165987-46mtptnb715mi1rop7l810o233ue470l.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/drive" // https://www.googleapis.com/auth/documents.readonly https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly"

function GoogleSignIn() {
    const onSuccess = (googleUser) => {
        const profile = googleUser.getBasicProfile();
        console.log(googleUser.getAuthResponse());
        var token = googleUser.getAuthResponse().id_token;
        //var token = googleUser['code']
        console.log("SUCCESS");
        var access_token = googleUser.getAuthResponse().access_token;
        //console.log(googleUser.getAuthResponse());
        fetch('/tokensignin/' + token + '/' + access_token)
        .then(res => res.json())
        .then(ready => { 
            if(ready) {
                window.location.replace("/projects");
                console.log(ready);
            } else {
                console.log("HELLO???????");
                window.location.replace("/sign-up");
            }
        });
    }
    var signedIn = false;
    /*fetch('/api/checkvalidity')
    .then(res => res.json())
    .then(result => { 
        if(result) {
            console.log("HELLO");
            signedIn = true;
            window.location.replace("/projects");
        } else {
            signedIn = false;
        }
    });*/

    return (
        <div>
            <GoogleLogin
                clientId={client_id}
                buttonText="Sign In"
                onSuccess={onSuccess}
                onFailure={console.log("problem")}
                isSignedIn={false}
                scope={SCOPES}
                accessType="offline"
                approvalPrompt="force"
                prompt='consent'
            />
        </div>
    );
}

function SignIn() {
    console.log("What?");
    return (
        <div id="sign-in">
            <div>
                <h1 style={{color: "black", position: "absolute", top: "2.5%", left: "45%", width: "5%", color: "#454ADE"}}><b>Quillink</b></h1>
                <h2 style={{color: "black", position: "absolute", top: "9%", left: "25%", width: "50%", color: "#454ADE"}}>Writers, Editors- Unite!</h2>
                <img id="thelogo" className="signin-logo" src={logo}/>
                <script src="https://apis.google.com/js/platform.js" async defer></script>
                <div id="sign-in-card">
                    <Card id="the-card">
                        <Card.Body>
                            <div className="section">
                                <div><input className="sign-in-input" type='text' placeholder="Email"></input></div>
                                <div><input className="sign-in-input" type='text' placeholder="Password"></input></div>
                                <Button className="signin-button">Sign In</Button>
                            </div>
                            <hr></hr>
                            <div className="section">
                                <GoogleSignIn/>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default SignIn;