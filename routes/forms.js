var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'root',
    port : 3306, //port mysql
    database:'test_ahsan'
});

connection.connect();
/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.query('select * from crud',function(error, results,abc){
		console.log("Data from crud table ",results);
		res.send(results)

	});
});




router.post('/forms', function(req, res, next) {
	console.log(req)
	var input = JSON.parse(JSON.stringify(req.body));
	console.log(input)
	var query = 'insert into crud(name,email,number) values('+'"'+input.name+'","'+input.email+'","'+input.number+'");';
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

router.delete('/forms/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	connection.query("DELETE FROM crud WHERE id =  "+id, function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/');
             
        });
});

router.get('/forms/:id',function(req,res){
	var id = req.params.id;
	console.log(id,"this is the id");
	connection.query("select * FROM crud WHERE id = "+id, function(err, rows)
        {
            
             if(err){
                 console.log("Error deleting : %s ",err );
             }
            console.log(rows,"eifeihfiehfeifheih")
             res.send(rows);
             
        });
});

router.put('/forms/:id', function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    console.log('Id-----------',id)
    console.log('Data-----------',input)
   
   
		var query = 'update crud set name = "'+input.name+'",email = "'+input.email+'", number = "'+input.number+'" where id='+id;
    	
    	console.log('-----',query);
        connection.query(query, function(err, rows)
         {
         	console.log(rows);
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          // res.redirect('/');
          
        });
    
    
});


module.exports = router;
