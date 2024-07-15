const express = require('express');
const cors = require('cors');
const app = express();
const registrationController = require('./routes/UserAuthu');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', registrationController);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
