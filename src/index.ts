import { time } from 'console';
import * as CryptoJS from "crypto-js";

class Block{
    public index:number;
    public hash:string;
    public previousHash:string;
    public data:string;
    public timestamp: number;

    static calculateBlockHash = ( //static을 사용해야만 Block.calculateBlockHash가 가능하다
        index:number, 
        previousHash:string, 
        timestamp:number, 
        data:string):string=>
        CryptoJS.SHA26(index + previousHash + timestamp + data).toString();

    constructor(
        index:number,
        hash:string,
        previousHash:string,
        data:string,
        timestamp: number
    ){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
const genesisBlock:Block = new Block(0,"hello","","my name is jboo",20211105);
const blockChain:Block[] = [genesisBlock];

const getBlockChain = ():Block[] => blockChain;
const getLatestBlock = () : Block => blockChain[blockChain.length -1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);
console.log(blockChain);