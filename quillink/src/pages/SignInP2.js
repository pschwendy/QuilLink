import {Card, Button} from "react-bootstrap";
import "./css/SignIn.css";
import { GoogleLogin } from 'react-google-login';
import { useEffect, Component } from "react";

const client_id = "938287165987-46mtptnb715mi1rop7l810o233ue470l.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/documents.readonly https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly"

function GoogleSignIn() {
    
    const onSuccess = (googleUser) => {
        const profile = googleUser.getBasicProfile();
        console.log(googleUser.getAuthResponse());
        var token = googleUser.getAuthResponse().id_token;
        //var token = googleUser['code']
        console.log(token);
        var access_token = googleUser.getAuthResponse().access_token;
        //console.log(googleUser.getAuthResponse());
        fetch('/tokensignin/' + token + '/' + access_token)
        /*.then(res => { 
            if(res) {
                window.location.replace("/projects");
                console.log(res);
            } else {
                console.log("fail");
            }
        });*/
    }
    var signedIn = false;
    fetch('/checkvalidity').then(res => { 
        if(res) {
            signedIn = true;
        } else {
            signedIn = false;
        }
    });

    return (
        <div>
            <GoogleLogin
                clientId={client_id}
                buttonText="Sign In"
                onSuccess={onSuccess}
                onFailure={console.log("problem")}
                cookiePolicy={'single_host_origin'}
                isSignedIn={signedIn}
                scope={SCOPES}
                accessType="offline"
                approvalPrompt="force"
                prompt='consent'
            />
        </div>
    );
}

function SignIn() {
    return (
        <div id="sign-in">
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
    );
}

export default SignIn;