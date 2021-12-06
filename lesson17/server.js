const express = require('express')
const swaggerUi = require('swagger-ui-express');

// Json api specification
//const swaggerDocument = require('./docs/jokes-api.json');

// YAML api specification 
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/jokes-api.yaml');


const app = express()
const PORT = 1904

const jokesData = require('./jokes-db_mem')()
const jokesServices = require('./jokes-services')(jokesData)
const jokesApi = require('./jokes-api')(jokesServices)

app.use('/api-docs', swaggerUi.serve)
app.get('/api-docs', swaggerUi.setup(swaggerDocument))
app.use(express.json())


// Configure CRUD routes to manage jokes 
app.get('/api/jokes', jokesApi.getJokes)           // Get all jokes
app.get('/api/jokes/:id', jokesApi.getJoke)        // Get a joke details
app.delete('/api/jokes/:id', jokesApi.deleteJoke)  // Delete a joke
app.put('/api/jokes/:id', jokesApi.updateJoke)     // Update a joke
app.post('/api/jokes', jokesApi.createJoke)        // Delete a joke

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
