import express from "express";
import bodyParser from "body-parser";

import { Blockchain } from "./blockchain.js";

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const blockchain = new Blockchain();

app.get("/mine", (req, res) => {
    blockchain.createBlock();
    res.status(200).send(blockchain.chain[blockchain.chain.length - 1]);
});

app.post("/transactions/new", (req, res) => {
    // const transaction = {
    //     sender: "sender_adress",
    //     recipient: "recipient_adress",
    //     amount: 50,
    // };
    const transaction = req.body;
    const blockNumber = blockchain.createTransaction(transaction);
    res.status(200).send(`will be added to block ${blockNumber}`);
});

app.get("/chain", (req, res) => {
    res.status(200).send(blockchain.chain);
});
