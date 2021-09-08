const express = require('express');
const path = require('path');

const app = express();
var formidable = require("formidable");

var cookieParser = require("cookie-parser");

app.use(cookieParser());

const Queries = require('./queries.js');

const querier = new Queries();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'quillink/build')));


var studentData = [{
    "email":"anthonyvarkey@gmail.com"
}]



app.get('/api/getDocument', (req, res) => {
    var link = "https://docs.google.com/document/d/12b5TnxrHY9_3dsd1poFsBjDafoKkzvgOb5RIcFqJc-g/edit?usp=sharing";
    res.json(link);
    console.log('Sent link to document');
});

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
const client = new OAuth2Client("938287165987-46mtptnb715mi1rop7l810o233ue470l.apps.googleusercontent.com");


function createSessionKey(){
  var key = "";
  for (var i = 0; i < 10; i++){
    key += Math.floor(Math.random() * 10) + "";
  }
  return key;
}

app.get("/tokensignin/:token", function(req, res, next){
    //res.clearCookie("email", {path:'/'});
    //res.clearCookie("sessionKey", {path:'/'});
    console.log(req.cookies.email);
    if (req.cookies.email){
        res.send(true);
        console.log("FINISHED");
        res.end();
        return;
    }
    var gtoken = req.params.token;

    //handle forms in these thingies
    async function verify() {
        res.clearCookie("email");
        res.clearCookie("sessionKey");
        console.log("---------here----------");
        const ticket = await client.verifyIdToken({
            idToken: gtoken,
            audience: "938287165987-46mtptnb715mi1rop7l810o233ue470l.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
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
            await querier.async_signup(givenEmail, 'g', givenName, (result) => {
                console.log("result: " + result);
                if(result) {
                    res.cookie("email", givenEmail);
                    res.cookie("key", sessionkey);
                    console.log("IT WORKS GUYS");
                    
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
            .catch(e => {console.log("PROBLEM!!!!!!!!!")});
            //res.redirect("/projects");
            
        }
        else {
            querier.signup(givenEmail, 'g', givenName, (result) => {
                if(result) {
                    res.cookie("email", givenEmail);
                    res.cookie("key", sessionkey);
                    console.log("IT WORKS GUYS");
                    //res.send(true);
                } else {
                    console.log("FFFFF");
                    console.log("---------here200----------");
                }
            }); 
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
}

function checkValidity(req, res, next){
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

app.get('*', (req, res, next) =>{
    res.sendFile(path.join(__dirname + '/quillink/build/index.html'));
});

const port = process.env.PORT || 3010;
app.listen(port);

console.log('App is listening on port ' + port);