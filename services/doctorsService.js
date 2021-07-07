const { Doctor, Address, Phone, Specialty, DoctorsSpecialty, sequelize } = require('../models');
const { createNameAndCRM, createAddress, createPhone, createSpecialties } = require('./helpers/createDoctor');
const { updateNameAndCRM, updateAddress, updatePhone, updateSpecialties } = require('./helpers/updateDoctor');
const { findById, findByName, findByCRM, findByAddress, findByPhone, findBySpecialty } = require('./helpers/searchDoctor');
const validateDoctorData = require('./validators/doctorValidator');
const { BADREQUEST, NOTFOUND } = require('../utils/status');
const { DOCTORSCREATED, DOCTORSUPDATED, DOCTORSDELETED, NOTFOUNDDOCTORS} = require('../utils/messages');

const includeData = { include: [
    { model: Address, as: 'address', attributes: { exclude: ['id', 'doctorId'] } },
    { model: Phone, as: 'phone', attributes: { exclude: ['id', 'doctorId'] } },
    { model: Specialty, as: 'specialty', attributes: ['name'], through: { attributes: [] } }
]};

const getAllDoctors = async () => {
  const doctors = await Doctor.findAll(includeData);
  return doctors;
}

const createDoctor = async (data) => {
  const createTransaction = await sequelize.transaction();
  try {
    const { error } = validateDoctorData(data);    
    if (error) return {message: error.details[0].message, code: BADREQUEST};
    const { fullName, CRM, address, phone, specialty } = data;
    const doctorCreated = await createNameAndCRM(fullName, CRM, createTransaction);
    const { id } = doctorCreated.dataValues;
    await createAddress(address, id, createTransaction);
    await createPhone(phone, id, createTransaction);
    await createSpecialties(specialty, id, createTransaction);
    await createTransaction.commit();
    return { message: DOCTORSCREATED }
  } catch (error) {
    return { message: error.message, code: BADREQUEST };
  }
}

const updateDoctor = async (id, data) => {
  const updateTransaction = await sequelize.transaction();
  try {
    const { error } = validateDoctorData(data);    
    if (error) return { message: error.details[0].message, code: BADREQUEST };
    const { fullName, CRM, address, phone, specialty } = data;
    await updateNameAndCRM(fullName, CRM, id, updateTransaction);
    await updateAddress(address, id, updateTransaction);
    await updatePhone(phone, id, updateTransaction);
    await updateSpecialties(specialty, id, updateTransaction);
    await updateTransaction.commit();
    return { message: DOCTORSUPDATED }
  } catch (error) {
    return { message: error.message, code: BADREQUEST };
  }
}

const deleteDoctor = async (id) => {
  const deleteTransaction = await sequelize.transaction();
  try {
    const result = await Doctor.destroy({ where: { id }}, { transaction: deleteTransaction });
    if (result === 0) return { message: NOTFOUNDDOCTORS, code: NOTFOUND }
    await Address.destroy({ where: { doctorId: id } }, { transaction: deleteTransaction });
    await Phone.destroy({ where: { doctorId: id } }, { transaction: deleteTransaction });
    await DoctorsSpecialty.destroy({ where: { doctorId: id } }, { transaction: deleteTransaction });
    await deleteTransaction.commit();
    return { message: DOCTORSDELETED };
  } catch (error) {
    return { message: error.message, code: BADREQUEST };
  }
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
  if (!doctors[0]) return { message: NOTFOUNDDOCTORS, code: NOTFOUND }
  return doctors;
}

module.exports = {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  findDoctorByAttribute
}
