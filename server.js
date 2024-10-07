const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const PORT = 5500;
const app = express();

app.use(cors());


app.use(bodyParser.json());
app.use(express.static('public'));


app.post('/barcode', (req, res) => {
  const code = req.body.code;
  console.log(`Code: ${code}`);
   


});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
