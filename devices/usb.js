var socket = require("../socket/socket-handle");

var SerialPort = require('serialport');
const delimiter = require('@serialport/parser-delimiter')
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
    const parser = port.pipe(new delimiter({ delimiter: '\n'}));



    parser.on('data', (data) => {
       console.log('dataReady', data);
    });
    port.open(function (err) {
        if (err) {
            return console.log('Error opening port: ', err.message)
        }
    });
    port.on('readable', function () {
        port.read();
    });
//     port.on('data', function (data) {
//         // for (const value of data.values()) {
//         //     console.log(value);
//         // }
//         readData(data,function (p) {
//             socket.EmitUpdateAllUsers({data:  p})
//         });
//
//     });
//     this.port.parser.on('data', function (data) {
//         console.log('Data:', data, data.toString('utf8'));
//     });
}
;
function readData(buffer,next) {
    console.log('Output: ', buffer.length);
    console.log( buffer );
    //
    // const a = spawn('echo', buffer.toJSON().data);
    // const b = new PassThrough();
    // const c = new PassThrough();
    //
    // a.stdout.pipe(b);
    // a.stdout.pipe(c);
    //
    // let count = 0;
    // b.on('data', function (chunk) {
    //     count += chunk.length;
    //
    // });
    // b.on('end', function () {
    //     console.log(count);
    //     next(c.pipe(process.stdout));
    // });
}

module.exports = {
    getUsbList,
    connectDevice
}
