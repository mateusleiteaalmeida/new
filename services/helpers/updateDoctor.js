
const { Doctor, Address, Phone, DoctorsSpecialty } = require('../../models');
const buscaCep = require('busca-cep');
const { validateAndCreateSpecialtyData } = require('../validators/specialtyValidator');

const updateNameAndCRM = async (fullName, CRM, id) => {
  const doctor = await Doctor.update({ fullName, CRM }, { where: { id } });
  return doctor;
}

const updateAddress = async (addressData, id) => {
  const { streetAddress, streetNumber, complement, zipCode } = addressData;
  const cepData = await buscaCep(`${zipCode}`, { sync: true });
  await Address.update({
    streetAddress,
    streetNumber,
    complement,
    neighborhood: cepData.bairro,
    city: cepData.localidade,
    state: cepData.uf,
    zipCode,
    doctorId: id
  }, { where: { id } });
}

const updatePhone = async (phone, id) => {
  await Phone.destroy({ where: { doctorId: id }})
  await Promise.all(phone.map((phone) => 
  Phone.create({
    type: phone.type,
    ddd: phone.ddd,
    number: phone.number,
    doctorId: id
  })));
}

const updateSpecialty = async (specialty, id) => {
  await DoctorsSpecialty.destroy({ where: { doctorId: id }})
  await validateAndCreateSpecialtyData(specialty, id);
}

module.exports = {
  updateAddress,
  updatePhone,
  updateSpecialty,
  updateNameAndCRM
}