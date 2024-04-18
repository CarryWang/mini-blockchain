import crypto from "crypto-js";

class Block {
    constructor(index, timestamp, transactions = [], previousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = "";
        this.nonce = 0;
    }

    calcHash() {
        return crypto
            .SHA256(
                this.index +
                    this.timestamp +
                    JSON.stringify(this.transactions).toString() +
                    this.previousHash +
                    this.nonce,
            )
            .toString();
    }

    mineBlock(difficulty) {
        while (!this.hash.startsWith("0".repeat(difficulty))) {
            this.nonce++;
            this.hash = crypto
                .SHA256(
                    this.index +
                        this.timestamp +
                        JSON.stringify(this.transactions).toString() +
                        this.previousHash +
                        this.nonce,
                )
                .toString();
        }
    }
}

export class Blockchain {
    constructor() {
        this.difficulty = 4;
        this.pendingTrasactions = [];
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        const genesisPreviousHash = "0".repeat(64);
        const genesisBlock = new Block(0, Date.now(), [], genesisPreviousHash);
        genesisBlock.mineBlock(this.difficulty);
        genesisBlock.transactions.push({
            sender: "",
            recipient: genesisBlock.hash,
            amount: 50,
        });
        return genesisBlock;
    }

    createBlock() {
        const minerReward = {
            sender: "",
            recipient: "miner_adress",
            amount: 50,
        };
        this.pendingTrasactions.push(minerReward);

        const block = new Block(
            this.getLatestBlock().index + 1,
            Date.now(),
            this.pendingTrasactions,
            this.getLatestBlock().hash,
        );
        block.mineBlock(this.difficulty);

        this.chain.push(block);

        this.pendingTrasactions = [];
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    createTransaction(transaction) {
        this.pendingTrasactions.push(transaction);
        return this.chain[this.chain.length - 1].index + 1;
    }
}
