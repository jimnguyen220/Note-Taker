//links data and adding fs
const database = require('../db/db.json');
const fs = require('fs');

//Routes

module.exports = function(app) {
    let lastID = database[database.length-1].id;

    app.get('/api/notes', function (req, res) {
        res.json(database);
       
    })

    app.post("/api/notes/", function (req, res) {
        const newNote = req.body
        console.log(newNote)
        newNote["id"] = lastID + 1;
        database.push(newNote);
    
        fs.writeFile('./db/db.json', JSON.stringify(database), (err, res) =>{
            if (err) throw err;
            console.log(res);
            
        })
        res.send({redirect: '/notes'});
    })
 
    app.delete("/api/notes/:id", function (req, res) {
        const noteId = req.params.id;
       // filter database data 
       const result = database.filter(note => note.id != noteId);
       

        // write filtered data back to database 
        fs.writeFile('./db/db.json', JSON.stringify(result), (err, res) =>{
            if (err) throw err;
            console.log(res);
        })
        res.json(result);
       
    });
};