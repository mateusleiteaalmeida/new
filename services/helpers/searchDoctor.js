const { Doctor, Address, Phone, Specialty } = require('../../models');
const { Op } = require('sequelize');

const includeData = { include: [
  { model: Address, as: 'address', attributes: { exclude: ['id', 'doctorId'] } },
  { model: Phone, as: 'phone', attributes: { exclude: ['id', 'doctorId'] } },
  { model: Specialty, as: 'specialty', attributes: ['name'], through: { attributes: [] } }
]};

const findById = async (doctors, value) => {
  doctors = await Doctor
    .findByPk(value, includeData).then((response) => [response]);
  return doctors;
}

const findByName = async (doctors, attribute, value) => {
  newIncludeData = Object.assign(includeData, { where: { [attribute]: { [Op.like]: `%${value}%` } } });
  doctors = await Doctor.findAll(newIncludeData);
  return doctors;
}

const findByCRM = async (doctors, attribute, value) => {
  newIncludeData = Object.assign(includeData, { where: { [attribute]: { [Op.like]: `%${value}%` } } });
  doctors = await Doctor.findAll(newIncludeData);
  return doctors;
}

const findByAddress = async (doctors, value) => {
  doctors = await Doctor.findAll(includeData).then((response) =>
  JSON.parse(JSON.stringify(response))).then((result) => result.filter((res) =>
    Object.values(res.address).findIndex((element) => element.toString().includes(value)) !== -1
  ));
  return doctors;
}

const findByPhone = async (doctors, value) => {
  doctors = await Doctor.findAll(includeData).then((response) =>
  JSON.parse(JSON.stringify(response))).then((result) => result.filter((res) => 
    res.phone.map((phone) => `${phone.ddd}${phone.number}`)
      .findIndex((phone) => phone.toString().includes(value)) !== -1));
  return doctors;
}

const findBySpecialty = async (doctors, value) => {
  doctors = await Doctor.findAll(includeData).then((response) =>
  JSON.parse(JSON.stringify(response))).then((result) => result.filter((res) =>
    res.specialty.map((spec) => spec.name)
      .findIndex((spec) => spec.includes(value)) !== -1));
  return doctors;
}

module.exports = {
  findById,
  findByName,
  findByCRM,
  findByAddress,
  findByPhone,
  findBySpecialty
}