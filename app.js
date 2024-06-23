const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const personal = require('./Personal.json');

const app = express();
app.set('PORT', 3000);
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(app.get('PORT'), function () {
    console.log('server running on port', app.get('PORT'));
});

const io = new Server(server);

function savePerson(person) {
    console.log(person);
    personal.personal.push(person);
    io.emit('database', personal);
}

function popPerson() {
    console.log(personal.personal.pop());
    io.emit('database', personal);
}

io.on('connection', (socket) => {
    console.log("A user connected");
    io.emit('database', personal);
    socket.on('disconnect', () => {
        console.log("User disconnected")
    });
    socket.on('save-person', (person) => savePerson(person));
    socket.on('pop-person', () => popPerson());
});
