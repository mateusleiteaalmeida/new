const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        version: "1.0.0",
        title: "API - Doctors Records Manager",
        description: "Documentation of an application to register doctors."
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: ["Doctors"],
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/doctorsRoutes.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')
})