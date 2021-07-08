const express = require('express');

const app = express();

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


const doctorsRoute = require('./routes/doctorsRoutes');

app.use(express.json());

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/', doctorsRoute);

const PORT = 3000;

app.listen(PORT, () => console.log(`Listening on port: ${PORT}!`));
