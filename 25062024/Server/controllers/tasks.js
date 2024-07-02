class DbDataFunction {
    async get(req, res) {
        res.json([{ _id: '1', firstname: 'John', lastname: 'Doe' }]);
    }

    async getById(req, res) {
        const { id } = req.params;
        res.json({ _id: id, firstname: 'John', lastname: 'Doe' });
    }

    async adddata(req, res) {
        const newTask = req.body;
        res.status(201).json(newTask);
    }

    async updatedata(req, res) {
        const { id } = req.params;
        const updatedTask = req.body;
        res.json({ _id: id, ...updatedTask });
    }

    async softDeleteData(req, res) {
        const { id } = req.params;
        res.json({ _id: id, deleted: true });
    }

    async removedata(req, res) {
        const { id } = req.params;
        res.json({ _id: id, removed: true });
    } 
}

module.exports = new DbDataFunction();
