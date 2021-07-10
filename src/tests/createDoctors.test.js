const request = require('supertest');
const express = require('express');
const doctorsRoute = require('../routes/doctorsRoutes');
const messages = require('./config/errorMessages');
const { contentType, applicationJson } = require('./config/parameters');
const doctor = require('./config/doctors.json')

const app = express();
app.use(express.json());
app.use(doctorsRoute);

const { fullName, CRM, address, phone, specialty } = doctor;
const withoutFullName = { CRM, address, phone, specialty };
const withoutCRM = { fullName, address, phone, specialty };
const withoutAddress = { fullName, CRM, phone, specialty };
const withoutPhone = { fullName, CRM, address, specialty };
const withoutSpecialty = { fullName, CRM, address, phone };
const invalidFullName = { ...doctor, fullName: "Mateus Leite Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste" }
const invalidCRM = { ...doctor, CRM: "12345678" }
const invalidZipCode = { ...doctor, address: { 
  zipCode: '30160160',
  streetAddress: 'Rua Rio de Janeiro',
  streetNumber: '15',
  complement: 'Apto 1'
} }
const invalidPhone = { ...doctor, phone: [{ type: "Celular", ddd: "31", number: "998989898" }] }
const invalidSpecialty = { ...doctor, specialty: ["PEDIATRIA"]}

describe('1 - Check create doctor routes', () => {
  it('It will be validated that it is not possible to create a doctor without full name', async () => {
    const response = await request(app)
    .post('/doctor')
    .send(withoutFullName)
    .set('Accept', applicationJson);

    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual(messages.fullNameRequired)
  });

  it('It will be validated that it is not possible to create a doctor without full CRM', async () => {
    const response = await request(app)
    .post('/doctor')
    .send(withoutCRM)
    .set('Accept', applicationJson);

    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual(messages.CRMRequired)
  });

  it('It will be validated that it is not possible to create a doctor without address', async () => {
    const response = await request(app)
    .post('/doctor')
    .send(withoutAddress)
    .set('Accept', applicationJson);

    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual(messages.addressRequired)
  });

  it('It will be validated that it is not possible to create a doctor without phone', async () => {
    const response = await request(app)
    .post('/doctor')
    .send(withoutPhone)
    .set('Accept', applicationJson);

    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual(messages.phoneRequired)
  });

  it('It will be validated that it is not possible to create a doctor without specialty', async () => {
    const response = await request(app)
    .post('/doctor')
    .send(withoutSpecialty)
    .set('Accept', applicationJson);

    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual(messages.specialtyRequired)
  });

  it('It will be validated that it is not possible to create a doctor with a name longer than 120 characters', async () => {
    const response = await request(app)
    .post('/doctor')
    .send(invalidFullName)
    .set('Accept', applicationJson);

    expect(response.statusCode).toEqual(400)
    expect(response.body).toEqual(messages.fullNameInvalid)
  });

  it('It will be validated that it is not possible to create a doctor with a name longer than 120 characters', async () => await request(app)
    .post('/doctor')
    .send(invalidFullName)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, messages.fullNameInvalid));

  it('It will be validated that it is not possible to create a doctor with a CRM with more than 7 digits', async () => await request(app)
    .post('/doctor')
    .send(invalidCRM)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, messages.CRMInvalid));

  it('It will be validated that it is not possible to create an address with invalid zipCode', async () => await request(app)
    .post('/doctor')
    .send(invalidZipCode)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, messages.zipCodeInvalid));

  it('It will be validated that it is not possible to create a doctor with only one phone number', async () => await request(app)
    .post('/doctor')
    .send(invalidPhone)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, messages.phoneInvalid));

  it('It will be validated that it is not possible to create a doctor with only one specialty', async () => await request(app)
    .post('/doctor')
    .send(invalidSpecialty)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, messages.specialtyInvalid));

  it('It will be validated that it is possible to successfully create a doctor', async () => await request(app)
    .post('/doctor')
    .send(doctor)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(201, messages.doctorCreated));
});
