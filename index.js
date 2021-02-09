const express = require("express"); // we require the express package
const connection = require("./conf");
const app = express(); // we store it in a variable named app, all methods coming from express
const cors = require("cors"); // we require the Cors package
const port = 6000; // we set our backend port so our server will be at localhost:5000

// we need to tell our server to accept and be ok with strings coming as request and convert it to JSON objects
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// we use cors package, by default, it will allow all upcoming request to avoid any cors policy
app.use(cors());

// connection to the DB
connection.connect(function (err) {
  if (err) {
    console.error("error trying to connect to the DB. Error: " + err.stack);
    return;
  }
  console.log(
    "Successfully connected to the DB with the ID: " + connection.threadId
  );
});

// simulation of a DB
// const students = [
//   {
//     name: 'Marc',
//     age: 20
//   },
//   {
//     name: 'Dean',
//     age: 23
//   },
//   {
//     name: 'Ioan',
//     age: 21
//   },
//   {
//     name: 'Naomi',
//     age: 34
//   },
//   {
//     name: 'Teiko',
//     age: 3434
//   }
// ]

// on the localhost:5000, we are taking care of the response to send a string
app.get("/", (req, res) => {
  res.send("hello from the server!");
});

// on localhost:5000/students we will send, as a json, the whole students object
app.get("/students", (req, res) => {
  // Connect to the DB, do a query to get everybody and send it to the FE
  connection.query("SELECT * FROM students", (err, results) => {
    if (err) {
      res.status(500).send("Server error, could not fetch students");
    } else {
      res.json(results);
    }
  });
});

// we can use the same /students endpoint, to do handle all the POST requests
app.post("/students", (req, res) => {
  // just store what's coming from the body of the request in a variable to be easy reusable
  let student = {
    user: req.body.name,
    age: req.body.age,
  };
  //THE BODY IN POSTMAN SHOULD LOOK LIKE:
  // {
  //   "name": "Tommy",
  //   "age":"20"
  // }

  // connection to the DB, we will insert into students whatever is coming in the student object we've just created
  // the SET method will add in our table all the fields related to that object
  connection.query("INSERT INTO students SET ?", student, (err) => {
    if (err) {
      res.status(500).send("Error, your post request did not succeed");
    } else {
      res.sendStatus(200);
    }
  });
});

// makes our BE server listen to the port and throw any possible error
app.listen(port, (err) => {
  if (err) throw new Error("Something is not working, sorry :( ...");
  console.log(`Server is running amazingly on port ${port}`);
});
