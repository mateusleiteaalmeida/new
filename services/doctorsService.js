const { Doctor, Address, Phone, Specialty } = require('../models');

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

module.exports = {
  getAllDoctors,
  getDoctorById
}
