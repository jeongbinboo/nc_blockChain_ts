import { time } from 'console';
import * as CryptoJS from "crypto-js";
import { create } from 'domain';

class Block{
    public index:number;
    public hash:string;
    public previousHash:string;
    public data:string;
    public timestamp: number;

    static validateStructure = (aBlock:Block) : boolean =>{
        return(
            typeof aBlock.index === "number" &&
            typeof aBlock.hash === "string" &&
            typeof aBlock.previousHash === "string" &&
            typeof aBlock.data === "string" &&
            typeof aBlock.timestamp === "number"
        )
    }
    static calculateBlockHash = ( //static으로 메소드를 정의하면 인스턴스 없이 바로 Block.calculateBlockHash 가 가능하다.
        index:number, 
        previousHash:string,
        data:string,
        timestamp:number
        ):string => {
            return (CryptoJS.SHA256(index + previousHash + data + timestamp).toString())
        }
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

const getLatestBlock = ():Block => blockChain[blockChain.length - 1];

const getNewTimeStamp = ():number => Math.round(new Date().getTime()/1000);

const createNewBlock = (data:string):Block => {
    const previousBlock:Block = getLatestBlock();
    const newIndex:number = previousBlock.index + 1;
    const newTimeStamp:number = getNewTimeStamp();
    const nextHash:string = Block.calculateBlockHash(newIndex, previousBlock.hash, data, newTimeStamp);
    const newBlock:Block = new Block(newIndex, nextHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
}

const isBlockValid = (candidateBlock : Block, previousBlock:Block):boolean =>{
    if(!Block.validateStructure(candidateBlock)){
        return false;
    }
    else if(previousBlock.index + 1 !== candidateBlock.index){
        return false;
    }
    else if(previousBlock.hash !== candidateBlock.previousHash){
        return false;
    }
    else if(candidateBlock.hash !== Block.calculateBlockHash(
        candidateBlock.index, 
        candidateBlock.previousHash, 
        candidateBlock.data,
        candidateBlock.timestamp)){
            return false;
        }
        else{
            return true;
        }
}

const addBlock = (candidateBlock:Block):void =>{
    if(isBlockValid(candidateBlock,getLatestBlock())){
        blockChain.push(candidateBlock);
    }
}
createNewBlock("hello i am jboo");
createNewBlock("hihi");
console.log(blockChain);