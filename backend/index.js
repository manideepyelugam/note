const express = require('express');
const app = express();
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();
const connectDB = require("./db.connection");
const geminiRoutes = require("./routes/gemini.route");


app.use(cors());


const spaceRoutes = require("./routes/space.route");
// const journalRoutes = require("./routes/journal.route");
const authRoutes = require("./routes/auth.route");
const notebook = require("./routes/notebook.route");


const port = process.env.PORT || 5000;
connectDB(); // Connect to MongoDB



// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/spaces", spaceRoutes);
// app.use("/journals", journalRoutes);
app.use("/api/auth", authRoutes);
app.use("/notebooks", notebook);
app.use("/gemini", geminiRoutes);




// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});