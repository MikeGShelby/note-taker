const express = require('express');
const { notes } = require('./db/db.json');

const app = express();

const PORT = process.env.PORT || 3001;

// filter notes array based on a provided id
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
  }

// Display main landing page
app.get('/', (req, res) => {
    res.send('Main page');
  });

// Display all notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

// Display note data based on a provided id
app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
