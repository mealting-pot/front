/**
 * Created by Jordan on 19/07/2015.
 */
'use strict';

var express = require('express');

var app = express();

app.use(express.static('dist'));

app.use(function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(8888);