var express = require('express'),
	bodyParser = require('body-parser'),
	pg = require('pg'),
	config = require('./config'),
	app = express(),
	port = process.env.port || config.defaultPort,
	conString = config.dbConnectionString,
	passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
	
	app.use(express.static(__dirname + '/public'));
	app.use(bodyParser.json());
	app.use(passport.initialize());
	
	passport.use(new LocalStrategy(	
  		function(username, password, done) {


	  		return done(null, {username: username, password: password});
		}
	));
	
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
		
		var client = new pg.Client(conString);
		
		client.connect(function(err) {
			var results = [];
			// SQL Query > Select Data
			var query = client.query("SELECT users.*, roles.name FROM users INNER JOIN roles ON users.role_id = roles.id;");
			// Stream results back one row at a time
			query.on('row', function(row) {
				results.push(row);
			});

			// After all data is returned, close connection and return results
			query.on('end', function() {
				client.end();
				return res.json(results);
			});
		});
		
	});
	
	// GET user by id.
	app.get('/api/users/:id', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "SELECT array_to_json(array_agg(users)) FROM users WHERE id = " + req.params.id + ";";
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
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

		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				res.json(result);
			});
		});
		
	});
	
	// DELETE user.
	app.delete('/api/users/:id', function (req, res) {

		var client = new pg.Client(conString),
			query = "DELETE FROM users WHERE id = " + req.params.id + ";";

		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				res.json(result);
			});
		});
		
	});
	
	// UPDATE user.
	app.put('/api/users/:id', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "UPDATE users " + 
			"SET first_name = '" + req.body.first_name + "', " +
			"last_name = '" + req.body.last_name + "', " +
			"user_name = '" +  req.body.user_name + "', " +
			"password_hash = '" +  req.body.password_hash + "', " +
			"email= '" +  req.body.email + "', " +
			"role_id = '" +  req.body.role_id + "'" +
			"WHERE id = " + req.params.id + ";";

		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
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
				res.json(result.rows[0].array_to_json);
			});
		});
	});
	
	// GET roles by id.
	app.get('/api/roles/:id', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "SELECT array_to_json(array_agg(roles)) FROM roles WHERE id = " + req.params.id + ";";
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				res.json(result.rows[0].array_to_json);
			});
		});
	});
	
	// POST roles.
	app.post('/api/roles', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "INSERT INTO roles (name) VALUES ('" + req.body.name + "')";
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				res.json(result);
			});
		});
		
	});
	
	// DELETE role.
	app.delete('/api/roles/:id', function (req, res) {

		var client = new pg.Client(conString),
			query = "DELETE FROM roles WHERE id = " + req.params.id + ";";
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				res.json(result);
			});
		});
		
	});
	
	// UPDATE role.
	app.put('/api/roles/:id', function (req, res) {
		var client = new pg.Client(conString),
			query = "UPDATE roles SET name = '"+ req.body.name +"' WHERE id = " + req.params.id + ";";
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				res.json(result);
			});
		});
		
	});
	
	// GET blogs.
	app.get('/api/blogs', function (req, res) {
		
		var client = new pg.Client(conString);
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			var results = [];
			var last_updated_user = [];
			// SQL Query > Select Data
			var query = client.query("SELECT blogs.*, users.first_name FROM blogs INNER JOIN users ON blogs.user_id = users.id;");
			var userUpdateQuery = client.query("SELECT users.first_name FROM blogs INNER JOIN users ON blogs.last_updated_user_id = users.id;");
			// Stream results back one row at a time
			query.on('row', function(row) {
				results.push(row);
			});
			
			userUpdateQuery.on('row', function(row) {
					last_updated_user.push(row);
					for (var i = 0; i < results.length; i++)
					{
						results[i].last_updated_user = last_updated_user[i];
					}
				});

			// After all data is returned, close connection and return results
			userUpdateQuery.on('end', function() {	
				client.end();
				return res.json(results);
			});
		});	
	});
	
	// GET blog by id.
	app.get('/api/blogs/:id', function (req, res) {
			
		var client = new pg.Client(conString),
			query = "SELECT array_to_json(array_agg(blogs)) FROM blogs WHERE id = " + req.params.id + ";";
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
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
				"'" + req.body.last_updated_user_id + "');";
				
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				res.json(result);
			});
		});
		
	});
	
	// DELETE blog.
	app.delete('/api/blogs/:id', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "DELETE FROM blogs WHERE id = " + req.params.id + ";";
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				res.json(result);
			});
		});
		
	});

	// UPDATE blog.
	app.put('/api/blogs/:id', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "UPDATE blogs " +
				"SET title = '" + req.body.title + 
				"', user_id = " + req.body.user_id +
				", date_created = now()," +
				"body = '" + req.body.body +
				"', last_updated = now(), " +
				"last_updated_user_id = " + req.body.user_id + 
				"WHERE id = " + req.params.id + ";",
				deleteBlogTagsQuery = "DELETE FROM blog_blog_tags WHERE blog_id = " + req.params.id + ";",
				blogTagsQuery = "INSERT INTO blog_blog_tags (blog_id, blog_tag_id) VALUES ";
				
				
				for(var i = 0; i < req.body.tags.length; i++){
					 blogTagsQuery += "(" + req.params.id + "," +req.body.tags[i]+")";
					 if(i < req.body.tags.length -1){
						 blogTagsQuery += ", ";
					 }
					 else{
						 blogTagsQuery += ";";
					 }
				}		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(deleteBlogTagsQuery, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				
				client.query(query, function(err, tagResult) {
					if (err) {
						return console.error('error running query', err);
					}
					client.query(blogTagsQuery, function(err, deleteTagResult) {
						if (err) {
							return console.error('error running query', err);
						}
						client.end();
						res.json(result);
					});
				});
			});
		});	
	});
	
	//Get blog blog tags by id
	app.get('/api/blog-blog-tags/:id', function (req, res) {
			
		var client = new pg.Client(conString);
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			var results = [];
			// SQL Query > Select Data
			var query = client.query("SELECT * FROM blog_blog_tags WHERE blog_id = " + req.params.id + ";");
			// Stream results back one row at a time
			query.on('row', function(row) {
				results.push(row);
			});

			// After all data is returned, close connection and return results
			query.on('end', function() {	
				client.end();
				return res.json(results);
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
				res.json(result.rows[0].array_to_json);
			});
		});
		
	});
	
	// GET blog tags by id.
	app.get('/api/blog-tags/:id', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "SELECT array_to_json(array_agg(blog_tags)) FROM blog_tags WHERE id = " + req.params.id + ";";
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				res.json(result.rows[0].array_to_json);
			});
		});
	});
	
	// POST blog tags.
	app.post('/api/blog-tags', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "INSERT INTO blog_tags (name) VALUES ('" + req.body.name + "')";

		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				res.json(result);
			});
		});
		
	});
	
	// DELETE blogs tags.
	app.delete('/api/blog-tags/:id', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "DELETE FROM blog_tags WHERE id = " + req.params.id + ";";

		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				res.json(result);
			});
		});
	});
	
	// DELETE blogs tags by blog id.
	app.delete('/api/blog-blog-tags/:id', function (req, res) {
		var client = new pg.Client(conString),
			query = "DELETE FROM blog-blog-tags WHERE blog_id = " + req.params.id + ";",
			imageTagsQuery = "INSERT INTO image_image_tags (image_id, image_tag_id) VALUES ";
				for(var i = 0; i < req.body.tags.length; i++){
					 imageTagsQuery += "(" + req.params.id+ "," +req.body.tags[i]+")";
					 if(i < req.body.tags.length -1){
						 imageTagsQuery += ", ";
					 }
					 else{
						 imageTagsQuery += ";";
					 }
				}
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.query(imageTagsQuery, function(err, tagResult) {
					if (err) {
						return console.error('error running query', err);
					}
					client.end();
					res.json(result);
				});
			});
		});
	});
	
	// UPDATE blog tags.
	app.put('/api/blog-tags/:id', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "UPDATE blog_tags SET name = '"+ req.body.name +"' WHERE id = " + req.params.id + ";";

		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
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
				res.json(result.rows[0].array_to_json);
			});
		});
	});
	
	// GET blog tags by id.
	app.get('/api/image-tags/:id', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "SELECT array_to_json(array_agg(image_tags)) FROM image_tags WHERE id = " + req.params.id + ";";
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				res.json(result.rows[0].array_to_json);
			});
		});
	});
	
	// POST image tags.
	app.post('/api/image-tags', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "INSERT INTO image_tags (name) VALUES ('" + req.body.name + "')";
			
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				res.json(result);
			});
		});
		
	});

	// DELETE image tags.
	app.delete('/api/image-tags/:id', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "DELETE FROM image_tags WHERE id = " + req.params.id + ";";

		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				res.json(result);
			});
		});
		
	});

	// UPDATE image tags.
	app.put('/api/image-tags/:id', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "UPDATE image_tags SET name = '"+ req.body.name +"' WHERE id = " + req.params.id + ";";

		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				res.json(result);
			});
		});
		
	});
	
	//Get image image tags by id
	app.get('/api/image-image-tags/:id', function (req, res) {
		
		var client = new pg.Client(conString);
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			var results = [];
			// SQL Query > Select Data
			var query = client.query("SELECT * FROM image_image_tags WHERE image_id = " + req.params.id + ";");
			// Stream results back one row at a time
			query.on('row', function(row) {
				results.push(row);
			});

			// After all data is returned, close connection and return results
			query.on('end', function() {	
				client.end();
				return res.json(results);
			});
		});	
	});
	
	// GET images.
	app.get('/api/images', function (req, res) {
		
		var client = new pg.Client(conString);		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			
			var results = [];
			// SQL Query > Select Data
			var query = client.query("SELECT images.*, users.first_name FROM images INNER JOIN users ON images.user_id = users.id;");
			// Stream results back one row at a time
			query.on('row', function(row) {
				results.push(row);
			});

			// After all data is returned, close connection and return results
			query.on('end', function() {
				client.end();
				return res.json(results);
			});
		});
		
	});
	
	// GET images by id
	app.get('/api/images/:id', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "SELECT array_to_json(array_agg(images)) FROM images WHERE id = " + req.params.id;
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				res.json(result.rows[0].array_to_json);
			});
		});
		
	});
	
	// POST images.
	app.post('/api/images', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "INSERT INTO images (file_path, title, upload_date, user_id)" +
					"VALUES (" +
					"'" + req.body.file_path + "', " +
					"'" + req.body.title + "', " +
					"now(), " +
					"'" + req.body.user_id + "');";
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				res.json(result);
			});
		});
		
	});
	
	// UPDATE images.
	app.put('/api/images/:id', function (req, res) {
		var client = new pg.Client(conString),
			query = "UPDATE images SET " + 
					"file_path = '"+ req.body.file_path + "', " +
					"title = '"+ req.body.title + "' " +
					"WHERE id = " + req.params.id + ";",
			deleteTagsQuery = "DELETE FROM image_image_tags WHERE image_id = " + req.params.id + ";",
			imageTagsQuery = "INSERT INTO image_image_tags (image_id, image_tag_id) VALUES ";
				for(var i = 0; i < req.body.tags.length; i++){
					 imageTagsQuery += "(" + req.params.id+ "," +req.body.tags[i]+")";
					 if(i < req.body.tags.length -1){
						 imageTagsQuery += ", ";
					 }
					 else{
						 imageTagsQuery += ";";
					 }
				}
		
		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(deleteTagsQuery, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.query(query, function(err, result) {
					if (err) {
						return console.error('error running query', err);
					}
					client.query(imageTagsQuery, function(err, tagResult) {
						if (err) {
							return console.error('error running query', err);
						}
						client.end();
						res.json(result);
					});
				});
			});
		});
		
	});
	
	// DELETE images.
	app.delete('/api/images/:id', function (req, res) {
		
		var client = new pg.Client(conString),
			query = "DELETE FROM images WHERE id = " + req.params.id + ";";

		client.connect(function(err) {
			if(err) {
				return console.error('could not connect to postgres', err);
			}
			client.query(query, function(err, result) {
				if (err) {
					return console.error('error running query', err);
				}
				client.end();
				res.json(result);
			});
		});
		
	});
	
	app.post('/api/login',
	passport.authenticate('local'), function(req,res){
		
		res.json("logged in");
	});
	
	app.get('/loginFailure', function(req, res, next) {
	res.send('Failed to authenticate');
	});
	
	app.get('/loginSuccess', function(req, res, next) {
	res.send('Successfully authenticated');
	});
	 