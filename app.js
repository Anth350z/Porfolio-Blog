var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'armc',
  database: 'test'
});
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
connection.connect();


app.listen(3000);
console.log('listening on port 3000');



app.get("/", function(req, res) {
  res.render("porfolio");
});

app.get("/post", function(req, res) {
  connection.query('SELECT * from test ', function(error, result) {
    res.render("post", {
      result: result
    });
  })
});


app.post("/post", function(req, res) {
  var name = req.body.name;
  console.log(name);
  // image
  var desc = req.body.desc;
  var parafo = req.body.parafo;
  var picture = req.body.picture;
  console.log(picture);
  var datos = {
    name: name,
    desc: desc,
    parafo: parafo,
    picture: picture
  }
  connection.query('INSERT INTO test SET ?', datos, function(error, result) {
    console.log("here insert")
    console.log(result);
    res.redirect("/post");
  })
});


app.get("/post/new", function(req, res) {
  res.render("new.ejs");
});


app.get("/postOpen/:id", function(req, res) {
  var idd = req.params.id;
  connection.query('SELECT * FROM test where id=?', idd, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      res.render("postOpen", {
        resultado: result
      });

    }
  })

})
app.post("/:id", function(req, res) {
  var iddd = req.params.id;
  connection.query('DELETE FROM test where id=?', iddd, function(error, result) {
    res.redirect("/post");
  })
})
