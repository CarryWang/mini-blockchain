import crypto from "crypto-js";

export class Block {
    constructor(index, timestamp, previousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = [];
        this.previousHash = previousHash;
        this.hash = this.calcHash();
        this.nonce = 0;
    }

    calcHash() {
        return crypto
            .SHA256(
                this.index +
                    this.previousHash +
                    this.timestamp +
                    JSON.stringify(this.transactions).toString(),
            )
            .toString();
    }
}

export class Blockchain {
    constructor() {
        this.difficulty = 4;
        this.chain = [this.createGenesisBlock()];
        this.trasactions = [];
    }

    newTransaction(transaction) {
        this.trasactions.push(transaction);
        return this.chain[this.chain.length - 1].index + 1;
    }

    createGenesisBlock() {
        // return new Block(0, new Date(), "Genesis block", "0");
        const genesisBlock = new Block(0, new Date(), "0");
        mineBlock(genesisBlock, this.difficulty);
        return genesisBlock;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        // newBlock.previousHash = this.getLatestBlock().hash;
        // newBlock.hash = newBlock.calcHash();
        mineBlock(newBlock, this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

function mineBlock(block, difficulty) {
    while (!block.hash.startsWith("0".repeat(difficulty))) {
        block.nonce++;
        block.hash = crypto
            .SHA256(
                block.index +
                    block.timestamp +
                    JSON.stringify(block.transactions).toString() +
                    block.nonce,
            )
            .toString();
    }
    console.log("Block mined: " + block.hash);
}
