const express = require('express');
const path = require('path');

const app = express();
var formidable = require("formidable");

var cookieParser = require("cookie-parser");

app.use(cookieParser());

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');


const Queries = require('./queries.js');

const querier = new Queries();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'quillink/build')));


var studentData = [{
    "email":"anthonyvarkey@gmail.com"
}]



app.get('/api/login', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var username = fields.username;
        var password = fields.password;

        res.cookie("username", username);
        res.redirect('/');
    });
});



/*app.get("/contract.svg", function(req, res){
    res.sendFile(__dirname + "/quillink/images/contract.svg");
})*/

// Handles any requests that don't match the ones above


const {OAuth2Client} = require('google-auth-library');
//secret: 1W9hiCWmQkdq7dcJsKsP08Z3
const client = new OAuth2Client("938287165987-46mtptnb715mi1rop7l810o233ue470l.apps.googleusercontent.com", "1W9hiCWmQkdq7dcJsKsP08Z3");
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

app.get('/api/getDocument', (req, res) => {
    var link = "https://docs.google.com/document/d/12b5TnxrHY9_3dsd1poFsBjDafoKkzvgOb5RIcFqJc-g/";
    res.json(link);

    console.log('Sent link to document');
    const docs = google.docs({version: 'v1', auth: client});
    docs.documents.get({
        documentId: '12b5TnxrHY9_3dsd1poFsBjDafoKkzvgOb5RIcFqJc-g',
    }, (err, result) => {
        if (err) return console.log('The API returned an error: ' + err);
        console.log(`The title of the document is: ${result.data.title}`);
    });
});

app.get('/api/viewDocument', (req, res) => {
    const docs = google.docs({version: 'v1', auth: client});
    docs.documents.get({
        documentId: '13Vs6lMQV75y-lphx7AnKoFMOJ4qfb2Z4r36az74B8kw',
    }, (err, result) => {
        if (err) return console.log('The API returned an error: ' + err);
        console.log(`The title of the document is: ${result.data.title}`);
        console.log(result.data);
        res.json(result.data.body.content);
    });
});

function createSessionKey(){
  var key = "";
  for (var i = 0; i < 10; i++){
    key += Math.floor(Math.random() * 10) + "";
  }
  return key;
}

app.get("/api/checkvalidity", (req, res, next) => {
    console.log("IN API/CHECKVALIDITY")

    if (!req.cookies.hasOwnProperty('email')) {
        console.log("REDIRECTING");
        //res.redirect('/');
        res.json(false);
        console.log("FINISHED");
        res.end();
    }
});

app.get("/tokensignin/:token/:a_token", function(req, res, next){
    console.log("hi")
    console.log("gtoken:" + req.params.token);
    //res.clearCookie("email", {path:'/'});
    //res.clearCookie("sessionKey", {path:'/'});
    console.log(req.cookies.email);
    /*if (req.cookies.email){
        res.json(true);
        console.log("FINISHED");
        res.end();
        return;
    }*/
    var gtoken = req.params.token;
    var access_token = req.params.a_token;
    console.log("access token: " + access_token);
    

    //handle forms in these thingies
    async function verify() {
        console.log("accessed");
        res.clearCookie("email");
        res.clearCookie("sessionKey");
        console.log("---------here----------");
        const ticket = await client.verifyIdToken({
            idToken: gtoken,
            audience: "938287165987-46mtptnb715mi1rop7l810o233ue470l.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        
        client.setCredentials({
            access_token: access_token
        });
        const docs = google.docs({version: 'v1', auth: client});
        docs.documents.get({
            documentId: '12b5TnxrHY9_3dsd1poFsBjDafoKkzvgOb5RIcFqJc-g',
        }, (err, result) => {
            if (err) return console.log('The API returned an error: ' + err);
            console.log(`The title of the document is: ${result.data.title}`);
        });
    
        console.log("---------here1----------");
        const payload = ticket.getPayload();
        var givenEmail = payload.email;
        var givenName = payload.name;
        console.log("Given Email: " + givenEmail);
        console.log("Given Name: " + givenName);
        console.log("---------here2----------");
        // CHANGE THIS WHEN READY
        var valid = true;
        for (student of studentData) {
            if (student.email == givenEmail) {
                valid = true;
                break;
            }
        }
        console.log("---------here3----------");
        if (valid) {
            var sessionkey = createSessionKey();
            var editedData = studentData;
            for (student of editedData){
                if (student.email == givenEmail) {
                    student.sessionkey = sessionkey;
                }
            }
            console.log("---------here4----------");
            //fs.writeFileSync('./data/student_data.json', JSON.stringify(editedData));
            console.log("HA");
            /*querier.signup(givenEmail, 'g', givenName, (result) => {
                if(result) {
                    res.cookie("email", givenEmail);
                    res.cookie("key", sessionkey);
                    console.log("IT WORKS GUYS");
                    res.send(true);
                } else {
                    console.log("RIP");
                    //res.send("fail");
                }
            }); */
            console.log("Given Email: " + givenEmail);
            console.log("Given Name: " + givenName);
            await querier.async_google_signin(givenEmail, (result) => {
                if(result) {
                    res.cookie("email", givenEmail);
                    res.cookie("name", givenName);
                    res.cookie("key", sessionkey);

                    res.json(true);
                } else {
                    res.cookie("email", givenEmail);
                    res.cookie("name", givenName);
                    res.cookie("key", sessionkey);
                    res.json(false);
                }
            });
            /*await querier.async_signup(givenEmail, 'g', givenName, (result) => {
                console.log("result: " + result);
                if(result) {
                    res.cookie("email", givenEmail);
                    res.cookie("key", sessionkey);
                    console.log("IT WORKS GUYS");
                    //res.redirect(authUrl);
                    res.send(true);
                } else {
                    console.log("RIP");
                    //res.send(true);
                    res.send(false);
                }
                console.log("---------here5----------");
                //res.cookie("email", givenEmail);
                console.log("---------here5.1----------");
                //res.cookie("key", sessionkey);
                console.log("---------here5.2----------");
                console.log("---------here6----------");
            })
            .catch(e => {console.log("PROBLEM!!!!!!!!!")});*/
            //res.redirect("/projects");
            
        }
        else {
            /*querier.signup(givenEmail, 'g', givenName, (result) => {
                if(result) {
                    res.cookie("email", givenEmail);
                    res.cookie("key", sessionkey);
                    console.log("IT WORKS GUYS");
                    //res.send(true);
                } else {
                    console.log("FFFFF");
                    console.log("---------here200----------");
                }
            }); */
            //res.redirect("/projects");
        }

        // If request specified a G Suite domain:
        // const domain = payload['hd'];
    }
    console.log("---------here7----------");
    verify().catch(console.error);
    console.log("---------here8----------");
    /*if (req.cookies.email){
        console.log("EMAIL FOUND");
        //res.send("success")
        //res.end();
    }
    else {
        
    }*/
});

app.get('/api/signup/:username/:password', (req, res) => {
    var username = req.params.username;
    var password = req.params.password;
    const email = req.cookies['email'];
    const name = req.cookies['name'];
    async function signing_up() {
        await querier.async_signup(username, password, email, name, (result) => {
            console.log("result: " + result);
            if(result) {
                console.log("IT WORKS GUYS");
                //res.redirect(authUrl);
                res.json(true);
            } else {
                console.log("RIP");
                //res.send(true);
                res.json(false);
            }
            console.log("---------here5----------");
            //res.cookie("email", givenEmail);
            console.log("---------here5.1----------");
            //res.cookie("key", sessionkey);
            console.log("---------here5.2----------");
            console.log("---------here6----------");
        })
        .catch(e => {console.log(e)});
    }

    signing_up();
    
});

app.get("/create-project", (req, res, next) => {
    //querier.create
});

/*function loggedIn(req){
    //CHANGE WHEN READY
    var passed = false;
    console.log("MAIL: " + req.cookies.email);
    for (student of studentData){
      if (student.email == req.cookies.email){ //&& student.sessionkey == req.cookies.key){
        passed = true;
      }
    }
  
    return passed;
}*/

/*function checkValidity(req, res){
    /*if (loggedIn(req)) {
        console.log(req.url);
        if (req.url == "/tokenDone"){
            res.send("clear");
        }
        else{
            next();
        }
      
    }
    else {
        console.log("REDIRECTING");
        res.redirect("/");
    }
    if (req.cookies.email){
        console.log("EMAIL: " + req.cookies.email);
        return;
    } else {
        res.redirect("/");
    }
}

app.use('*', (req, res) => {
    console.log("USING THIS");
    if (req.cookies.hasOwnProperty('email')){
        console.log("EMAIL: " + req.cookies.email);
        return;
    } else {
        console.log("redirect");
        res.redirect("/");
    }
});

function loggedIn(req) {
    // CHANGE WHEN READY
    console.log("MAIL: " + req.cookies.email);
    for (student of studentData){
      if (student.email == req.cookies.email){ //&& student.sessionkey == req.cookies.key){
        return true;
      }
    }
  
    return false;
}*/

/*function checkValidity(req, res, next){
    console.log("checking validity");
    if (loggedIn(req)) {
        console.log(req.url);
        if (req.url == "/tokenDone"){
            res.send("clear");
        }
        else{
            next();
        }
      
    }
    else {
        console.log("REDIRECTING");
        res.redirect("/");
    }
}*/

//app.use(checkValidity);

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/quillink/build/index.html'));
});

const port = process.env.PORT || 3010;
app.listen(port);

console.log('App is listening on port ' + port);