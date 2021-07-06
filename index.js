const express = require('express');

const app = express();

app.use(express.json());

const doctorsRoute = require('./routes/doctorsRoutes');

app.use(doctorsRoute);

const PORT = 3000;

app.listen(PORT, () => console.log(`Listening on port: ${PORT}!`));
