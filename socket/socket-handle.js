var connectedUsers = {};
var subscribeAllUsers = {};
var handleSocket = function (io) {
    io.sockets.on('connection', function (socket) {
        setConnectedUser(socket.id, socket);
        socket.conn.on('heartbeat', function () {
        });
        socket.on('disconnect', function () {
            console.log("disconnect event received : " + socket.id);
        });
        socket.on('subscribeGroutingServer', function () {
            console.log("Subscribe for Grouting Server : " + socket.id);
            setSubscribe(socket.id, socket);
        });
    });
};
var setConnectedUser = function (id, socket) {
    //id is user name
    if (connectedUsers[ id ]) {
        connectedUsers[ id ] = socket;
    } else {
        connectedUsers[ id ] = socket;
    }
};
var getUserSocket = function (id) {
    if (connectedUsers[ id ]) {
        return connectedUsers[ id ];
    } else {
        return null;
    }
};
var setSubscribe = function (id, socket) {
    if (subscribeAllUsers[ id ]) {
        subscribeAllUsers[ id ] = socket;
    } else {
        subscribeAllUsers[ id ] = socket;
    }
};
var emitUpdateIosForAllUsers = function (data) {
    if (data) {
        try {
            //var data = JSON.stringify(req);
            for (var key in subscribeAllUsers) {
                subscribeAllUsers[key].emit('updateIos', data);
            }
        } catch (e) {
            console.log("Error While Stringify The request body");
        }
    }
};
var emitUpdateAllUsers = function (data) {
    if (data) {
        try {
            //var data = JSON.stringify(req);
            for (var key in connectedUsers) {
                connectedUsers[key].emit('fdtiData', data);
            }
        } catch (e) {
            console.log("Error While Stringify The request body");
        }
    }
};
var emitCustomMessageForUser = function (req, emitName) {
    if (req.socketId) {
        try {
            var socketId = req.socketId;
            var data = req.data;
            connectedUsers[ socketId ].emit(emitName, data);
            console.log("Event : " + emitName + " emit to user : " + socketId);
        } catch (e) {
            console.log("Error While Stringify The request body" + e);
        }
    }
};
module.exports.HandleSocket = handleSocket;
module.exports.EmitCustomMessageForUser = emitCustomMessageForUser;
module.exports.EmitUpdateIosForAllUsers = emitUpdateIosForAllUsers;
module.exports.EmitUpdateAllUsers = emitUpdateAllUsers;
