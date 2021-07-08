const { Specialty, DoctorsSpecialty } = require('../../models');

const findSpecialtyIdAndCreate = async (doctorId, specialty, transaction) => {
  const foundSpecialty = await Specialty.findOne({ where: { name: specialty } });
  const createDoctorSpecialty = await DoctorsSpecialty.create(
    { doctorId, specialtyId: foundSpecialty.dataValues.id },
    { transaction })
}

const validateAndCreateSpecialtyData = async (specialty, doctorId, transaction) => {
  const allSpecialties = await Specialty.findAll();
  const allNames = allSpecialties.map((specialtyData) => specialtyData.name.toUpperCase());
  const newSpecialties = specialty.filter((specialty) => !allNames.includes(specialty.toUpperCase()));
  const oldSpecialties = specialty.filter((specialty) => allNames.includes(specialty.toUpperCase()));
  if (newSpecialties.length) await Promise.all(newSpecialties.map((async (newName) => {
    await Specialty.create({ name: newName.toUpperCase() })
  })))
  const allSpecialtiesNames = oldSpecialties.concat(newSpecialties);
  await Promise.all(allSpecialtiesNames.map((async (name) => {
    await findSpecialtyIdAndCreate(doctorId, name.toUpperCase(), transaction)
  })))
};

module.exports = {
  validateAndCreateSpecialtyData
};