const express = require("express");

const router = express.Router();

const { MongoClient } = require("mongodb");

const URL = "mongodb+srv://admin:admin@nodetutorial.vmr3qt7.mongodb.net";

router.get("/", async (req, res, next) => {

    const client = await MongoClient.connect(URL);

    const db = client.db("TheMainDB");

    const collection = db.collection("products");

    // const result = await collection.find();

    const result = await collection.find().toArray();

    console.log(result);

    client.close();

    res.status(200).json(result);
});

router.post("/", async (req, res, next) => {

    const product = {
        name: req.body.name,
        price: req.body.price,
    }

    const client = await MongoClient.connect(URL);

    const db = client.db("TheMainDB");

    const collection = db.collection("products");

    const result = await collection.insertOne(product);

    client.close();

    res.status(201).json("result: " + result);
});

router.get("/:id", (req, res, next) => {
    res.status(200).json(`You sent a message at ${req.params.id} id'ed URL`);
});

module.exports = router;