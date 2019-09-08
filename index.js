const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')


morgan.token('body', function getId (req) {
  return JSON.stringify(req.body)
})

app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'))


let persons = [
  {
    id:1,
    name: 'Arto Hellas',
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  }
]

app.get('/', (request, response) => {
    response.send('<h1>This is some nice Backend winkyface!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    var timestamp = new Date(); 
    response.send('<p>Phonebook has info for'+persons.length+' </p><p>'+timestamp.toUTCString()+'</p>');
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

const generateId = () => {
  min = Math.ceil(1);
  max = Math.floor(9999);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'A name and number are required!' 
    })
  }  

  if(persons.find(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'Name must be unique!' 
    })   
  }

  const person = {
    "name": body.name,
    "mumber": body.number,
    "id": generateId()
  }

  persons = persons.concat(person);

  response.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

