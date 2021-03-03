//links data and adding fs
const database = require('../db/db.json');
const fs = require('fs');

//Routes

module.exports = function(app) {

    app.get('/api/notes', function (req, res) {
        res.json(database);
    })

    app.post("/api/notes", function (req, res) {
        const newNote = req.body
        database.push(newNote);
        console.log("Note Saved!")
        res.end();
        // fs.writeFile(database, newNote, (err, res) =>{
        //     if (err) throw err;
        //     console.log(res);
        // })
    })

    app.delete("api/notes/:id", function (req, res) {
        const noteId = req.params.id
    })
}