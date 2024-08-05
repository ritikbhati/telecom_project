const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://root:root@cluster0.qmsucjg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const createDatabaseAndCollection = async () => {
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");

        const db = client.db("root1");
        const collection = db.collection("Plans");

        await collection.insertOne({ 
            plan_name: "Best Value Plan", 
            plan_price: 399, 
            validity: 28, 
            data: "2GB", 
            service: "4G", 
            calls: "Unlimited", 
            sms: "100 messages", 
            ott_subscriptions: ["Netflix", "Prime"] 
        });

        console.log("Database and collection created");

    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    } finally {
        await client.close();
    }
};

createDatabaseAndCollection();
