const { Doctor, Address, Phone, Specialty, DoctorsSpecialty } = require('../../models');
const buscaCep = require('busca-cep');
const { INVALIDZIPCODE } = require('../../utils/messages');

const createNameAndCRM = async (fullName, CRM, transaction) => {
  const formatCRM = parseInt(CRM)
  const doctor = await Doctor.create({ fullName, CRM: formatCRM }, { transaction });
  return doctor.id;
}

const createAddress = async (addressData, doctorId, transaction) => {
  const { streetAddress, streetNumber, complement, zipCode } = addressData;
  const cepData = await buscaCep(`${zipCode}`, { sync: true });
  if (cepData.erro || cepData.hasError) throw { message: INVALIDZIPCODE, code: 400 }
  await Address.create({
    zipCode: parseInt(streetNumber),
    streetAddress,
    streetNumber: parseInt(streetNumber),
    complement,
    neighborhood: cepData.bairro,
    city: cepData.localidade,
    state: cepData.uf,
    doctorId
  }, { transaction });
}

const createPhone = async (phone, doctorId, transaction) => {
  const allPromises = await Promise.allSettled(phone.map((phone) => 
  Phone.create({
    type: phone.type,
    ddd: parseInt(phone.ddd),
    number: parseInt(phone.number),
    doctorId
  }, { transaction })));
  console.log(allPromises)
  const checkPromises = allPromises.every((promise) => promise.status === 'fulfilled');
  console.log(checkPromises)
  if (checkPromises) await transaction.commit();
}

const createSpecialty = async (specialty, transaction) => {
  const newSpecialties = await Promise.all(specialty.map(async (id) => {
    const creat = await Specialty.findOrCreate({ where: { name: id }, transaction })
    return creat[0].dataValues.id
  }));
  return newSpecialties
}

const createDoctorSpecialty = async (doctorId, specialtyId, transaction) =>
  await Promise.all(specialtyId.map((id) =>
  DoctorsSpecialty.create({ doctorId, specialtyId: id }, { transaction })));

const createSpecialties = async (specialty, doctorId, transaction) => {
  const formatedSpecialty = specialty.map((spec) => spec.toUpperCase())
  const createdSpecialty = await createSpecialty(formatedSpecialty, transaction);
  await createDoctorSpecialty(doctorId, createdSpecialty, transaction)
}

module.exports = {
  createNameAndCRM,
  createAddress,
  createPhone,
  createSpecialties
}