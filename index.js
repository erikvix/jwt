const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000

require('dotenv').config();
app.use(express.json());

const users = [{
    name: 'Gust',
    pass: 'gust12'
},
{
    name: 'Dan',
    pass: 'dan897'
}]

app.get('/', (req, res) =>{
res.json(users.filter(user => user.name === req.user.name))
})

app.post('/', (req, res) =>{
    let username = req.body.name;
    let user = {name : username}
    
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN)
    res.json({ accessToken: accessToken})
})

const authToken = (req, res, next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) =>{
        if(err){
            return res.sendStatus(403)
        }
        req.user = user
        next();
    })
}


app.listen(port, () =>{
    console.log(`Server running on ${port}`)
})