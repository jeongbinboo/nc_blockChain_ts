class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
const genesisBlock = new Block(0, "hello", "", "my name is jboo", 20211105);
const blockChain = [genesisBlock];
console.log(blockChain);
//# sourceMappingURL=index.js.map