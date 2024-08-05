const express = require("express");
const { connectToMongoDB } = require("./connect");
const cors = require('cors');
const app = express();
const PORT = 8000; 

app.use(cors({
    origin: 'http://localhost:3000'
}));
const planRoutes = require("./routes/plans");

app.use(express.json());
app.use("/plans", planRoutes);

const startServer = async () => {
    await connectToMongoDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
