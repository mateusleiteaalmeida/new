
const { Doctor, Address, Phone, DoctorsSpecialty } = require('../../models');
const buscaCep = require('busca-cep');
const { validateAndCreateSpecialtyData } = require('../validators/specialtyValidator');

const updateNameAndCRM = async (fullName, CRM, id, updateTransaction) => {
  const doctor = await Doctor.update({ fullName, CRM },
    { where: { id } },
    { transaction: updateTransaction });
  return doctor;
}

const updateAddress = async (addressData, id, updateTransaction) => {
  const { streetAddress, streetNumber, complement, zipCode } = addressData;
  const cepData = await buscaCep(`${zipCode}`, { sync: true });
  if (cepData.erro || cepData.hasError) throw { message: 'Invalid zip code' }
  await Address.update({
    streetAddress,
    streetNumber: parseInt(streetNumber),
    complement,
    neighborhood: cepData.bairro,
    city: cepData.localidade,
    state: cepData.uf,
    zipCode: parseInt(zipCode),
    doctorId: id
  },
  { where: { id } },
  { transaction: updateTransaction });
}

const updatePhone = async (phone, id, updateTransaction) => {
  await Phone.destroy({ where: { doctorId: id }})
  await Promise.all(phone.map((phone) => 
  Phone.create({
    type: phone.type,
    ddd: parseInt(phone.ddd),
    number: parseInt(phone.number),
    doctorId: id
  },
  { transaction: updateTransaction })));
}

const updateSpecialties = async (specialty, id, updateTransaction) => {
  await DoctorsSpecialty.destroy({ where: { doctorId: id }},
  { transaction: updateTransaction })
  await validateAndCreateSpecialtyData(specialty, id, updateTransaction);
}

module.exports = {
  updateAddress,
  updatePhone,
  updateSpecialties,
  updateNameAndCRM
}