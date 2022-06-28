const express = require('express');
const dotenv = require("dotenv");
const signupRoute = require('./routes/signupRoute');

const routes = require("./routes");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth/signup", signupRoute);
app.use("/auth/login", signupRoute);

// app.use('/auth', authRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));