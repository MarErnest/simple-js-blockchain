const Block = require('./Block.class');
const Transaction = require('./Transaction.class');

class BlockChain {

    constructor() {
        this.chain = [this.createGenesis()];
        this.diffuclty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesis() {
        return new Block(new Date().toDateString(), "Genesis Block", "0");
    }

    latestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(new Date().toDateString(), this.pendingTransactions);
        block.mineBlock(this.diffuclty);
        console.log('Block succesfully mined!');
        this.chain.push(block);
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for(const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    checkValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Self Hash Check
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            // Chain Hash Check
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

            return true;
        }
    }

}

module.exports = BlockChain;
