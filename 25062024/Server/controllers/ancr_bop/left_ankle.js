const Appointment = require('../../model/ancr_bop');

class DbDataFunction {
  async findAll(req, res) {
    try {
      const appointments = await Appointment.find();
      res.json(appointments);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async findbyid(req, res) {
    try {
      const id = req.params.id;
      const appointment = await Appointment.findById(id);
      if (appointment) {
        res.json(appointment);
      } else {
        res.status(404).send('Appointment not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async delData(req, res) {
    try {
      const id = req.params.id;
      const result = await Appointment.findByIdAndDelete(id);
      if (result) {
        res.send('Appointment deleted');
      } else {
        res.status(404).send('Appointment not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async updateData(req, res) {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const result = await Appointment.findByIdAndUpdate(id, updatedData, { new: true });
      if (result) {
        res.json(result);
      } else {
        res.status(404).send('Appointment not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async addData(req, res) {
    try {
      const newData = req.body;
      const appointment = new Appointment(newData);
      const savedAppointment = await appointment.save();
      res.json(savedAppointment);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = new DbDataFunction();
