const DoctorsService = require('../services/doctorsService');

const getAllDoctors = async (req, res) => {
  try {
    const result = await DoctorsService.getAllDoctors();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const createDoctor = async (req, res) => {
  try {
    const data = req.body;
    const result = await DoctorsService.createDoctor(data);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

const updateDoctor = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const result = await DoctorsService.updateDoctor(id, data);
    if (result.code) return res.status(result.code).json({ message: result.message })
    return res.status(200).json(result);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await DoctorsService.deleteDoctor(id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

const findDoctorByAttribute = async (req, res) => {
  try {
    const query = req.query;
    const body = {
      attribute: Object.keys(query)[0],
      value: Object.values(query)[0]
    }
    const result = await DoctorsService.findDoctorByAttribute(body);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  findDoctorByAttribute
}