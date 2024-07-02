class DbDataFunction {
    async delAllDbDataByPatientId(req, res) {
        res.status(200).json({ message: "All patient data deleted successfully" })
    }
    async delAllDbData(req, res) {
        const { id } = req.params;
        res.status(200).json({ message: `Patient Id ${id} is deleted successfully` })
    }
};
module.exports = new DbDataFunction() 