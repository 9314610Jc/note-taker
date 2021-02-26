const express = require('express');

const htmlRoutes = require('./routes/htmlRoutes.js')
const apiRoutes = require('./routes/apiRoutes.js')

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 4000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


app.use(htmlRoutes)
app.use(apiRoutes)

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });
