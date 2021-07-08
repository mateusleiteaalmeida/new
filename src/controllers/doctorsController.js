const DoctorsService = require('../services/doctorsService');
const { OK, CREATED, INTERNALSERVERERROR } = require('../utils/status')

const getAllDoctors = async (req, res) => {
  try {
    const result = await DoctorsService.getAllDoctors();
    if (result.code) return res.status(result.code).json({ message: result.message })
    return res.status(OK).json(result);
  } catch (error) {
    console.log(error);
    return res.status(INTERNALSERVERERROR).json(error);
  }
};

const createDoctor = async (req, res) => {
  try {
    const data = req.body;
    const result = await DoctorsService.createDoctor(data);
    if (result.code) return res.status(result.code).json({ message: result.message })
    return res.status(CREATED).json(result);
  } catch (error) {
    console.log(error);
    return res.status(INTERNALSERVERERROR).json(error);
  }
};

const updateDoctor = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const result = await DoctorsService.updateDoctor(id, data);
    if (result.code) return res.status(result.code).json({ message: result.message });
    return res.status(OK).json(result);
  } catch (error) {
    console.log(error);
    return res.status(INTERNALSERVERERROR).json(error);
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await DoctorsService.deleteDoctor(id);
    if (result.code) return res.status(result.code).json({ message: result.message });
    return res.status(OK).json(result);
  } catch (error) {
    console.log(error);
    return res.status(INTERNALSERVERERROR).json(error);
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
    console.log(result)
    if (result.code) return res.status(result.code).json({ message: result.message });
    return res.status(OK).json(result);
  } catch (error) {
    console.log(error);
    return res.status(INTERNALSERVERERROR).json(error);
  }
};

module.exports = {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  findDoctorByAttribute
}