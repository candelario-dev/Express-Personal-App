const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://becca:becca@clustertracker.37pvb.mongodb.net/demo?retryWrites=true&w=majority";
const dbName = "demo";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  //console.log(db)
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('messages').save({
    date: req.body.date,
    symptoms: req.body.symptoms,
    thumbUp: 0
    }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    // console.log(req.body);
    res.redirect('/')
  })
})

app.put('/messages', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({date: req.body.date, symptoms: req.body.symptoms}, {
    $inc: {
      thumbUp: 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({date: req.body.date, symptoms: req.body.symptoms}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
