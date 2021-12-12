const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./database/db');
const signUp_route = require('./route/signUp_route');
const AccountantRoute = require('./route/AccountantRoute');
const cartRoute = require('./route/cartRoute')
var app = express()

app.use(express.json())
app.use(cors());



app.use(bodyParser.urlencoded({ extended: false }));

app.use(signUp_route);
app.use(AccountantRoute)
app.use(cartRoute)
app.use(express.static('pictures'))








app.listen(90);