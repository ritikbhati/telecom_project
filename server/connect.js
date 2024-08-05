const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://root:root@cluster0.qmsucjg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
};

let client;
const connectToMongoDB = async () => {
    if (!client) {
        try {
            client = new MongoClient(uri, options);
            await client.connect();
            console.log("Connected to MongoDB Atlas");
        } catch (error) {
            console.error("Failed to connect to MongoDB Atlas:", error);
        }
    }
    return client;
};

const getConnectedClient = () => client;

module.exports = { connectToMongoDB, getConnectedClient };
