const express = require('express');
const { notes } = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');


const app = express();

// parse incoming string or array data
app.use(express.urlencoded());
// parse incoming JSON data
app.use(express.json());

const PORT = process.env.PORT || 3001;

// filter notes array based on a provided id
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    note.id = uuid.v4();
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
      );

    return note;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    return true;
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

// Add new note
app.post('/api/notes', (req, res) => {
    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('Please provide a title for your note before saving');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
