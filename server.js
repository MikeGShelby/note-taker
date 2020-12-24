const express = require('express');
const { notes } = require('./db/db.json');

const app = express();

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Main page');
  });

app.get('/api/notes', (req, res) => {
    res.json(notes);
  });


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
