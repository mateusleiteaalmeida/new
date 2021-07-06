const { Router } = require('express');

const router = Router();

const doctorsController = require('../controllers/doctorsController');

router.get('/doctor', doctorsController.getAllDoctors);
router.get('/doctor/:id', doctorsController.getDoctorById);

module.exports = router;