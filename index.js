const express = require('express')
const app = express()
var path = require('path')
var bodyParser = require('body-parser')
const mongoClient= require('mongodb').MongoClient
var db
mongoClient.connect('mongodb://@ds115583.mlab.com:15583/mongotest',(err,database)=>{
	if(err) return console.log("Error occured",err)
	db=database
	app.listen(3000,function(){
		console.log("server on 3000");
	})
})

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended: true}))


app.get('/',(req,res)=>{
	// res.send(asd);
})

app.post('/quotes',(req, res)=>{
	db.collection('quotes').save(req.body,(err,result)=>{
		if(err) return console.log(err)
		console.log("saved to database")
		res.redirect('/')
	})
	/console.log(req.body)
	// res.send("hello")
})

