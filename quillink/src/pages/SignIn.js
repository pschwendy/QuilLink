import {Card, Button} from "react-bootstrap";
import "./css/SignIn.css";
import { GoogleLogin } from 'react-google-login';
import { useEffect, Component } from "react";

/*
function onSignIn(googleUser) {
    console.log("HI")
    var token = googleUser.getAuthResponse().id_token;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/tokensignin/' + token);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      console.log(xhr.response);
      if (xhr.response === "success"){
        window.location.reload();
      }
    };
    xhr.send();
}
*/
/*componentDidMount() {
    gapi.signin2.render('g-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'width': 200,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this. onSignIn
    });  
  }*/
  const GOOGLE_BUTTON_ID = "google-sign-in-button";

  class GoogleSignIn extends Component {
    componentDidMount() {
        const element = document.getElementById('grandScript');
        const otroElement = document.getElementById("grandMeta");
        if (element && otroElement){
            console.log(element);
            console.log(otroElement);
            try{
                window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
                    width: {},
                    height: 35,
                    onsuccess: this.onSuccess
                });
            }
            catch(e){
                window.location.reload();
            }
            
        }
        else{
            this.observer = new MutationObserver(() => {
                const divElement = document.getElementById('grandScript');
                const otroElement = document.getElementById('grandMeta')
                if (divElement && otroElement) {
                   this.removeObserver();
                   try{
                        window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
                            width: {},
                            height: 35,
                            onsuccess: this.onSuccess
                        });
                   }
                   catch(e){
                        window.location.reload();
                   }
                   
                }
            });
            this.observer.observe(document, {subtree: true, childList: true});
        }
      
    }
  
    onSuccess(googleUser) {
      const profile = googleUser.getBasicProfile();
      console.log("Name: " + profile.getName());
      console.log("HIIIIIIII");
    }
  
    render() {
      return <div id={GOOGLE_BUTTON_ID} className="gsignin" />;
    }
  }



function SignIn() {
    /*var onSignIn = googleData => {
        console.log("HI");
        var token = googleData.id_token;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/tokensignin/' + token);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
          console.log(xhr.response);
          if (xhr.response === "success"){
            window.location.reload();
          }
        };
        xhr.send();
    }
    /*const responseGoogle = (response) => {
        console.log(response);
    }

    useEffect(() => {
        window.gapi.signin2.render('g-signin2', {
          'scope': 'https://www.googleapis.com/auth/plus.login',
          'width': 200,
          'height': 50,
          'longtitle': true,
          'theme': 'dark',
          'onsuccess': onSignIn()
        });  
    }, []);*/
    
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
                            {/*<GoogleLogin
                                clientId="938287165987-46mtptnb715mi1rop7l810o233ue470l.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={onSignIn}
                                onFailure={console.log('hi')}
                                cookiePolicy={'single_host_origin'}
                            />*/}
                            <GoogleSignIn/>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default SignIn;