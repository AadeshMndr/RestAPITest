const express = require("express");

const morgan = require("morgan");

const bodyParser = require("body-parser");

const productsRouter = require("./api/routes/products");

const app = express();

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if (req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Method", "*");

        return res.status(200).json({});
    }

    next();
});

app.use("/products", productsRouter);

app.use( (req, res, next) => {
    const err = new Error("Not Found");

    err.status = 404;

    next(err);
} );

app.use((error, req, res, next) => {
    console.log("error: ", error);
    
    res.status(error.status || 500);

    res.json({
        message: error.message
    });
});

module.exports = app;