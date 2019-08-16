const BlockChain = require('./BlockChain.class');
const Block = require('./Block.class');
const Transaction = require('./Transaction.class');

// Block Chain Instance
let jsChain = new BlockChain();

jsChain.createTransaction(new Transaction('myaddress', 'wladdress', 100));
jsChain.createTransaction(new Transaction('wladdress', 'wladdress', 50));

console.log('Starting miner...');
jsChain.minePendingTransactions('mark-address');
console.log('Balance: ', jsChain.getBalanceOfAddress('mark-address'));

console.log('Straing the miner again...');
jsChain.minePendingTransactions('mark-address');
console.log('Balance: ', jsChain.getBalanceOfAddress('mark-address'));
