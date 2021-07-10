const request = require('supertest');
const express = require('express');
const doctorsRoute = require('../routes/doctorsRoutes');
const messages = require('./config/errorMessages');
const { contentType, applicationJson } = require('./config/parameters');

const app = express();
app.use(express.json());
app.use(doctorsRoute);

describe('4 - Check delete doctor routes', () => {
  it('It will be validated that it is not possible to delete a non-existent doctor', async () => await request(app)
    .delete('/doctor/99')
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(404, messages.doctorNotFound));

  it('It will be validated that it is possible to successfully delete a doctor', async () => await request(app)
    .delete('/doctor/2')
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(200, messages.doctorDeleted));
});