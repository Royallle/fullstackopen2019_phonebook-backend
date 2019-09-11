require('dotenv').config()

const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const Person = require('./models/person')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!

const envPORT = process.env.PORT
app.listen(envPORT, () => {
  console.log(`Server running on port ${envPORT}`)
})

logger.token('body', function getId (req) {
  return JSON.stringify(req.body)
})

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())
app.use(logger(':method :url :status :response-time ms - :res[content-length] :body'))

app.get('/', (request, response) => {
    response.send('<h1>This is some nice Backend winkyface!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
})

app.get('/info', (request, response) => {
    var timestamp = new Date(); 

    Person.find({}).then(persons => { 
      response.send('<p>Phonebook has info for '+persons.length+ ' people.</p><p>'+timestamp.toUTCString()+'</p>');
    })

})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

const generateId = () => {
  min = Math.ceil(1);
  max = Math.floor(9999);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// handler of requests with result to errors
app.use(errorHandler)
