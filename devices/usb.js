var socket = require("../socket/socket-handle");

var SerialPort = require('serialport');

function getUsbList(next) {
    let arr = [];
    SerialPort.list(function (err, ports) {
        ports.forEach(function (port) {
            //if(port.venderId){
            arr.push(port)
            //  }
        });
        return next(null, arr);
    });

}

function connectDevice(req, next) {
    const port = new SerialPort(req.body.comName, { autoOpen: false });
    port.open(function (err) {
        if (err) {
            return console.log('Error opening port: ', err.message)
        }
    });
    port.on('readable', function () {
        port.read();
    });
    port.on('data', function (data) {
        socket.EmitUpdateAllUsers({test:"tes"})
    });
}

module.exports = {
    getUsbList,
    connectDevice
}
