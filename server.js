var express = require('express');
var http = require("http");
var cron = require('node-cron');
var socketio = require('socket.io');
var bodyParser = require('body-parser');
var socket = require('./socket/socket-handle');
var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);
socket.HandleSocket(io);
var SerialPort = require('serialport');
var parsers = SerialPort.parsers;
var parser = new parsers.Readline({
    delimiter: '\r\n'
});
var usb = require('./devices/usb');
var path  = require('path');
app.set('port', 3000);
app.set('ip', '0.0.0.0');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.get('/api/listUsb', function (req, res) {
    usb.getUsbList(function (err, data) {
        res.status(200).send(data);
    });
});
app.post('/api/connect', function (req, res) {
    res.send(usb.connectDevice(req, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({"Ok": 1})
        }
    }));
});
app.get('*', (req, res) => {
    res.redirect("/");
});
server.listen(app.get('port'), function () {
    console.log('*** server started ***: ');
});
