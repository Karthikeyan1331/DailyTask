const express = require('express');
const dataRoute = require('./routes/data');
const foodRoute = require("./routes/foodrecipe")
const todayTask1 = require("./routes/todayTask")
let router = require("./routes/schedular")
const router1 = require("./routes/schedular_clear")
const router2 = require("./routes/dev")
const path = require('path');
module.exports = require('./practice/importfiles.js')
const { swaggerUi, stories, foodrecipe, todayTask,
  schedular, schedular_clear,
  dev, allschedular, doctor } = require('./swagger');

const app = express();
const port = 8000;

app.use(express.json());
// Serve static files\
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to serve Swagger JSON based on the query parameter
app.get('/swagger.json', (req, res) => {
  const api = req.query.api;
  console.log(api);

  switch (api) {
    case 'food':
      res.json(foodrecipe);
      break;
    case 'task':
      res.json(todayTask);
      break;
    case 'stories':
      res.json(stories);
      break;
    case 'schedular_clear':
      res.json(schedular_clear)
      break
    case 'schedular-api-all':
      res.json(allschedular)
      break
    case 'schedular':
      res.json(schedular)
      break
    case 'dev':
      res.json(dev)
      break
    case 'doctor':
      res.json(doctor)
      break
    default:
      res.status(400).json({ message: 'Invalid API query parameter' });
      break;
  }
});

app.get('/api-options', (req, res) => {
  res.json({
    "stories": "Stories API",
    "food": "Food Recipes API",
    "task": "Sample task",
    "schedular-api-all": "Schedular Api all",
    "schedular": "Router",
    "schedular_clear": "Router1",
    "dev": "Router2",
    "doctor": "DoctorRoute"
  });
});
// Serve Swagger UI
app.use('/api-docs/:id', swaggerUi.serve, (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index1.html'));
});

// Use the routes
app.use('/', dataRoute);
app.use('/', foodRoute);
app.use("/api/speciality", todayTask1);
app.use("/api/schedular", router);
app.use("/api/schedular_clear", router1);
app.use("/api/dev", router2);
router = require("./routes/doctor")
app.use("/api/doctor", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
