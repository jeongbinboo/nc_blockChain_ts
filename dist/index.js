"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.validateStructure = (aBlock) => {
    return (typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.data === "string" &&
        typeof aBlock.timestamp === "number");
};
Block.calculateBlockHash = (//static으로 메소드를 정의하면 인스턴스 없이 바로 Block.calculateBlockHash 가 가능하다.
index, previousHash, data, timestamp) => {
    return (CryptoJS.SHA256(index + previousHash + data + timestamp).toString());
};
const genesisBlock = new Block(0, "hello", "", "my name is jboo", 20211105);
const blockChain = [genesisBlock];
const getBlockChain = () => blockChain;
const getLatestBlock = () => blockChain[blockChain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimeStamp = getNewTimeStamp();
    const nextHash = Block.calculateBlockHash(newIndex, previousBlock.hash, data, newTimeStamp);
    const newBlock = new Block(newIndex, nextHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (candidateBlock.hash !== Block.calculateBlockHash(candidateBlock.index, candidateBlock.previousHash, candidateBlock.data, candidateBlock.timestamp)) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};
createNewBlock("hello i am jboo");
createNewBlock("hihi");
console.log(blockChain);
//# sourceMappingURL=index.js.map