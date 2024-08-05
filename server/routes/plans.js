const express = require("express");
const router = express.Router();
const { getConnectedClient } = require("../connect");
const { ObjectId } = require("mongodb");

const getPlansCollection = () => {
    const client = getConnectedClient();
    return client.db("telecom").collection("Plans");
};

// GET /plans
router.get("/", async (req, res) => {
    const collection = getPlansCollection();
    const plans = await collection.find({}).toArray();
    res.status(200).json(plans);
});

// GET /plans/:id
router.get("/:id", async (req, res) => {
    const collection = getPlansCollection();
    const plan = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!plan) {
        return res.status(404).json({ message: "Plan not found" });
    }
    res.status(200).json(plan);
});

// POST /plans
router.post("/", async (req, res) => {
    const collection = getPlansCollection();
    const { plan_name, plan_price, validity, data, service, calls, sms, ott_subscriptions } = req.body;

    if (!plan_name || plan_price === undefined || !validity || data === undefined || !service || !calls || !sms || !ott_subscriptions) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newPlan = await collection.insertOne({ plan_name, plan_price, validity, data, service, calls, sms, ott_subscriptions });
    res.status(201).json({ _id: newPlan.insertedId, plan_name, plan_price, validity, data, service, calls, sms, ott_subscriptions });
});

// PUT /plans/:id
router.put("/:id", async (req, res) => {
    const collection = getPlansCollection();
    const { plan_name, plan_price, validity, data, service, calls, sms, ott_subscriptions } = req.body;
    const updateFields = { plan_name, plan_price, validity, data, service, calls, sms, ott_subscriptions };

    const updatedPlan = await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updateFields });
    res.status(200).json(updatedPlan);
});

// DELETE /plans/:id
router.delete("/:id", async (req, res) => {
    const collection = getPlansCollection();
    const deletedPlan = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json(deletedPlan);
});

module.exports = router;
