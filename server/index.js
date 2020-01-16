const express = require('express');
const port = 3000;
const bp = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');



// SERVER APP CONSTRUCTION
const app = express();
app.use(cors());
app.use(bp.json());


app.get('/bugs', (req, res) => {
	// console.log('new get req in progress' + Object.keys(req));
	BugModel.find((err, bugs) => {
		if (err) {
			res.send(err);
		} else {
			res.send(bugs);
		}
	})
});

// idnum to be incremented and decremented on create/delete
var idnum = 6;
app.post('/bugs', (req, res) => {
	console.log('new post req in progress: ' + req.body)
	idnum++;
	const newBug = new BugModel({
		description: req.body.description,
		reporter: req.body.reporter,
		assignment: req.body.assignment
	})

	newBug.save((err, newBug)=> {
		if (err) {
			res.sendStatus(err);
		} else {
			res.send(newBug, 201)
		}
	})
})

app.listen(port, () => console.log(`Server is listening on port ${port}`));

//SCHEMA CONSTRUCTION
const BugSchema = new mongoose.Schema({
	id: Number,
	description: String,
	reporter: String,
	creationTime: { type: Date, default: Date.now },
	assignment: String,
	threatLevel: String
})
mongoose.connect('mongodb://localhost:27017/bugs', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', () => console.log('connection error'));
db.once('open', () => {
	`Connected to DB!`
})

const BugModel = mongoose.model('Bugs', BugSchema)
