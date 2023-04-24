const express = require('express');
const cors = require('cors');
require('dotenv').config();

// port config
const app = express();
const port = process.env.PORT;

// cors middleware
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

// 404
app.use((req, res, next) => {

    res.status(404).render('404', {
        error: '404',
        msg: 'Not found'
    });

});


app.listen(port, () => console.log(`Servidor a la escucha del puerto: ${port}`));