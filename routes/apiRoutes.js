const router = require('express').Router();
const path = require('path')
// import { JsonDB } from 'node-json-db';
// import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

// const db = new JsonDB(new Config("db.json", true, false, '/'));

const fs = require('fs');

router.get('/api/notes', (req, res) => {

    fs.readFile('/db.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
 
});
module.exports = router;