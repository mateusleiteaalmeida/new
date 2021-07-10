const { Doctor, Address, Phone, Specialty, DoctorsSpecialty, sequelize } = require('../models');
const { createNameAndCRM, createAddress, createPhone, createSpecialties } = require('./helpers/createDoctor');
const { updateNameAndCRM, updateAddress, updatePhone, updateSpecialty } = require('./helpers/updateDoctor');
const { findById, findByName, findByCRM, findByAddress, findByPhone, findBySpecialty } = require('./helpers/searchDoctor');
const validateDoctorData = require('./validators/doctorValidator');
const { BADREQUEST, NOTFOUND } = require('../utils/status');
const { DOCTORSCREATED, DOCTORSUPDATED, DOCTORSDELETED, NOTFOUNDDOCTORS } = require('../utils/messages');

const includeData = { include: [
    { model: Address, as: 'address', attributes: { exclude: ['id', 'doctorId'] } },
    { model: Phone, as: 'phone', attributes: { exclude: ['id', 'doctorId'] } },
    { model: Specialty, as: 'specialty', attributes: ['name'], through: { attributes: [] } }
]};

const formatSpecialtyData = (doctor) => {
  const result = JSON.parse(JSON.stringify(doctor));
  const specialtiesNames = result.map((res) => res.specialty.map((acc) => acc.name));
  result.map((actual,index) => actual.specialty = specialtiesNames[index])
  return result;
};

const getAllDoctors = async () => {
  const doctors = await Doctor.findAll(includeData);
  if (!doctors.length) return { message: NOTFOUNDDOCTORS, code: NOTFOUND }
  const doctorsFormated = formatSpecialtyData(doctors);
  return doctorsFormated;
}

const createDoctor = async (data) => {
  const createTransaction = await sequelize.transaction({ autocommit: false});
  try {
    validateDoctorData(data);
    const { fullName, CRM, address, phone, specialty } = data;
    const newNameAndCRM = await createNameAndCRM(fullName, CRM, createTransaction);
    await createSpecialties(specialty, newNameAndCRM, createTransaction);
    await createAddress(address, newNameAndCRM, createTransaction);
    await createPhone(phone, newNameAndCRM, createTransaction);
    return { message: DOCTORSCREATED }
  } catch (error) {
    console.log(error);
    await createTransaction.rollback();
    return { message: error.message, code: BADREQUEST };
  }
}

const updateDoctor = async (id, data) => {
  const updateTransaction = await sequelize.transaction({ autocommit: false});
  try {
    validateDoctorData(data);    
    const findDoctor = await Doctor.findOne({ where: { id }}, {transaction: updateTransaction});
    if (!findDoctor) return { message: NOTFOUNDDOCTORS, code: NOTFOUND }
    const { fullName, CRM, address, phone, specialty } = data;
    await updateSpecialty(specialty, id, updateTransaction);
    await updateNameAndCRM(fullName, CRM, id, updateTransaction);
    await updateAddress(address, id, updateTransaction);
    await updatePhone(phone, id, updateTransaction);
    return { message: DOCTORSUPDATED }
  } catch (error) {
    console.log(error);
    await updateTransaction.rollback();
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
    console.log(error);
    await deleteTransaction.rollback();
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
  console.log(!doctors[0])
  if (!doctors[0]) return { message: NOTFOUNDDOCTORS, code: NOTFOUND }
  const doctorsFormated = formatSpecialtyData(doctors);
  return doctorsFormated;
}

module.exports = {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  findDoctorByAttribute
}
