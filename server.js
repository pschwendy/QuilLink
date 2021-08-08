const express = require('express');
const path = require('path');

const app = express();
var formidable = require("formidable");

var cookieParser = require("cookie-parser");

app.use(cookieParser());


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'quillink/build')));
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


function loggedIn(req){
    //CHANGE WHEN READY
    var passed = true;
    for (student of studentData){
      if (student.email == req.cookies.email && student.sessionkey == req.cookies.key){
        passed = true;
      }
    }
  
    return passed;
  }
/*app.get("/contract.svg", function(req, res){
    res.sendFile(__dirname + "/quillink/images/contract.svg");
})*/

// Handles any requests that don't match the ones above
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname + '/quillink/build/index.html'));
});

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("938287165987-46mtptnb715mi1rop7l810o233ue470l.apps.googleusercontent.com");


function createSessionKey(){
  var key = "";
  for (var i = 0; i < 10; i++){
    key += Math.floor(Math.random() * 10) + "";
  }
  return key;
}

app.get("/tokensignin/:token", function(req, res){
  var gtoken = req.params.token;

  //handle forms in these thingies
  async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: gtoken,
        audience: "938287165987-46mtptnb715mi1rop7l810o233ue470l.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    var givenEmail = payload.email;
    //CHANGE THIS WHEN READY
    var valid = true;
    for (student of studentData){
      if (student.email == givenEmail){
        valid = true;
        break;
      }
    }
    if (valid){
      var sessionkey = createSessionKey();
      var editedData = studentData;
      for (student of editedData){
        if (student.email == givenEmail){
          student.sessionkey = sessionkey;
        }
      }
      //fs.writeFileSync('./data/student_data.json', JSON.stringify(editedData));
      res.cookie("email", givenEmail);
      res.cookie("key", sessionkey);
      res.send("success");
    }
    else{
      res.send("fail");
    }

    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }
  verify().catch(console.error);
});


function checkValidity(req, res, next){
  if (loggedIn(req)){
    next();
  }
  else{
    res.redirect("/");
  }
}

app.use("/", checkValidity, express.static("public"));



const port = process.env.PORT || 3010;
app.listen(port);

console.log('App is listening on port ' + port);