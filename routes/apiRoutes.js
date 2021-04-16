const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

let db = require("../db/db.json");

router.get("/api/notes", (req, res) => {
  res.json(db);
});

router.post("/api/notes", (req, res) => {
  req.body.id = uuidv4();
 ;
  db.push(req.body);

  fs.writeFileSync("./db/db.json", JSON.stringify(DB));
  res.json(db);
});

router.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  db = db.filter((note) => note.id != id);
  fs.writeFileSync("./db/db.json", JSON.stringify(DB));
  res.json(db);
});

module.exports = router;