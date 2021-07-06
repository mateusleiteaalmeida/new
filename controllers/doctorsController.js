const DoctorsService = require('../services/doctorsService');

const getAllDoctors = async (req, res) => {
  try {
    const result = await DoctorsService.getAllDoctors();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllDoctors
}