let PORT = 1904
const BASE_PATH = `/api`
const express = require('express')
const app = express();


app.use(express.json())


app.get(`${BASE_PATH}/:a/x/:b`, function(req, res) {
    res.status(200).send("GET - Hello from my express application")
    console.log(`method: ${req.method}`)
    console.log(`query:`, req.query)
    console.log(`params:`, req.params)
})




app.put(`${BASE_PATH}/`, function(req, res) {
    res.status(200).send("PUT-Hello from my express application")
    console.log(`body:`, req.body)
})
app.post(`${BASE_PATH}`, function(req, res) {
    res.status(200).send("POST-Hello from my express application")
})
app.delete(`${BASE_PATH}`, function(req, res) {
    res.status(200).send("DELETE-Hello from my express application")
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}. Go to http://localhost:${PORT}`))


console.log("order_by=popularity&ascending=false&client_id=1234"
    .split('&')
    .reduce((prev, str) => { 
        let nameValue = str.split("=")
        prev[nameValue[0]] = nameValue[1]
        return prev
    }, {}))