const express = require("express");
const fs = require("fs");
const path = require("path");


const app = express();
const port = 9000;

app.get('/', (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`)); //sendFile-al bármilyen file-t át tudunk küldeni pl .json
});
app.get('/kismacska', (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/somefile.json`)); 
});

app.get('/something', (req, res, next) => {
    console.log("bejött egy kérés a something enpointról");
    res.send("köszi a requestet, ez a something endpontról jött");

});

app.get('/api/v1/users', (req, res, next) => {
    console.log("bejött egy kérés a something enpointról");
    res.sendFile(path.join(`${__dirname}/../frontend/users.json`));
});

app.get('/api/v1/users/active', (req, res, next) => {
    fs.readFile("../frontend/users.json", (error, data) => {
        if (error) {
            res.send("hiba történt olvasás közben")
        }else{
            const users = JSON.parse(data)
            const activeUsers = users.filter(user => user.status === "active")
            res.send(activeUsers)
        }
    })
});
app.get('/api/v1/users/passive', (req, res, next) => {
    fs.readFile("../frontend/users.json", (error, data) => {
        if (error) {
            res.send("hiba történt olvasás közben")
        }else{
            const users = JSON.parse(data)
            const passiveUsers = users.filter(user => user.status === "passive")
            res.send(passiveUsers)
        }
    })
});



app.use('/pub', express.static(`${__dirname}/../frontend/pub`))

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
})