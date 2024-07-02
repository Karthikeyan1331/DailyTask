class DbDataFunction{
    async delAllErrData(req, res){
        res.status(200).json({message:"All error data deleted successfully"})
    }
    async delAllData(req, res){
        res.status(200).json({message:"All data deleted successfully"})
    }
};
module.exports = new DbDataFunction()