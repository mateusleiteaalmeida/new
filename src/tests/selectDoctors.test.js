const request = require('supertest');
const express = require('express');
const doctorsRoute = require('../routes/doctorsRoutes');
const { contentType, applicationJson } = require('./config/parameters');

const app = express();
app.use(express.json());
app.use(doctorsRoute);

describe('2 - Check search doctor routes', () => {
  it('It will be validated that it is possible to search by doctor id', async () => await request(app)
    .get('/search?id=1')
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(200)
    .then((res) => {
      expect(res.body.length).toBe(1);
    }))

  it('It will be validated that it is possible to search by doctor fullName', async () => await request(app)
    .get('/search?fullName=John')
    .set('Accept', applicationJson)
    .expect(200)
    .then((res) => {
      expect(res.body.length).toBe(1);
    }))

  it('It will be validated that it is possible to search by doctor CRM', async () => await request(app)
    .get('/search?CRM=1212')
    .set('Accept', applicationJson)
    .expect(200)
    .then((res) => {
      expect(res.body.length).toBe(1);
    }))

  it('It will be validated that it is possible to search by doctor address', async () => await request(app)
    .get('/search?address=Centro')
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(200)
    .then((res) => {
      expect(res.body.length).toBe(1);
    }))

  it('It will be validated that it is possible to search by doctor phone', async () => await request(app)
    .get('/search?phone=4569')
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(200)
    .then((res) => {
      expect(res.body.length).toBe(1);
    }))

  it('It will be validated that it is possible to search by doctor specialty', async () => await request(app)
    .get('/search?specialty=CARDIOLOGIA')
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(200)
    .then((res) => {
      expect(res.body.length).toBe(1);
    }))

  it('It will be validated that it is possible to successfully list all doctors', async () => await request(app)
    .get('/doctor')
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(200)
    .then((res) => {
      expect(res.body.length).toBe(2);
    }))
});