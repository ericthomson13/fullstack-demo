const express = require('express');
const port = 3000;
const bp = require('body-parser');

const app = express();
app.use(bp.json());

app.get(`/bugs`, (req, res) => {

})

app.post(`/bugs`, (req, res) => {
	console.log(req.body)
	res.send(200)
})

app.listen(port, () => console.log(`Server is listening on port ${port}`));