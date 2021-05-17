//Engine of server
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const firebase = require("./firebase/firebase");
const security = require("./security/jwt");
const auth = firebase.auth();
const courseRepository = require("./repositories/coursRepository");
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
    );//firebase query for username/password

    if (user) {
      if (user.user) {
        //User exists and pasword is correrct
        const token = security.sign(user.user.uid);
        res.send(token);
      } else {
        res.send(400);
      }
    } else {
      //client error
      res.send(400);
    }
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
      .then((resp) => {
        res.send(resp);
      })
      .catch((err) => {
        res.send(err);
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
app.post("/PartnerRequest",/*authLogic,*/ async (req, res) => {
  const response = await courseRepository.CreatePartnerRequest(req, null)
  if (response){
    res.send(response);
  }
  else{
    res.send(404);
  }
});

app.post("/CourseRequest",/*authLogic,*/ async (req, res) => {
  const response = await courseRepository.CreateCourseRequest(req, null)
  if (response){
    res.send(response);
  }
  else{
    res.send(404);
  }
});

app.post("/GroupRequest",/*authLogic,*/ async (req, res) => {
  const response = await courseRepository.CreateGroupRequest(req, null)
  if (response){
    res.send(response);
  }
  else{
    res.send(404);
  }
});

app.listen(3001, () => {
  console.log(`Server is running on port ${3001}.`);
});
