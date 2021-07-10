const request = require('supertest');
const express = require('express');
const doctorsRoute = require('../routes/doctorsRoutes');
const messages = require('./config/errorMessages');
const { contentType, applicationJson, doctorObject } = require('./config/parameters');
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
const invalidZipCode = { ...doctor, address: { streetAddress: 'Rua Rio de Janeiro',
  streetNumber: '15',
  complement: 'Apto 1',
  zipCode: '30160160',
} }
const invalidPhone = { ...doctor, phone: [{ type: "Celular", ddd: "31", number: "998989898" }] }
const invalidSpecialty = { ...doctor, specialty: ["PEDIATRIA"]}

describe('3 - Check update doctor routes', () => {
  it('It will be validated that it is not possible to update a doctor without full name', async () => await request(app)
    .put('/doctor/1')
    .send(withoutFullName)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, messages.fullNameRequired));

  it('It will be validated that it is not possible to update a doctor without full CRM', async () => await request(app)
    .put('/doctor/1')
    .send(withoutCRM)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, messages.CRMRequired));

  it('It will be validated that it is not possible to update a doctor without address', async () => await request(app)
    .put('/doctor/1')
    .send(withoutAddress)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, messages.addressRequired));

  it('It will be validated that it is not possible to update a doctor without phone', async () => await request(app)
    .put('/doctor/1')
    .send(withoutPhone)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, messages.phoneRequired));

  it('It will be validated that it is not possible to update a doctor without specialty', async () => await request(app)
    .put('/doctor/1')
    .send(withoutSpecialty)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, messages.specialtyRequired));

  it('It will be validated that it is not possible to update a doctor with a name longer than 120 characters', async () => await request(app)
    .put('/doctor/1')
    .send(invalidFullName)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, messages.fullNameInvalid));

  it('It will be validated that it is not possible to update a doctor with a CRM with more than 7 digits', async () => await request(app)
    .put('/doctor/1')
    .send(invalidCRM)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, messages.CRMInvalid));

  it('It will be validated that it is not possible to update an address with invalid zipCode', async () => await request(app)
    .put('/doctor/1')
    .send(invalidZipCode)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, messages.zipCodeInvalid));

  it('It will be validated that it is not possible to update a doctor with only one phone number', async () => await request(app)
    .put('/doctor/1')
    .send(invalidPhone)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, messages.phoneInvalid));

  it('It will be validated that it is not possible to update a doctor with only one specialty', async () => await request(app)
    .put('/doctor/1')
    .send(invalidSpecialty)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, messages.specialtyInvalid));

  it('It will be validated that it is not possible to update a non-existent doctor', async () => await request(app)
    .put('/doctor/99')
    .send(doctorObject)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(404, messages.doctorNotFound));

  it('It will be validated that it is possible to successfully update a doctor', async () => await request(app)
    .put('/doctor/1')
    .send(doctor)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(200, messages.doctorUpdated));
});