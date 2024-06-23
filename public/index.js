import { newElement } from './libs/utils.js';

var socket = io(/* 'ws://localhost:3000', {transports: ['websocket']} */);

let personal;

let title = newElement({
    elementName: 'h1',
    className: 'title',
    innerHTML: 'Personal de Planta',
    parent: document.body
});

let btnShowDataBase = newElement({
    elementName: 'button',
    className: 'button',
    innerHTML: 'Show DataBase',
    parent: document.body
}).addEventListener('click', function () {
    if (this.innerHTML === 'Show DataBase') {
        showDataBase();
        this.innerHTML = 'hide DataBase';
    } else if (this.innerHTML === 'hide DataBase') {
        hideDataBase();
        this.innerHTML = 'Show DataBase';
    }
});

let inputName = newElement({
    elementName: 'input',
    className: 'input',
    parent: document.body
});

let inputLastName = newElement({
    elementName: 'input',
    className: 'input',
    parent: document.body
});

let inputDni = newElement({
    elementName: 'input',
    className: 'input',
    parent: document.body
});

let inputIncome = newElement({
    elementName: 'input',
    className: 'input',
    parent: document.body
});

let btnSendName = newElement({
    elementName: 'button',
    className: 'button',
    innerHTML: 'Send Name',
    parent: document.body
}).addEventListener('click', function () {
    if (!(inputName.value && inputLastName.value && inputDni.value && inputIncome.value)) return;
    let newPerson = {
        "name": inputName.value,
        "lastName": inputLastName.value,
        "dni": inputDni.value,
        "income": inputIncome.value
    };
    socket.emit('save-person', newPerson);
    console.log(newPerson);
});

let btnDeleteLast = newElement({
    elementName: 'button',
    className: 'button',
    innerHTML: 'Delete Last',
    parent: document.body
}).addEventListener('click', function () {
    socket.emit('pop-person');
});

function refreshDataBase() {
    hideDataBase ();
    showDataBase ();
}

function hideDataBase () {
    if (!document.getElementById('personal-table')) return;
    document.body.removeChild(document.getElementById('personal-table'));
    return;
}

function showDataBase () {
    if (document.getElementById('personal-table')) return;

    let table = newElement({
                    elementName: 'div',
                    id: 'personal-table',
                    className: 'grid-container',
                    parent: document.body
                });
    
    let keys = ['name', 'lastName', 'dni', 'income'];

    for (let person of personal) {
        let tr = newElement({
                    elementName: 'div',
                    className: 'row',
                    parent: table
                });

        for (let key of keys) {
            newElement({
                elementName: 'div',
                className: 'cell',
                innerHTML: person[key],
                parent: tr
            });
        }
    }
    return;
}

socket.on('show', function (data) {
});

socket.on('database', function (data) {
    personal = data.personal;
    refreshDataBase();
});