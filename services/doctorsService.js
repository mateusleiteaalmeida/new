const { Doctor, Address, Phone, Specialty, DoctorsSpecialty } = require('../models');
const { createNameAndCRM, createAddress, createPhone, createSpecialties } = require('./helpers/createDoctor');
const { updateNameAndCRM, updateAddress, updatePhone, updateSpecialty } = require('./helpers/updateDoctor');
const { findById, findByName, findByCRM, findByAddress, findByPhone, findBySpecialty } = require('./helpers/searchDoctor');

const includeData = { include: [
    { model: Address, as: 'address', attributes: { exclude: ['id', 'doctorId'] } },
    { model: Phone, as: 'phone', attributes: { exclude: ['id', 'doctorId'] } },
    { model: Specialty, as: 'specialties', attributes: ['name'], through: { attributes: [] } }
]};

const getAllDoctors = async () => {
  const doctors = await Doctor.findAll(includeData);
  return doctors;
}

const createDoctor = async (data) => {
  const { fullName, CRM, address, phone, specialty } = data;
  const doctorCreated = await createNameAndCRM(fullName, CRM);
  const { id } = doctorCreated.dataValues;
  await createAddress(address, id);
  await createPhone(phone, id);
  await createSpecialties(specialty, id);
  return { message: 'Dados do médico criados com sucesso' }
}

const updateDoctor = async (id, data) => {
  const { fullName, CRM, address, phone, specialty } = data;
  await updateNameAndCRM(fullName, CRM, id);
  await updateAddress(address, id);
  await updatePhone(phone, id);
  await updateSpecialty(specialty, id);
  return { message: 'Dados do médico atualizados com sucesso'}
}

const deleteDoctor = async (id) => {
  const result = await Doctor.destroy({ where: { id }});
  await Address.destroy({ where: { doctorId: id } });
  await Phone.destroy({ where: { doctorId: id } });
  await DoctorsSpecialty.destroy({ where: { doctorId: id } });
  return { message: 'Dados do médico removidos com sucesso' };
}

const findDoctorByAttribute = async (query) => {
  const { attribute, value } = query
  let doctors = [];
  switch (attribute) {
    case 'id':
      doctors = await findById(doctors, value)
      break;
    case 'fullName':
      doctors = await findByName(doctors, attribute, value)
      break;
    case 'CRM':
      doctors = await findByCRM(doctors, attribute, value)
      break;
    case 'address':
      doctors = await findByAddress(doctors, value)
      break
    case 'phone':
      doctors = await findByPhone(doctors, value)
      break;
    case 'specialty':
      doctors = await findBySpecialty(doctors, value)
      break
    default:
  }
  return doctors;
}

module.exports = {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  findDoctorByAttribute
}
