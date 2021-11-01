const express = require('express');
const path = require('path');

const app = express();
var formidable = require("formidable");

var cookieParser = require("cookie-parser");

app.use(cookieParser());

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

app.use(express.json())

const Queries = require('./queries.js');

const querier = new Queries();
let requested_reviewers = [];

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
const { APIS } = require('googleapis/build/src/apis');
const { docs } = require('googleapis/build/src/apis/docs');
const { default: CreateProjectButton } = require('./quillink/src/components/CreateProject.js');
//secret: 1W9hiCWmQkdq7dcJsKsP08Z3
const client = new OAuth2Client("938287165987-46mtptnb715mi1rop7l810o233ue470l.apps.googleusercontent.com", "1W9hiCWmQkdq7dcJsKsP08Z3");
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

app.get('/api/getDocument/:link', (req, res) => {
    var link = "https://docs.google.com/document/d/" + req.params.link + '/';
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

app.post('/api/viewDocument', (req, res) => {
    const id = req.body.docId;
    querier.getProjectInfo(id, (info) => {
        link = info.edit_link;
        console.log(info.description);
        const docs = google.docs({version: 'v1', auth: client});
        docs.documents.get({
            documentId: link,
        }, (err, result) => {
            if (err) return console.log('The API returned an error: ' + err);
            res.json({
                content: result.data.body.content,
                info: info
            });
        });
        console.log("DRIVE");
        const drive = google.drive({version: 'v3', auth: client});
        drive.permissions.list({
            fileId: link
        }, (err, result) => {
            if (err) return console.log('The API returned an error: ' + err);
            console.log(result);
        });
    })         
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
    } else {
        res.json(true);
    }
});

app.post("/api/createProject", (req, res) => {
    //console.log(req.body);
    const email = req.cookies.email;
    const title = req.body.title;
    const description = req.body.description;
    const tagJSON = {
        tags: req.body.tags,
        reviewers: [],
        requested_reviewers: []
    }
    const tags = JSON.stringify(tagJSON);
    console.log(tags);
    const docs = google.docs({version: 'v1', auth: client});
    var doc = {};
    // const new_link = ;
    if(req.body.link == "" || req.body.link == null) {
        docs.documents.create({"title": title}, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result.data)
            const docId = result.data.documentId;
            docs.documents.get({
                documentId: docId,
            }, (err, result) => {
                if (err) {
                    res.json(69);
                } else {
                    querier.getUserId(email, (pk) => {
                        querier.createProject(pk, title, description, docId, tags);
                        const drive = google.drive({version: 'v3', auth: client});
                        drive.permissions.create({
                            fileId: docId,
                            requestBody: {
                              role: 'reader',
                              type: 'anyone',
                            }
                        });
                        res.json(1);
                        console.log("CREATED PROJECT :)");
                    });
                }
            });
        });
        /*console.log(doc);
        console.log(JSON.stringify(doc));
        console.log(doc.documentId);*/
    } else {
        const docId = req.body.link.match(/[-\w]{25,}/)
        console.log(docId);
        console.log("DOC ID: LINK - " + docId);
        docs.documents.get({
            documentId: docId,
        }, (err, result) => {
            if (err) {
                res.json(69);
            } else {
                querier.getUserId(email, (pk) => {
                    querier.createProject(pk, title, description, docId, tags);
                    res.json(1);
                    console.log("CREATED PROJECT :)");
                });
            }
        });
    }
    //querier.createProject(req.cookies.email, req.body.title, req.body.description, req.body.link, )

    //var data = res.json(req.body);
    //console.log(data.description)
});

app.get("/api/getProjects", (req, res) => {
    const email = req.cookies.email;
    querier.getUserId(email, (pk) => {
        querier.getUserProjects(pk, (rows) => {
            res.json(rows);
        });
    });
   
});

app.get("/tokensignin/:token/:a_token", function(req, res, next){
    console.log("hi")
    console.log("gtoken:" + req.params.token);
    res.clearCookie("email", {path:'/'});
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
            await querier.async_google_signin(givenEmail, (result, username, pk) => {
                if(result) {
                    res.cookie("email", givenEmail);
                    res.cookie("username", username);
                    res.cookie("name", givenName);
                    res.cookie("key", sessionkey);
                    res.cookie("id", pk);
                    
                    querier.getUserId(givenEmail, (pk) => {
                        querier.checkRequests(pk, (rows) => {
                            requested_reviewers = rows;
                            console.log(rows);
                        });
                    });
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

app.post('/api/signup/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.cookies['email'];
    const name = req.cookies['name'];
    async function signing_up() {
        await querier.async_signup(username, password, email, name, (result) => {
            console.log("result: " + result);
            if(result) {
                res.cookie("username", username);
                res.json(true);
            } else {
                res.json(false);
            }
        })
        .catch(e => {console.log(e)});
    }

    signing_up();
    
});

app.get("/create-project", (req, res, next) => {
    //querier.create
});

app.get("/api/explore", function(req, res, next){
    console.log("called upon!");
    querier.randomRecommend(function(rows){
        var indices = [];
        var failures = 0;
        while(indices.length < 10){
            if (failures == 10){
                break;
            }
            var index = Math.floor(Math.random() * rows.length);
            if (indices.indexOf(index) == -1){
                indices.push(index);
                failures = 0;
            }
            else{
                failures++;
            }
        }

        var data = [];
        for (index of indices){
            data.push(rows[index]);
        }

        function callback(){
            console.log("Moving on");
            res.json(data);
        }
        
        try {
            var counter = 0;
            data.forEach(function(item, index){
                querier.getUsername(item.owner, (username) => {
                    console.log("index is: " + index);
                    
                    data[index].owner = username;
                    console.log(data[index]);
                    console.log("username is: " + username);
                    counter++;
                    if (counter == data.length){
                        callback();
                    }
                });
            }); 
        } catch {
            console.log("not rn");
        }
        


        /*async function sendData() {
            console.log(data);
            console.log(data.length);
            for (var i = 0; i < data.length; i++){
                console.log("before: " + i);
                await querier.getUsername(data[i].owner, (username) => {
                    console.log("in get username: " + i);
                    data[i].owner = username;
                });
                console.log("after: " + i);
            }
            res.json(data);
            console.log(data);
        }
        sendData().catch(console.error);*/
        //res.json(data);
    });
});

app.get("/api/userStats", function(req, res){
    var pk = req.cookies.id;
    querier.getUserProjects(pk, function(rows){
        var numUserProjects = rows.length;
        querier.getUserReviews(pk, function(newRows){
            var numUserReviews = newRows.length;
            res.json({projectsCreated: numUserProjects, projectsReviewed: numUserReviews});
        });
    });
});

app.get("/api/checkRequests", function(req, res, next){
    var pk = req.cookies.id;
    console.log("Checking for requests");
    if (!req.cookies.hasOwnProperty('email')) {
        return;
    }

    querier.checkRequests(pk, (rows) => {
        function callback() {
            console.log("trying to send back rows");
            res.json(rows);
        }
        var counter = 0;
        try {
            callback();
        } catch {
            console.log("can't iterate rows");
        }
        
    });
});

app.post("/api/requestEdit", function(req, res, next) {
    console.log("edit requested");
    var username = req.cookies.username;
    var projectpk = req.body.projectpk;
    querier.requestReview(projectpk, username);
});

app.post("/api/acceptRequest", function(req, res, next) {
    console.log("accepting requested");
    var username = req.body.username;
    var projectpk = req.body.projectpk;
    querier.addReviewer(projectpk, username, () => {
        console.log("sending back");
        res.json(true);
        /*const drive = google.drive({version: 'v3', auth});
        drive.files.permissions.get()*/
    });
});

app.post("/api/declineRequest", function(req, res, next) {
    console.log("declining requested");
    var username = req.body.username;
    var projectpk = req.body.projectpk;
    querier.removeRequest(projectpk, username, () => {
        console.log("sending back");
        res.json(true);
    });
});

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/quillink/build/index.html'));
});

const port = process.env.PORT || 3010;
app.listen(port);

console.log('App is listening on port ' + port);