const { Router } = require('express');

const router = Router();

const doctorsController = require('../controllers/doctorsController');

router.get('/doctor', doctorsController.getAllDoctors);
router.get('/doctor/:id', doctorsController.getDoctorById);
router.post('/doctor', doctorsController.createDoctor);
router.put('/doctor/:id', doctorsController.updateDoctor);
router.delete('/doctor/:id', doctorsController.deleteDoctor);

module.exports = router;