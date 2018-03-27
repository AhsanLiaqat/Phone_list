var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'root',
    port : 3306, //port mysql
    database:'test2'
});

connection.connect();
/* GET users listing. */
router.get('/Home:id', function(req, res, next) {
    var id = req.params.id;
    console.log(id,"+++++++++++++++++++++");  
  connection.query("select * from posts Where user_id=" +id,function(error, results,abc){
		console.log("Data from crud table ",results);
		res.send(results);

	});
});




router.post('/forms', function(req, res, next) {
	console.log(req)
	var input = JSON.parse(JSON.stringify(req.body));
	console.log(input)
	var query = 'insert into users(email,name,password) values('+'"'+input.email+'","'+input.name+'","'+input.password+'");';
	console.log(query);
	connection.query(query, function (error, results) {
		console.log('Result ======================>',results,error)
		if (error){
			throw error;	
			console.log('The solution is: ', error);
		}else{
			res.send(results);
		}

	});
});

router.post('/post', function(req, res, next) {
    console.log(req.body,"+++++++++++++++++++++++++++++++++++++++");
        console.log(req.body.post.post,"post")
        console.log(req.body.id)
        
        // input.post = JSON.parse(JSON.stringify(console.log(req.body.post.post)));
        // input.ID = JSON.parse(JSON.stringify(console.log(req.body.id)));

    var query = 'insert into posts(post,user_id) values('+'"'+req.body.post.post+'","'+req.body.id+'");';
    console.log(query);
    connection.query(query, function (err, results) {
        if (err){
            console.log('The solution is: ', error);
        }
        if(results){
            res.status(203).send('your status uploaded successfully');
        }


        else{
            res.send(results);
            console.log(results);    
        }

    });
});

router.post('/login',function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input,"this is the id");
    var query = "Select * from users Where email ='" + input.email + "';";
    console.log(query);


    connection.query(query , function(err, result){
        console.log('-----------------',typeof(result),result[0].password);
         if(err){
             console.log("Error deleting : %s ",err );
         }
         if(result && result.length == 1){

            if(result[0].password == input.password){
                console.log("password match");
                res.status(200).send(result);
                console.log(result);
            }
            else{
                console.log("password does not match");
                res.status(202).send('invalid password');
            }

         }else if(result.length  > 1){
                res.send(result);
         }else{
            res.send(result);
         }
        console.log(result,"eifeihfiehfeifheih")

         
    });
    // res.send({});
});


module.exports = router;
