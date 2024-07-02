// dbDataFunction.js

class DbDataFunction {
    // Find all data
    findAll(req, res) {
      // Replace with your actual database query logic
      const data = [{ id: "1", name: 'Sample Data1' }, { id: "2", name: 'Sample Data2' }]; // Sample data
      res.status(200).json(data);
    }
  
    // Find data by ID
    findbyid(req, res) {
      const { id } = req.params;
      // Replace with your actual database query logic
      const data = { id, name: 'Sample Data' }; // Sample data
      res.status(200).json(data);
    }
  
    // Delete data by ID
    delData(req, res) {
      const { id } = req.params;
      // Replace with your actual database delete logic
      res.status(200).json({ message: `Data with ID ${id} deleted` });
    }
  
    // Update data by ID
    updateData(req, res) {
      const { id } = req.params;
      const newData = req.body;
      // Replace with your actual database update logic
      res.status(200).json({ message: `Data with ID ${id} updated`, newData });
    }
  
    // Soft delete data by ID
    softDeleteData(req, res) {
      const { id } = req.params;
      // Replace with your actual database soft delete logic (e.g., setting a 'deleted' flag)
      res.status(200).json({ message: `Data with ID ${id} soft deleted` });
    }
  
    // Set status and copy data
    setStatsAndCopyData(req, res) {
      const { id, status } = req.body;
      // Replace with your actual database logic to set status and copy data
      res.status(200).json({ message: `Data with ID ${id} status set to ${status} and copied` });
    }
  
    // Add new data
    addData(req, res) {
      const newData = req.body;
      // Replace with your actual database insert logic
      res.status(200).json({ message: 'New data added', newData });
    }
  }
  
  module.exports = new DbDataFunction();
  