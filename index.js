const express = require('express'); // we require the express package

const app = express(); // we store it in a variable named app, all methods coming from express
const cors = require('cors'); // we require the Cors package
const port = 5000; // we set our backend port so our server will be at localhost:5000

// we need to tell our server to accept and be ok with strings coming as request and convert it to JSON objects
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// we use cors package, by default, it will allow all upcoming request to avoid any cors policy
app.use(cors());



// simulation of a DB
const students = [
  {
    name: 'Marc',
    age: 20
  },
  {
    name: 'Dean',
    age: 23
  },
  {
    name: 'Ioan',
    age: 21
  },
  {
    name: 'Naomi',
    age: 34
  },
  {
    name: 'Teiko',
    age: 3434
  }
]



// on the localhost:5000, we are taking care of the response to send a string
app.get('/', (req, res) => {
  res.send('hello from the server!')
})

// on localhost:5000/students we will send, as a json, the whole students object
app.get('/students', (req,res) => {
  res.json(students)
})

// we can use the same /students endpoint, to do handle all the POST requests
app.post('/students', (req, res) => {
  // just store what's coming from the body of the request in a variable to be easy reusable
  let student = {
    name: req.body.name,
    age: req.body.age
  }
  // simulate adding it to a database
  students.push(student)
  // sends a 200 code status to the FE
  res.sendStatus(200)
})




// makes our BE server listen to the port and throw any possible error
app.listen(port, err => {
  if(err) throw new Error('Something is not working, sorry :( ...')
  console.log(`Server is running amazingly on port ${port}`)
})
