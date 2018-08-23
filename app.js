var express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cons = require('consolidate'),
dust = require('dustjs-helpers'),
pg = require('pg'),
app = express();


/*Несколько способов коннекта к базе с помощью connect URI или PRogrammitacaly */
var connectionString = 'postgresql://Vlada:sambuca74@localhost:5432/postgres';
const { Pool, Client } = require('pg');
//Programmitcaly
// var client = new pg.Client({
//    host: "localhost",
//  port: 5432,
//    user: "Vlada",
//    password: "sambuca74",
//   database: "RecipeBookDB"
//  });

//Connection URI способ
// const pool = new Pool({
//     connectionString: connectionString,
//   });

var db_table = "recipes";




















//Assign Dust Engine to .dust Files
app.engine('dust', cons.dust);

//Set Default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname+ '/views');

//Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body-Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));







// const pool = new Pool({
//     connectionString: connectionString,
//   })
  
//   pool.query('SELECT * FROM Recipes', (err, res) => {
//     console.log(err, res)
//     pool.end()
//   })
  
  const client = new Client({
    connectionString: connectionString,
  })

 



















app.get('/', function(req, res){
    //Загрузка файла из views - index.dust


//Коннектимся к базе recipes
client.connect();
  
  client.query('SELECT * FROM recipes', (err, result) => {
    //console.log(res);
    res.render('index', {recipes: result.rows}); 
  
  });
console.log('Show old data from Databases');
});


//INSERT new data to database
app.post('/add', function(req,res){
//Коннектимся к базе recipes
client.connect();
  
  client.query('INSERT INTO '+ db_table + ' (name, ingredients, directions) VALUES($1, $2, $3)',[req.body.name, req.body.ingredients, req.body.directions] , (err, result) => {
    //console.log(res);
   
 

   res.redirect('/');
  });
console.log('Inserted data to databases');
});


//DELETE data from database
app.delete('/delete/:id', function(req, res){
//Коннектимся к базе recipes
client.connect();
  
  client.query('DELETE FROM '+ db_table + ' WHERE id = $1',[req.params.id]);
  
   
 

   res.sendStatus(200);
   console.log('Deleted data to databases');
  });





//Server
app.listen(3010, function(){
console.log('Server started on port 3010');
});




//   client.connect();

//   client.query();

  