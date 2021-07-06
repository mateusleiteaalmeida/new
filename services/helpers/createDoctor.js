const { Doctor, Address, Phone } = require('../../models');
const buscaCep = require('busca-cep');
const { validateAndCreateSpecialtyData } = require('../validators/specialtyValidator');

const createNameAndCRM = async (fullName, CRM) => {
  const doctor = await Doctor.create({ fullName, CRM });
  return doctor;
}

const createAddress = async (addressData, id) => {
  const { streetAddress, streetNumber, complement, zipCode } = addressData;
  const cepData = await buscaCep(`${zipCode}`, { sync: true });
  await Address.create({
    streetAddress,
    streetNumber,
    complement,
    neighborhood: cepData.bairro,
    city: cepData.localidade,
    state: cepData.uf,
    zipCode,
    doctorId: id
  });
}

const createPhone = async (phone, id) => {
  await Promise.all(phone.map((phone) => 
  Phone.create({
    type: phone.type,
    ddd: phone.ddd,
    number: phone.number,
    doctorId: id
  })));
}

const createSpecialties = async (specialty, id) => {
  await validateAndCreateSpecialtyData(specialty, id);
}

module.exports = {
  createNameAndCRM,
  createAddress,
  createPhone,
  createSpecialties
}