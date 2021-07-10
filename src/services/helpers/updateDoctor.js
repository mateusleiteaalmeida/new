
const { Doctor, Address, Phone, Specialty, DoctorsSpecialty } = require('../../models');
const buscaCep = require('busca-cep');
const { INVALIDZIPCODE } = require('../../utils/messages');

const updateNameAndCRM = async (fullName, CRM, id, transaction) => {
  await Doctor.update({ fullName, CRM },
    { where: { id } },
    { transaction });
}

const updateAddress = async (addressData, id, transaction) => {
  const { streetAddress, streetNumber, complement, zipCode } = addressData;
  const cepData = await buscaCep(`${zipCode}`, { sync: true });
  if (cepData.erro || cepData.hasError) throw { message: INVALIDZIPCODE }
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
  { where: { id } }, { transaction });
}

const updatePhone = async (phone, doctorId, transaction) => {
  await Phone.destroy({ where: { doctorId }}, { transaction });
  const allPromises = await Promise.allSettled(phone.map(async (phone) => 
  await Phone.create({
    type: phone.type,
    ddd: parseInt(phone.ddd),
    number: parseInt(phone.number),
    doctorId
  }, { transaction })));
  const checkPromises = allPromises.every((promise) => promise.status === 'fulfilled');
  if (checkPromises) await transaction.commit();
}

const createSpecialty = async (specialty, transaction) => {
  const newSpecialties = await Promise.allSettled(specialty.map(async (id) => {
    const create = await Specialty.findOrCreate({ where: { name: id }, transaction })
    return create[0].dataValues.id
  }));
  return newSpecialties
}

const createDoctorSpecialty = async (doctorId, specialtyId, transaction) => {
  const newDocSpec = await Promise.allSettled(specialtyId.map((id) =>
    DoctorsSpecialty.create({ doctorId, specialtyId: id }, { transaction })));
};

const updateSpecialty = async (specialty, doctorId, transaction) => {
  await DoctorsSpecialty.destroy({ where: { doctorId }, transaction });
  const formatedSpecialty = specialty.map((spec) => spec.toUpperCase())
  const createdSpecialty = await createSpecialty(formatedSpecialty, transaction);
  await createDoctorSpecialty(doctorId, createdSpecialty, transaction)

}

module.exports = {
  updateAddress,
  updatePhone,
  updateSpecialty,
  updateNameAndCRM
}