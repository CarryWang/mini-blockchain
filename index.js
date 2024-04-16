import express from "express";
import bodyParser from "body-parser";

import { Blockchain, Block } from "./blockchain.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const blockchain = new Blockchain();

app.get("/mine", (req, res) => {
    const newBlock = new Block(
        blockchain.getLatestBlock().index + 1,
        new Date(),
    );
    newBlock.transactions = blockchain.trasactions;
    blockchain.trasactions = [];
    blockchain.addBlock(newBlock);
    res.status(200).send(blockchain.chain[blockchain.chain.length - 1]);
});

app.post("/new", (req, res) => {
    const data = req.body;
    const blockNumber = blockchain.newTransaction(data);
    res.status(200).send(`will be added to block ${blockNumber}`);
});

app.get("/getChain", (req, res) => {
    res.status(200).send(blockchain.chain);
});
