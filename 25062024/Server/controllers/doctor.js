const Doctor = require('../model/doctor'); // Assuming you have a Mongoose model named Doctor

const dbDataFunction = {
    // Get all doctors
    async get(req, res) {
        try {
            const doctors = await Doctor.find();
            res.status(200).json(doctors);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get doctor by ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                return res.status(404).json({ message: 'Doctor not found' });
            }
            res.status(200).json(doctor);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Add a new doctor
    async adddata(req, res) {
        try {
            const newDoctor = new Doctor(req.body);
            await newDoctor.save();
            res.status(201).json(newDoctor);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update a doctor by ID
    async updatedata(req, res) {
        try {
            const { id } = req.params;
            const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedDoctor) {
                return res.status(404).json({ message: 'Doctor not found' });
            }
            res.status(200).json(updatedDoctor);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Soft delete a doctor by ID
    async softDeleteData(req, res) {
        try {
            const { id } = req.params;
            const updatedDoctor = await Doctor.findByIdAndUpdate(id, { deleted: true }, { new: true });
            if (!updatedDoctor) {
                return res.status(404).json({ message: 'Doctor not found' });
            }
            res.status(200).json(updatedDoctor);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Remove a doctor by ID
    async removedata(req, res) {
        try {
            const { id } = req.params;
            const deletedDoctor = await Doctor.findByIdAndDelete(id);
            if (!deletedDoctor) {
                return res.status(404).json({ message: 'Doctor not found' });
            }
            res.status(200).json({ message: 'Doctor removed successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = dbDataFunction;
