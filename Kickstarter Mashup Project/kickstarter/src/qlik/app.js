import enigma from 'enigma.js'

const schema = require("../../node_modules/enigma.js/schemas/3.1.json")

//create a new session
const session = enigma.create({
    schema,
    url: 'ws://localhost:4848/app/engineData'
})

//log what is sent and received on the socket
//session.on('traffic:sent', data => console.log('sent: ',data));
//session.on('traffic:received', data => console.log('received: ',data));

//open socket
export default session.open().then(global => 
    global.openDoc("KICKSTARTER.qvf").then(app=> {
        return app
    })
);