const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();            // Load .env
connectDB();                // Connect to MongoDB

const app = express();

app.use(cors());
app.use(express.json());    // Parse incoming JSON

app.get("/", (req, res) => {
  res.send("API is running...");
});

const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
