var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');

app.use(express.static(__dirname + '/dist')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());

mongoose.connect('mongodb://localhost/');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});

Date.prototype.getWeekDay = function() {
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[this.getDay()];
}
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

Date.prototype.getMonthName = function() {
    return months[this.getMonth()];
};

var daySchema = new mongoose.Schema({
    id: String,
    date: String,
    members: [String]
});

var Day = mongoose.model('Day', daySchema);


var GameMonth = mongoose.model('GameMonth', {
    id: String,
    name: String,
    days: [daySchema]
})

function checkMonth() {
    console.log("check month");
    GameMonth.find(function(err, months) {
        var day = new Date();
        console.log("listener");
        if (err) return console.log(err);

        if (months.count == 0) {
            createNewMonth();
        } else {
            for (var i = 0; i < months.length; i++) {
                if (months[i].name == day.getMonthName() && months[i].id == getID()) {
                    return;
                }
            }
            createNewMonth();
        }
    });
}
checkMonth();


function getID() {
    var date = new Date();
    return "01." + date.getMonth() + "." + date.getFullYear()
}

function daysInMonth() {
    var date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
}

function createNewMonth() {
    console.log("Create new Month");
    var date = new Date();
    var days = [];
    var count = daysInMonth();
    console.log(count);
    for (var i = 1; i < count; i++) {
        var pommes = new Day({
            id: i + "." + date.getMonth() + "." +
                date.getFullYear(),
            date: new Date(date.getFullYear(), date.getMonth(), i).getWeekDay(),
            members: []
        });
        days.push(pommes);
        console.log(days.length);
    }
    var month = new GameMonth({
        id: getID(),
        name: new Date().getMonthName(),
        days: days
    })
    month.save();
}

app.get('/app/month', function(req, res) {

    GameMonth.findOne({
        id: getID()
    }, function(err, month) {
        if (err) return console.log(err);
        console.log(month);
        res.send(month);
    });
});

app.post('/app/update', function(req, res) {
    var date = req.body;
    console.log(date);
    var query = {
        'username': req.user.username
    };
    req.newData.username = req.user.username;
    MyModel.findOneAndUpdate(query, req.newData, {
        upsert: true
    }, function(err, doc) {
        if (err) return res.send(500, {
            error: err
        });
        return res.send("succesfully saved");
    });
    res.send(date.id);

})


app.get('/app', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html')
});

app.listen(8080);
console.log("App listening on port 8080");
