var express = require('express'),
	bodyParser = require('body-parser'),
	pg = require('pg'),
	config = require('./config'),
	app = express(),
	port = process.env.port || config.defaultPort,
	conString = config.dbConnectionString;
	
	app.use(express.static(__dirname + '/public'));
	app.use(bodyParser.json());
	
	// Start server.
	app.listen(port, function () {
		
		console.log('listening...');
		
		var client = new pg.Client(conString);
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query('SELECT NOW() AS "theTime"', function(err, result) {
				if(err) {
					return console.error('error running query', err);
				}
				console.log(result.rows[0].theTime);
				client.end();
			});
		});
		
	});
	
	// GET users.
	app.get('/api/users', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "SELECT array_to_json(array_agg(users)) FROM users";
		
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				console.log(result.rows[0].array_to_json);
				res.json(result.rows[0].array_to_json);
			});
		});
		
	});
	
	// POST users.
	app.post('/api/users', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "INSERT INTO users " +
					"(first_name, last_name, user_name, password_hash, email, role_id) " + 
					"VALUES (" +
					"'" + req.body.first_name + "', " +
					"'" + req.body.last_name + "', " +
					"'" + req.body.user_name + "', " +
					"'" + req.body.password_hash + "', " +
					"'" + req.body.email + "', " +
					"'" + req.body.role_id + "');";
		
		console.log(query);
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				console.log(result);
				res.json(result);
			});
		});
		
	});
	
	// GET roles.
	app.get('/api/roles', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "SELECT array_to_json(array_agg(roles)) FROM roles";
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				console.log(result.rows[0].array_to_json);
				res.json(result.rows[0].array_to_json);
			});
		});
		
	});
	
	// POST roles.
	app.post('/api/roles', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "INSERT INTO roles (name) VALUES ('" + req.body.name + "')";
		
		console.log(query);
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				console.log(result);
				res.json(result);
			});
		});
		
	});
	
	// GET blogs.
	app.get('/api/blogs', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "SELECT array_to_json(array_agg(blogs)) FROM blogs";
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				console.log(result.rows[0].array_to_json);
				res.json(result.rows[0].array_to_json);
			});
		});
		
	});
	
	// POST blogs.
	app.post('/api/blogs', function (req, res) {
		
		var client = new pg.Client(conString),
		query = "INSERT INTO blogs " +
				"(title, user_id, date_created, body, last_updated, last_updated_user_id) " + 
				"VALUES (" +
				"'" + req.body.title + "', " +
				"'" + req.body.user_id + "', " +
				"now(), " +
				"'" + req.body.body + "', " +
				"now(), " +
				"'" + req.body.user_id + "');";
		
		console.log(query);
				
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				console.log(result);
				res.json(result);
			});
		});
		
	});

	// GET blog tags.
	app.get('/api/blog-tags', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "SELECT array_to_json(array_agg(blog_tags)) FROM blog_tags";
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				console.log(result.rows[0].array_to_json);
				res.json(result.rows[0].array_to_json);
			});
		});
		
	});
	
	// POST blog tags.
	app.post('/api/blog-tags', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "INSERT INTO blog_tags (name) VALUES ('" + req.body.name + "')";
		
		console.log(query);
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				console.log(result);
				res.json(result);
			});
		});
		
	});

	// GET image tags.
	app.get('/api/image-tags', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "SELECT array_to_json(array_agg(image_tags)) FROM image_tags";
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				console.log(result.rows[0].array_to_json);
				res.json(result.rows[0].array_to_json);
			});
		});
		
	});
	
	// POST image tags.
	app.post('/api/image-tags', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "INSERT INTO image_tags (name) VALUES ('" + req.body.name + "')";
		
		console.log(query);
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				console.log(result);
				res.json(result);
			});
		});
		
	});

	// DELETE image tags.
	app.delete('/api/image-tags/:id', function (req, res) {
		
		console.log(req.params);
		
		var client = new pg.Client(conString),
			query = "DELETE FROM image_tags WHERE id = " + req.params.id + ";";
		
		console.log(query);
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				console.log(result);
				res.json(result);
			});
		});
		
	});
