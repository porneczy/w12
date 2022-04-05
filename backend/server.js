const express = require("express");
const fs = require("fs");
const path = require("path");


const app = express();
const port = 9000;

const fFolder = `${__dirname}/../frontend`

app.use(express.json())

app.get('/', (req, res, next) => {
    res.sendFile(path.join(`${fFolder}/index.html`)); //sendFile-al bármilyen file-t át tudunk küldeni pl .json
});

app.get('/admin/order-view', (req, res, next) => {
    res.sendFile(path.join(`${fFolder}/index.html`));
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
app.get('/api/v1/users-query', (req, res, next) => {
    console.dir(req.query)
    console.log(req.query.apikey)
    if (req.query.apikey === "apple") {
        res.sendFile(path.join(`${__dirname}/../frontend/users.json`));
    }else{
        res.send("nem jó, ezt ird be: http://127.0.0.1:9000/api/v1/users-query?apikey=apple")
    }
})
app.get('/api/v1/users-params/:key', (req, res, next) => {
    console.dir(req.params)
    console.log(req.params.key)
    if (req.params.key === "apple") {
        res.send("ezt irtad be h alma")
    }else{
        res.send("NEM azt irtad be h apple")
    }
})
app.get('/api/v1/users/:status', (req, res, next) => {
    console.dir(req.params)
    console.log(req.params.status)
    if (req.params.status === "active") {
        fs.readFile("../frontend/users.json", (error, data) => {
            if (error) {
                res.send("hiba történt olvasás közben")
            }else{
                const users = JSON.parse(data)
                const activeUsers = users.filter(user => user.status === "active")
                res.send(activeUsers)
            }
        })
    }else if(req.params.status === "passive"){
        fs.readFile("../frontend/users.json", (error, data) => {
            if (error) {
                res.send("hiba történt olvasás közben")
            }else{
                const users = JSON.parse(data)
                const passiveUsers = users.filter(user => user.status === "passive")
                res.send(passiveUsers)
            }
        })
    }
})
    
/* 
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
 */
app.post('/users/new', (req, res) => {
    fs.readFile(`${fFolder}/users.json`, (error, data) => {
        if (error) {
            console.log(error);
            res.send("error van a reafbe")
        } else{
            const users = JSON.parse(data)
            console.log(req.body);

            users.push(req.body)

            fs.writeFile(`${fFolder}/users.json`, JSON.stringify(users), error => {
                if (error) {
                    console.log(error);
                    res.send("error a writingben")
                }
            })
            res.send(req.body)
        }
    })
})

app.use('/pub', express.static(`${__dirname}/../frontend/pub`))

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
})