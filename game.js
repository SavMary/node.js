let uuid = require('uuid');
let crypto = require('crypto');

let parrams = [],
 pcMove = null,
 pcMoveIndex = null,
 userMoveIndex = null,
 userMove = null
 isValid = false;

for(let i = 2; i < process.argv.length; i++){
    parrams.push(process.argv[i]);
}

class Hash{
    constructor(pcMove){
        this.pcMove=pcMove;
    }

    createSha3(){
        const id = uuid.v4();
        const sha3 = crypto.createHash('sha1').update(pcMove + id).digest('hex');
        console.log(`HMAC: \n${sha3}`);
        return id;
    }    
}

class CalculateWin {
    constructor(computerMoveIndex, userMoveIndex){
        this.computerMoveIndex = computerMoveIndex;
        this.userMoveIndex = userMoveIndex;
    }

    calсulate() {
        if(this.computerMoveIndex == this.userMoveIndex){
            console.log('Draw');
        } else if(this.computerMoveIndex < this.userMoveIndex){
            if(this.userMoveIndex <= this.computerMoveIndex + Math.floor(parrams.length/2)){
                console.log('Computer win!');
            } else {
                console.log('You win!');
            }
        } else {
            if(this.computerMoveIndex <= this.userMoveIndex + Math.floor(parrams.length/2)){
                console.log('You win!');
            } else {
                console.log('Computer win!');
            }
        }
    }
}

class Table {
    constructor(rock,paper,scissors,lizard,Spock){
        this.rock=rock;
        this.paper=paper;
        this.scissors=scissors;
        this.lizard=lizard;
        this.Spock=Spock;
    }

    generateTable(){
        let items = {};
        items.rock = new Table('draw','win','win','loose','loose');
        items.paper = new Table('loose','draw','win','win','loose');
        items.scissors = new Table('loose','loose','draw','win','win');
        items.lizard = new Table('win','loose','loose','draw','win');
        items.Spock = new Table('win','win','loose','loose','draw');
        console.table(items);
    }
}

validateParams();

if(isValid){
    pcMoves();

    const hash = new Hash(pcMove);

    const key = hash.createSha3();

    showAvailableMoves();

    userMoves();

    showUserMove();

    if(userMove != 0 && userMove != '?'){
        showComputerMove();

        const calculateWin = new CalculateWin(pcMoveIndex, userMoveIndex);
        calculateWin.calсulate();
        console.log(key);
    }
}

function validateParams(){
    if(process.argv.length < 5){
        console.log('Please enter at least 3 parameters.\nExampe: rock paper scissors lizard spock');
    } else if(process.argv.length % 2 == 0) {
        console.log('Please enter an uneven number of parameters.\nExampe: rock paper scissors lizard spock');
    } else {
        isValid = true;
    }
}

function pcMoves(){
    pcMoveIndex = Math.floor(Math.random() * parrams.length);
    pcMove = parrams[pcMoveIndex];
}

function showAvailableMoves() {
    console.log('Available moves:');
    for(let i = 0; i < parrams.length; i++){
        console.log(`${i+1} - ${parrams[i]}`);
    }
    console.log('0 - exit');
    console.log('? - help');
}

function userMoves(){
    const reader = require("readline-sync");
    for(let i = 0; i < 1; i++){
        userMove = reader.question("Enter your move: ");
        if(userMove == '?' || userMove == '0' || (userMove >= 1 && userMove <= parrams.length)){
            break;
        } else {
            i--;
        }
    }
}

function showUserMove(){
    if(userMove != 0 && userMove != '?'){
        userMoveIndex = userMove - 1;
        console.log(`Your move: ${parrams[userMove-1]}`);
    } else if (userMove == '?'){
        const table = new Table();
        table.generateTable();
    }
}

function showComputerMove(){
    console.log(`Computer move: ${pcMove}`);
}