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
    const port = new SerialPort(req.body.comName, {autoOpen: false});
    port.open(function (err) {
        if (err) {
            return console.log('Error opening port: ', err.message)
        }
    });
    port.on('readable', function () {
        port.read();
    });
    port.on('data', function (data) {
        for (const value of data.values()) {
            console.log(value);
        }
        readData(data);
        socket.EmitUpdateAllUsers({data:  data.toString('utf8')})
    });
    this.port.parser.on('data', function (data) {
        console.log('Data:', data, data.toString('utf8'));
    });
}

function readData(buffer) {
    console.log(buffer.toString('ascii'))
    // console.log(buffer.toString('ascii'))
    const len = -1;
    let packetCount = 0;
    let sampleRate = 0;
    let rawBuffer = [[]];
    // if (len > 0) {
    //     for (let i = 0; i < len; i++) {
    //         if ((buffer[i]) === 90 && i + 15 <= len) {
    //
    //             if ((buffer[i + 15]) >= 0 && ((buffer[i + 15]) <= 15)) {
    //                 packetCount++;
    //                 if (packetCount >= sampleRate) {
    //                     packetCount = 0;
    //                     console.log("Rate : " + sampleRate);
    //                     console.log("Time : "+ process.hrtime()[1]);
    //                 }
    //             }
    //
    //         }
    //     }
    // }
}

module.exports = {
    getUsbList,
    connectDevice
}