const express = require('express')
const swaggerUi = require('swagger-ui-express')
var path = require('path')
const expressSession = require('express-session')

// Using Json openAPI file
//const swaggerDocument = require('./docs/jokes-2.0.json');

// Using YAML openAPI file
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/jokes-api.yaml');

const app = express()
const PORT = 1904

app.use(expressSession({secret: "Benfica campeão 2021/2022 ?"}))

const jokesData = require('./jokes-data_mem')
//const jokesData = require('./jokes-db')
const jokesServices = require('./jokes-services')(jokesData)
const jokesApi = require('./web-api/jokes-api')(jokesServices)
const jokesSite = require('./web-site/jokes-web-site')(jokesServices)
const usersSite = require('./web-site/users-web-site')(app, jokesServices)
const authApi = require('./web-api/authorization')


app.use(express.json())
app.use(express.urlencoded())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')
require('hbs').registerPartials(__dirname + '/views/partials');


app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.use('/api', authApi)
app.use('/api', jokesApi)           
app.use('/site/jokes', jokesSite)           
app.use('/site/users', usersSite)           


app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))

