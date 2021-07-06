const DoctorsService = require('../services/doctorsService');

const getAllDoctors = async (req, res) => {
  try {
    const result = await DoctorsService.getAllDoctors();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await DoctorsService.getDoctorById(id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
}

module.exports = {
  getAllDoctors,
  getDoctorById
}