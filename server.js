// Importing all required dependencies.
require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const apiRoutes = require('./routes/api');
const app = express();

/////////////////////////////////////////
// Assigning Dependencies to "app.use"
app.use(cors());
app.use(express.json());
app.use(helmet());
/////////////////////////////////////////

/////////////////////////////////////////
// Connecting the backend to the database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/////////////////////////////////////////

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
