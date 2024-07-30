const Doctor = require('../models/Doctor');

//Create a new doctor
exports.createDoctor = async (req, res) => {
  console.log(req.body)
  try {
    const { firstName: firstname, lastName: lastname, speciality } = req.body;

    const doctor = new Doctor({
      firstname,
      lastname,
      speciality
    });

    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Get all doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ deleted: false });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get a doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor || doctor.deleted) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update a doctor
exports.updateDoctor = async (req, res) => {
  try {
    const { firstName: firstname, lastName: lastname, speciality } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, {
      firstname,
      lastname,
      speciality
    }, { new: true, runValidators: true });
    if (!doctor || doctor.deleted) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {

    res.status(400).json({ error: error.message });
  }
};

//Delete a doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
