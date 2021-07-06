const { Doctor, Address, Phone, Specialty } = require('../models');

const getAllDoctors = async () => {
  const doctors = await Doctor.findAll({
    include: [
      { model: Address, as: 'address', attributes: { exclude: ['id', 'doctorId'] } },
      { model: Phone, as: 'phone', attributes: { exclude: ['id', 'doctorId'] } },
      { model: Specialty, as: 'specialties', attributes: ['name'], through: { attributes: [] } }
    ]
  });
  return doctors;
}

module.exports = {
  getAllDoctors
}
