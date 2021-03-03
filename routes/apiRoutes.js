//links data and adding fs
const database = require('../db/db.json');
const fs = require('fs');

//Routes

module.exports = function(app) {

    app.get('/api/notes', function (req, res) {
        res.json(database);
    })

    
}