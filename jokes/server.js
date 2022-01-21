const express = require('express')
const swaggerUi = require('swagger-ui-express')
var path = require('path')
const expressSession = require('express-session')

// Using Json openAPI file
//const swaggerDocument = require('./docs/jokes-2.0.json');

// Using YAML openAPI file
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.join(__dirname,'./docs/jokes-api.yaml'));

const app = express()
const PORT = process.env.PORT || 1904
const HOST = process.env.HOST
const ELASTIC_URL = process.env.BONSAI_URL || 'http://localhost:9200'


app.use(expressSession({secret: "Benfica campeão 2021/2022 ?"}))


//const jokesData = process.env.HEROKU ? require('./jokes-data_mem') : require('./jokes-db')(ELASTIC_URL)
const jokesData = require('./jokes-data_mem')
//const jokesData = require('./jokes-db')
const jokesServices = require('./jokes-services')(jokesData)
const jokesApi = require('./web-api/jokes-api')(jokesServices)
const jokesSite = require('./web-site/jokes-web-site')(jokesServices)
const usersSite = require('./web-site/users-web-site')(app, jokesServices)
const authApi = require('./web-api/authorization')


app.use(express.json())
app.use(express.urlencoded())
app.use('/public', express.static(path.join(__dirname, 'public')))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')
require('hbs').registerPartials(__dirname + '/views/partials');


app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.use('/api', authApi)
app.use('/api/jokes', jokesApi)           
app.use('/', jokesSite)           
app.use('/users', usersSite)           


app.listen(PORT, () => console.log(`Jokes app listening at http://${HOST}:${PORT}`))
console.log(process.env)
