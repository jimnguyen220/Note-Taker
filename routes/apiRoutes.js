//links data and adding fs
let database = require('../db/db.json');
const fs = require('fs');

//Routes

module.exports = function(app) {
    let lastID = 0;
    
    if (database.length > 0) {
        lastID = database[database.length -1].id;
    };

    app.get('/api/notes', function (req, res) {
        res.json(database);
       
    })

    app.post("/api/notes/", function (req, res) {
        const newNote = req.body
        newNote["id"] = lastID + 1;
        lastID = newNote["id"];
        database.push(newNote);
    
        fs.writeFile('./db/db.json', JSON.stringify(database), (err) =>{
            if (err) throw err;
            console.log("Note Saved!")
  
        })
        res.send({redirect: '/notes'});
    })
 
    app.delete("/api/notes/:id", function (req, res) {
        const noteId = req.params.id;
       // filter database data 
        const result = database.filter(note => note.id != noteId);
       
        // write filtered data back to database 
        fs.writeFile('./db/db.json', JSON.stringify(result), (err) =>{
            if (err) throw err;
            console.log("Note Deleted!");
        })
        database = result;
        res.json(result);
       
    });
};