const { Doctor, Address, Phone, Specialty } = require('../models');
const { createNameAndCRM, createAddress, createPhone, createSpecialties } = require('./helpers/createDoctor');

const includeData = { include: [
    { model: Address, as: 'address', attributes: { exclude: ['id', 'doctorId'] } },
    { model: Phone, as: 'phone', attributes: { exclude: ['id', 'doctorId'] } },
    { model: Specialty, as: 'specialties', attributes: ['name'], through: { attributes: [] } }
]};

const getAllDoctors = async () => {
  const doctors = await Doctor.findAll(includeData);
  return doctors;
}

const getDoctorById = async (id) => {
  const doctors = await Doctor.findByPk(id, includeData);
  return doctors;
}

const createDoctor = async (data) => {
  const { fullName, CRM, address, phone, specialty } = data;
  const doctorCreated = await createNameAndCRM(fullName, CRM);
  const { id } = doctorCreated.dataValues;
  await createAddress(address, id);
  await createPhone(phone, id);
  await createSpecialties(specialty, id);
  return { message: 'Médico criado com sucesso' }
}

module.exports = {
  getAllDoctors,
  getDoctorById,
  createDoctor
}
