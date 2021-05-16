process.env.NODE_ENV = 'production'; // altere para 'production' ou 'dev'

var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var compression = require('compression')

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var leiturasRouter = require('./routes/leituras');
var summonerRoute = require('./routes/summoner');

var app = express();

app.use(logger('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view options", { layout: false });
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + "/public");

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/leituras', leiturasRouter);
app.use('/summoner', summonerRoute)




// para os includes funcionarem!
app.all("*", function (req, res, next) {
    var request = req.params[0];

    if ((request.substr(0, 1) === "/") && (request.substr(request.length - 4) === "html")) {
        request = request.substr(1);
        res.render(request);
    } else {
        next();
    }

});

app.use(express.static(__dirname + '/public'));

module.exports = app;
