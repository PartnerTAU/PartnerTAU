//Engine of server
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const firebase = require("./firebase/firebase");
const security = require("./security/jwt");
const auth = firebase.auth();
const courseRepository = require("./repositories/coursRepository");
const userRepository = require("./repositories/userRepository");
const chatRepository = require("./repositories/chatRepository");
const matchRepository = require("./repositories/matchRepository");
const whatsappRepository = require("./repositories/whatsappRepository");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

function authLogic(req, res, next) {
  try {
    security
      .decode(req.header("authorization").split(" ")[1])
      //Decode token, if succes we continue, else, retun 401
      .then((decoded) => {
        req.decodedToken = decoded;
      })
      .then((answer) => {
        next();
      })
      .catch((err) => {
        res.sendStatus(401);
      });
  } catch (e) {
    res.sendStatus(401);
  }
}

//option 2 for async/await handling, add async to function and we using await
app.post("/Home", async (req, res) => {
  if (req.body && req.body.username && req.body.password) {
    const user = await auth.signInWithEmailAndPassword(
      req.body.username,
      req.body.password
    )

    .then( user => {
      // if(user){
        if (user.user && user.user.emailVerified) {
        //User exists and pasword is correrct
          const token = security.sign(user.user.uid);
          // res.send({Token: token, Name: user.user.displayName});
          res.send({Token: token, Name: user.user.displayName});
          // res.send(token);
        } 
        else if (user.user  && !user.user.emailVerified){
          res.send(user.user.emailVerified);
        }
        else {
        // res.send(user.user.emailVerified);
         res.send(400);
        }
      // }
    }
    )
    .catch( error => {
      switch(error.code){
        case 'auth/wrong-password':
          res.send("WrongPass");
          break;
        case 'auth/user-not-found':
          res.send("NoUser");
          break;
        default:
          console.log(error.message);
          break;
      }
    });
  }
});

//option 2 for async/await handling, add async to function and we using await
app.post("/Password", async (req, res) => {
  if (req.body && req.body.mail) {
    auth
      .sendPasswordResetEmail(req.body.mail)
      .then( function() {
        res.send(req.body.mail)
      }
      )
      .catch( function(error){
        res.send(false);
      }
      );
  }
});





//authLogic is middlware, we use authlogic for funtions that only auth users can use
app.post("/maekAsResolved", authLogic, async (req, res) => {
  
    const reps = await courseRepository.MarkRequestAsResolved(req.body.id, req.decodedToken)

    if(reps)
    {
      res.send(reps);
    }
    else
    {
      res.send(400);
    }
    
  
});

app.post("/Signup", (req, res) => {
  //option 1 for async/await handling
  if (req.body && req.body.username && req.body.password) {
    auth
      .createUserWithEmailAndPassword(req.body.username, req.body.password)
      .then(user => {
        
        userRepository.CreateUserDetails(req.body.username,auth.currentUser.uid)
        auth.currentUser.sendEmailVerification(null)
        .then(function(){
          auth.currentUser.updateProfile({displayName: req.body.privatename})
          .then(function() {
           
            res.send("EmailSend");
          })
          .catch(function(error) {
          });
        })

      })
      .catch( error => {
          switch(error.code){
            case 'auth/email-already-in-use':
              res.send("InUse");
              break;
            default:
              console.log(error.message);
              break;
          }
        });
  } else {
    res.send(400);
  }
});


//authLogic is middlware, we use authlogic for funtions that only auth users can use
app.get("/getCourses", authLogic, async (req, res) => {
  var x = await courseRepository.GetCourseList(req.decodedToken);
  if (x) {
    res.send(x);
  } else {
    res.send(500);
  }
});

//authLogic is middlware, we use authlogic for funtions that only auth users can use
app.post("/CreateRequest", authLogic, async (req, res) => {
  var x = await courseRepository.CreateRequest(req.body, req.decodedToken);
  if (x) {
    res.send(x);
  } else {
    res.send(400);
  }
});

//authLogic is middlware, we use authlogic for funtions that only auth users can use
app.get("/GetActiveRequestedByUserId",authLogic, async (req, res) => {
  var x = await courseRepository.GetActiveRequestedByUserId(req.decodedToken.data);
  if (x) {
    res.send(x);
  } else {
    res.send(400);
  }
});

//option 2 for async/await handling, add async to function and we using await
app.post("/PartnerRequest", authLogic, async (req, res) => {
  const response = await courseRepository.CreatePartnerRequest(req, req.decodedToken)
  if (response){
    res.send(response);
  }
  else{
    res.send(404);
  }
});

app.post("/CourseRequest", authLogic, async (req, res) => {
  const response = await courseRepository.CreateCourseRequest(req, req.decodedToken)
  if (response){
    res.send(response);
  }
  else{
    res.send(404);
  }
});






app.get("/GetCourseAutoComplete", async (req, res) => {
  const response = await courseRepository.GetCourseListAutoComnplete(req.query.text)
  if (response){
    res.send(response);
  }
  else{
    res.send(404);
  }
});






app.get("/getAllRequests", authLogic, async (req, res) => {
  var x = await courseRepository.GetAllRequests(req.decodedToken);
  if (x) {
    res.send(x);
  } else {
    res.send(500);
  }
});

app.post("/GetCourseGroupByNameAndSemester", async (req, res) => {
  const response = await courseRepository.GetCourseGroupBySemeserAndGroup(req.body)
  if (response){
    res.send(response);
  }
  else{
    res.send(404);
  }
});

//////////////////////////////////////////////Group Requests section////////////////////////////////////////////////////

app.post("/GroupRequest", authLogic, async (req, res) => {
  const response = await courseRepository.CreateGroupRequest(req, req.decodedToken)
  if (response){
    res.send(response);
  }
  else{
    res.send(404);
  }
});



app.post("/InsertChatOnMatchGroup", authLogic, async (req, res) => {
  var x = await chatRepository.InsertMatchChatGroup(req.body,req.decodedToken);
  if (x) {
    res.send(x);
  } else {
    res.send(500);
  }
});

app.get("/GetMatchChatGroup", authLogic, async (req, res) => {
  var x = await chatRepository.GetMatchChatGroup(req.query.id,req.decodedToken);
  if (x) {
    res.send(x);
  } else {
    res.send(500);
  }
});

app.post("/RemoveGroupRequest", authLogic, async (req, res) => {
  var x = await courseRepository.RemoveRequestGroup(req.body);
  if (x) {
    res.send(x);
  } else {
    res.send(500);
  }
});

app.post("/CheckForNewMatchGroup", authLogic, async (req, res) => {
  var x = await matchRepository.CheckForNewMatchGroup(req.body,req.decodedToken);
  if (x) {
    res.send(x);
  } else {
    res.send(500);
  }
});



//////////////////////////////////////////////Group Requests section////////////////////////////////////////////////////



//////////////////////////////////////////////Partner Requests section////////////////////////////////////////////////////

app.post("/PartnerRequest", authLogic, async (req, res) => {
  const response = await courseRepository.CreatePartnerRequest(req, req.decodedToken)
  if (response){
    res.send(response);
  }
  else{
    res.send(404);
  }
});



app.post("/InsertChatOnMatchPartner", authLogic, async (req, res) => {
  var x = await chatRepository.InsertMatchChatPartner(req.body,req.decodedToken);
  if (x) {
    res.send(x);
  } else {
    res.send(500);
  }
});

app.get("/GetMatchChatPartner", authLogic, async (req, res) => {
  var x = await chatRepository.GetMatchChatPartner(req.query.id,req.decodedToken);
  if (x) {
    res.send(x);
  } else {
    res.send(500);
  }
});

app.post("/RemovePartnerRequest", authLogic, async (req, res) => {
  var x = await courseRepository.RemoveRequestPartner(req.body);
  if (x) {
    res.send(x);
  } else {
    res.send(500);
  }
});

app.post("/CheckForNewMatchPartner", authLogic, async (req, res) => {
  var x = await matchRepository.CheckForNewMatchPartner(req.body,req.decodedToken);
  if (x) {
    res.send(x);
  } else {
    res.send(500);
  }
});

//////////////////////////////////////////////Partner Requests section////////////////////////////////////////////////////

app.post("/RemoveCourseRequest", authLogic, async (req, res) => {
  var x = await courseRepository.RemoveRequestCourse(req.body);
  if (x) {
    res.send(x);
  } else {
    res.send(500);
  }
});

app.get("/GetMatchChatCourse", authLogic, async (req, res) => {
  var x = await chatRepository.GetMatchChatCourse(req.query.id,req.decodedToken);
  if (x) {
    res.send(x);
  } else {
    res.send(500);
  }
});

app.post("/InsertChatOnMatchCourse", authLogic, async (req, res) => {
  var x = await chatRepository.InsertMatchChatCourse(req.body,req.decodedToken);
  if (x) {
    res.send(x);
  } else {
    res.send(500);
  }
});


app.post("/CheckForNewMatchCourse", authLogic, async (req, res) => {
  var x = await matchRepository.CheckForNewMatchCourse(req.body,req.decodedToken);
  if (x) {
    res.send(x);
  } else {
    res.send(500);
  }
});

app.get("/GetWhatsappLinkByCourseAndSemester", async (req, res) => {
  var x = await whatsappRepository.GetWhatsappLinkByCourseAndSemester(req.query.coursenumber, req.query.semester);
  if (x) {
    res.send(x);
  } else {
    res.send(500);
  }
});

app.post("/SetWhatsappLinkByCourseAndSemester", authLogic, async (req, res) => {
  var x = await whatsappRepository.SetWhatsappLinkByCourseAndSemester(req.body);
  if (x) {
    res.send(x);
  } else {
    res.send(500);
  }
});

app.post("/UpdateWhatsappLinkByCourseAndSemester", authLogic, async (req, res) => {
  var x = await whatsappRepository.UpdateWhatsappLinkByCourseAndSemester(req.body);
  if (x) {
    res.send(x);
  } else {
    res.send(500);
  }
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});


