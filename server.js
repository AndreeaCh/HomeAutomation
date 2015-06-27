// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/
															// express
    var mongoose = require('mongoose');                     // mongoose for
															// mongodb
    var morgan = require('morgan');             // log requests to the console
												// (express4)
    var bodyParser = require('body-parser');    // pull information from HTML
												// POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and
														// PUT (express4)

    // configuration =================

    mongoose.connect('mongodb://deeach@192.168.0.101:27017/apartament');     // connect
																	// to
																	// mongoDB
																	// database
																	// on
																	// modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the
																	// static
																	// files
																	// location
																	// /public/img
																	// will be
																	// /img for
																	// users
    app.use(morgan('dev'));                                         // log every
																	// request
																	// to the
																	// console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse
																	// application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse
																	// application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse
																	// application/vnd.api+json
																	// as json
    app.use(methodOverride());
    // define model =================
    var Todo = mongoose.model('Todo', {
        text : String,
		temperature : {type: Number, default: 3},
		luminosity : {type: Number, default: 3},
		humidity : {type: Number, default: 3},
		time: {type: Date, default: Date.now}
    });
	
	// application -------------------------------------------------------------
    app.get('', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file
												// (angular will handle the page
												// changes on the front-end)
    });
	
    // listen (start app with node server.js)
	// ======================================
    app.listen(8080,"0.0.0.0");
    console.log("App listening on port 8080");
	
	// routes
	// ======================================================================

    // api ---------------------------------------------------------------------
    // get all todos
    exports.findTodos = function(req, res) {
    	// use mongoose to get all todos in the database
        Todo.find(function(err, todos) {
            // if there is an error retrieving, send the error. nothing after
			// res.send(err) will execute
            if (err){
                var send=res.send(err);
            }
            res.json(todos); // return all todos in JSON format
        });
    };
    app.get('/api/todos', exports.findTodos);

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            time : req.body.time,
            temperature : req.body.temperature,
            luminosity : req.body.luminosity,
            humidity : req.body.humidity,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err){
                	res.send(err);
                }
                res.json(todos);
            });
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err){
                res.send(err);
            }
            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err){
                    res.send(err);
                }
                res.json(todos);
            });
        });
    });
