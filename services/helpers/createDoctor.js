const { Doctor, Address, Phone } = require('../../models');
const buscaCep = require('busca-cep');
const { validateAndCreateSpecialtyData } = require('../validators/specialtyValidator');

const createNameAndCRM = async (fullName, CRM, createTransaction) => {
  const doctor = await Doctor.create({ fullName, CRM }, { transaction: createTransaction });
  return doctor;
}

const createAddress = async (addressData, id, createTransaction) => {
  const { streetAddress, streetNumber, complement, zipCode } = addressData;
  const cepData = await buscaCep(`${zipCode}`, { sync: true });
  if (cepData.erro || cepData.hasError) throw { message: 'Invalid zip code' }
  await Address.create({
    zipCode: parseInt(streetNumber),
    streetAddress,
    streetNumber: parseInt(streetNumber),
    complement,
    neighborhood: cepData.bairro,
    city: cepData.localidade,
    state: cepData.uf,
    doctorId: id
  }, { transaction: createTransaction });
}

const createPhone = async (phone, id, createTransaction) => {
  await Promise.all(phone.map((phone) => 
  Phone.create({
    type: phone.type,
    ddd: parseInt(phone.ddd),
    number: parseInt(phone.number),
    doctorId: id
  }, { transaction: createTransaction })));
}

const createSpecialties = async (specialty, id, createTransaction) => {
  await validateAndCreateSpecialtyData(specialty, id, createTransaction);
}

module.exports = {
  createNameAndCRM,
  createAddress,
  createPhone,
  createSpecialties
}